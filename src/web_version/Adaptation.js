var overallGame = null;

var nbDefeats = 0;
var nbWins = 0;

/* PART ABOUT THE PARAMETERS */

var formValues = {}; //nbMoves, nbBaskets, nbBalls, reward, penalty, speed, opponent, machineStarts (bool)


function getFormValues() {
    //retrieve the nb of moves possible
    var formNbMoves = document.getElementById("pick_nb_of_moves_possible");
    var formNbMovesChoices = formNbMoves.getElementsByClassName("form-control");
    for (var i = 0; i < formNbMovesChoices.length; i++) {
        if (formNbMovesChoices[i].checked) {
            formValues["nbMoves"] = parseInt(formNbMovesChoices[i].value);
        }
    }

    //retrieve the nb of baskets
    formValues["nbBaskets"] = parseInt(document.getElementById("pick_baskets_nb").value) + 1;

    //retrieve the nb of balls
    formValues["nbBalls"] = parseInt(document.getElementById("balls_per_color").value);

    //retrieve the reward
    formValues["reward"] = parseInt(document.getElementById("pick_reward").value);

    //retrieve the penalty
    formValues["penalty"] = parseInt(document.getElementById("pick_penalty").value);

    //retrieve the speed from the select element pick_speed
    var formSpeed = document.getElementById("pick_speed");
    formValues["speed"] = parseInt(formSpeed.options[formSpeed.selectedIndex].value);

    //retrieve the opponent from the select element pick_opponent
    var formOpponent = document.getElementById("pick_opponent");
    formValues["opponent"] = formOpponent.options[formOpponent.selectedIndex].value;

    //add the value of the checkbox
    formValues["machineStarts"] = document.getElementById("machine_starts").checked;

    console.log(formValues);
}

/* PART ABOUT THE GAME */

var interval = null;

function startGame() {
    updateCanvas();

    let nbMoves = formValues["nbMoves"];
    let nbBaskets = formValues["nbBaskets"];
    let nbBalls = formValues["nbBalls"];
    let reward = formValues["reward"];
    let penalty = formValues["penalty"];
    let speed = formValues["speed"];
    let opponent = formValues["opponent"];
    let machineStarts = formValues["machineStarts"];

    //we create the buttons
    overallGame = new Game(nbMoves, nbBaskets, nbBalls, reward, penalty, speed, opponent, machineStarts);

    //show hiden btns
    document.getElementById("adapt_continue").classList.remove("d-none");
    if (speed == 2) document.getElementById("adapt_pause").classList.remove("d-none");
}

function updateTooltipValue(element) {
    $(element).attr('data-original-title', element.value).tooltip('show');
    $(element).siblings('span').text('\xa0' + element.value);
}

function continueGame() {
    let speed = formValues["speed"];
    let opponent = formValues["opponent"];
    let machineStarts = formValues["machineStarts"];

    let endGame = false;
    if (speed == 0) { // one move at the time
        endGame = overallGame.playOneMove();
        updateGame(endGame, opponent, machineStarts);
    } else if (speed == 1) { // one game at the time
        endGame = overallGame.playOneGame();
        updateGame(endGame, opponent, machineStarts);
    } else { // non-stop
        document.getElementById("adapt_pause").classList.remove("d-none");
        document.getElementById("adapt_continue").classList.add("d-none");
        interval = setInterval(() => updateGame(overallGame.playNonStop(), opponent, machineStarts), 1000);
    }
    return false;
}

function updateGame(endGame, opponent, machineStarts) {
    if (endGame) {
        var win = overallGame.player == 1;
        if (!win) {//opponent won
            nbDefeats++;
            console.log("Opponent won");
            overallGame.reinforcement(false, 0);
            if (overallGame.opponent == opponent[0]) {
                overallGame.reinforcement(true, 1);
            }
        } else { //machine won
            nbWins++;
            console.log("Machine won");
            overallGame.reinforcement(true, 0);
            if (overallGame.opponent == opponent[0]) {
                overallGame.reinforcement(false, 1);
            }
        }
        console.log("Updating values...");
        for (let j = 1; j < overallGame.nbBaskets; j++) {
            if (overallGame.gameMovesHistory[j][0] >= 0) {
                updateBadges(j);
                updateASingleBasket(j);
            }
            
        }
        updateScore();
        overallGame.restartGame();
        if (!machineStarts) {
            overallGame.player = 1;
        } else {
            overallGame.player = 0;
        }
    }   
}

function pauseGame(){
    clearInterval(interval);
    document.getElementById("adapt_continue").classList.remove("d-none");
    document.getElementById("adapt_pause").classList.add("d-none");
}

/* PART ABOUT THE VISUALIZATION */

var canvas = null;
var colors = ["yellow", "red", "blue", "green", "purple"];
var eventAdded = false;
var basketPositions = [];

function updateCanvas() {
    getFormValues();

    nbDefeats = 0;
    nbWins = 0;
    updateScore();

    if (!eventAdded) {
        /* EVENTS NEEDED FOR THE RESPONSIVENESS OF THE BALLS */
        window.addEventListener("resize", function () {
            hideBalls();
            updateBasketPositions();
            positionBalls();
            showBalls();
        });

        $('#navbarTabs').on('hide.bs.collapse', function () {
            hideBalls();
        });

        $('#navbarTabs').on('hidden.bs.collapse', function () {
            showBalls();
            updateBasketPositions();
            positionBalls();
        });

        $('#navbarTabs').on('show.bs.collapse', function () {
            hideBalls();
        });

        $('#navbarTabs').on('shown.bs.collapse', function () {
            showBalls();
            updateBasketPositions();
            positionBalls();
        });
    }

    var newG = document.getElementById("adapt_new_game");
    newG.disabled = true;

    setTimeout(() => {
        //console.profile("updateCanvas");
        canvas = document.getElementById("adapt_visualization");
        var nbBaskets = formValues["nbBaskets"];
        var nbMoves = formValues["nbMoves"];
        var nbBalls = formValues["nbBalls"];

        canvas.innerHTML = "";
        createBaskets(nbBaskets, nbMoves);
        createBalls(nbBalls, nbMoves, nbBaskets);
        updateBasketPositions();
        positionBalls(true, nbBalls, nbMoves, nbBaskets);

        //if the grid is one column, scroll to the visualization part
        if (window.innerWidth < 1000) {
            document.getElementById("adapt_visualization").scrollIntoView({ behavior: "smooth" });
        }

        newG.disabled = false;
        //console.profileEnd("updateCanvas");
    }, 100);
}

function createBaskets(nbBaskets, nbMoves) {
    canvas.innerHTML = '<legend for="adapt_visualization" translate="adaptation_vizualisation">' + texts["adaptation_vizualisation"][langPicked] + '</legend>';
    var basket = '<img src="./images/new_basket.png" width="150px" height="150px" class="basket_drawing" alt="A basket/un casier">';
    var nbBalls = formValues["nbBalls"];
    for (var i = 1; i < nbBaskets; i++) {
        canvas.innerHTML += basket;
        canvas.innerHTML += '<span class="badge badge-primary position-absolute badge_nb_basket">' + i + '</span>';
        canvas.children[canvas.children.length - 2].id = "basket" + i;
        var badgeForEachColor = '<span class="badge badge-primary position-absolute badge_nb_color badge_NBASKET COLOR_counter">NBALLS</span>';
        var result = "";
        for (var j = 0; j < nbMoves; j++) {
            var tmp_res = "";
            if (j < i) {
                tmp_res += badgeForEachColor.replace("NBALLS", nbBalls);
            }
            tmp_res = tmp_res.replace("NBASKET", i);
            result += tmp_res.replace("COLOR", colors[j]);
        }
        canvas.innerHTML += result;
    }
}

function createBall(basketID, ballID, move) {
    var ball = '<div id="ball_' + basketID + '_' + ballID + '_' + move + '" class="div_balls" style="background-color: ' + colors[move] + ';"></div>';
    return ball;
}

function createBalls(nbBalls, nbMoves, nbBaskets) {
    var result = "";
    for (var i = 1; i < nbBaskets; i++) {
        for (var j = 0; j < nbBalls; j++) {
            for (var k = 0; k < nbMoves; k++) {
                if (k < i) {
                    result += createBall(i, j, k);
                }
            }
        }
    }
    canvas.innerHTML += result;
}

function updateBadges(basketID) {
    var badges = document.getElementsByClassName("badge_nb_color");
    var nbMoves = formValues["nbMoves"];
    for (var i = 0; i < badges.length; i++) {
        for(var j = 0; j < nbMoves; j++){
            var move = j;
            if (badges[i].classList.contains("badge_" + (basketID)) && badges[i].classList.contains(colors[move] + "_counter")) {
                badges[i].innerHTML = overallGame.machineState[basketID][move];
                break;
            }
        }
    }
}

function updateASingleBasket(basketID) {
    var basketState = overallGame.machineState[basketID];
    var nbMoves = formValues["nbMoves"];
    var balls = document.getElementsByClassName("div_balls");
    var ballsOfBasket = [];
    for (var i = 0; i < balls.length; i++) {
        if (balls[i].id.split("_")[1] == basketID) {
            ballsOfBasket.push(balls[i]);
        }
    }
    for(var i = 0; i < nbMoves; i++){
        var ballsOfMove = [];
        var hiddenBallsOfMove = [];
        for(var j = 0; j < ballsOfBasket.length; j++){
            if (ballsOfBasket[j].id.split("_")[3] == i){
                if(ballsOfBasket[j].style.display == "none"){
                    hiddenBallsOfMove.push(ballsOfBasket[j]);
                } else {
                    ballsOfMove.push(ballsOfBasket[j]);
                }
            }
        }
        if(ballsOfMove.length > basketState[i]){
            var difference = ballsOfMove.length - basketState[i];
            for(var j = 0; j < difference; j++){
                ballsOfMove[j].style.display = "none";
            }
        } else if(ballsOfMove.length < basketState[i]){
            var difference = basketState[i] - ballsOfMove.length;
            for(var j = 0; j < hiddenBallsOfMove.length && j < difference; j++){
                hiddenBallsOfMove[j].style.display = "block";
            }
            if(j < difference){            
                for(var j = 0; j < difference - hiddenBallsOfMove.length; j++){
                    var newBall = createBall(basketID, ballsOfBasket.length, i);
                    canvas.innerHTML += newBall;
                    ballsOfBasket.push(canvas.children[canvas.children.length - 1]);
                    positionBall(ballsOfBasket[ballsOfBasket.length - 1], basketID - 1);
                    ballsOfBasket[ballsOfBasket.length - 1].style.display = "block";
                }
            }
        }
    }
}

function updateBasketPositions() {
    basketPositions = [];
    var baskets = canvas.getElementsByClassName("basket_drawing");
    for (var i = 0; i < baskets.length; i++) {
        basketPositions.push([baskets[i].offsetLeft, baskets[i].offsetTop, baskets[i].width]);
    }
}

function positionBalls() {
    var balls = document.getElementsByClassName("div_balls");
    for (var i = 0; i < balls.length; i++) {
        var move = parseInt(balls[i].id.split("_")[3]);
        var basket = parseInt(balls[i].id.split("_")[1]);
        if(move <= basket - 1){
            positionBall(balls[i], basket - 1);
        }
    }
}


function positionBall(ball, basketID) {
    //retrieve the position of the basket
    var basketX = basketPositions[basketID][0];
    var basketY = basketPositions[basketID][1];

    //calculate the max position of the ball
    var sizeBasket = basketPositions[basketID][2] - 30;
    var maxBallX = basketX + sizeBasket;
    var maxBallY = basketY + sizeBasket;

    //retrieve the min position of the ball
    var minBallX = basketX + 10;
    var minBallY = basketY + 45;

    //calculate the position of the ball randomly
    var ballX = Math.floor(Math.random() * (maxBallX - minBallX + 15)) + minBallX;
    var ballY = Math.floor(Math.random() * (maxBallY - minBallY + 15)) + minBallY;

    //modify ball position
    ball.style.position = "absolute";
    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";
}


function showBalls() {
    if (!document.getElementById("adaptation").classList.contains("hidden")) {
        var balls = document.getElementsByClassName("div_balls");
        for (var i = 0; i < balls.length; i++) {
            balls[i].style.display = "block";
        }
    }
}

function hideBalls() {
    var balls = document.getElementsByClassName("div_balls");
    for (var i = 0; i < balls.length; i++) {
        balls[i].style.display = "none";
    }
}

/* PART ABOUT THE SCORE */

function updateScore() {
    var htmlScore = document.getElementById("adapt_score");
    var progressBars = htmlScore.getElementsByClassName("progress-bar");
    if (nbWins + nbDefeats == 0) {
        progressBars[0].style.width = "50%";
        progressBars[0].innerHTML = "0%";
        progressBars[0].setAttribute("aria-valuenow", 0);
        progressBars[1].style.width = "50%";
        progressBars[1].innerHTML = "0%";
        progressBars[1].setAttribute("aria-valuenow", 0);
    } else {
        var wins = nbWins / (nbWins + nbDefeats) * 100;
        var defeats = nbDefeats / (nbWins + nbDefeats) * 100;

        progressBars[0].setAttribute("aria-valuenow", wins);
        progressBars[0].style.width = wins + "%";
        progressBars[0].innerHTML = Math.round(wins) + "%";
        progressBars[1].setAttribute("aria-valuenow", defeats);
        progressBars[1].style.width = defeats + "%";
        progressBars[1].innerHTML = Math.round(defeats) + "%";
    }
}