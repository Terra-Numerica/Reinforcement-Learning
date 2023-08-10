var overallGame = null;

var nbDefeats = 0;
var nbWins = 0;

/* PART ABOUT THE PARAMETERS */

var formValues = {}; //moves, nbBaskets, nbBalls, reward, penalty, speed, opponent, machineStarts, winnerStarts, lossesTrained

function getFormValues() {
    //retrieve the nb of moves possible
    var formNbMoves = document.getElementById("pick_nb_of_moves_possible");
    var formNbMovesChoices = formNbMoves.getElementsByClassName("form-control");
    formValues["moves"] = [];
    for (var i = 0; i < formNbMovesChoices.length; i++) {
        if (formNbMovesChoices[i].checked) {
            formValues["moves"].push(parseInt(formNbMovesChoices[i].value));
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

    //retrieve the machineStarts from the checkbox
    formValues["machineStarts"] = document.getElementById("machine_starts").checked;

    //retrieve the winnerStarts from the checkbox
    formValues["winnerStarts"] = document.getElementById("winner_starts").checked;

    //retrieve the lossesTrained from the checkbox
    formValues["lossesTrained"] = document.getElementById("wins_losses_trained").checked;

    //retrieve the lastWins from the checkbox
    formValues["lastWins"] = document.getElementById("winning_condition").checked;

    console.log(formValues);
}

/* PART ABOUT THE GAME */

var interval = null; //used to control the non-stop mode
var intervalValue = 0.55;

// function to start a new game when the user generates the game according to the parameters
function startGame() {
    // remove status content
    document.getElementById("adapt_history").innerHTML = "";

    updateCanvas();

    let moves = formValues["moves"];
    let nbBaskets = formValues["nbBaskets"];
    let nbBalls = formValues["nbBalls"];
    let reward = formValues["reward"];
    let penalty = formValues["penalty"];
    let speed = formValues["speed"];
    let opponent = formValues["opponent"];
    let machineStarts = formValues["machineStarts"];
    let lastIsWin = formValues["lastWins"];

    //create the game (from Game.js)
    overallGame = new Game(moves, nbBaskets, nbBalls, reward, penalty, speed, opponent, machineStarts, lastIsWin);
    var tmpTxt = texts["adaptation_status_game_number"][langPicked];
    tmpTxt += (nbDefeats + nbWins + 1);
    overallGame.textualHistory = tmpTxt + "<br>" + overallGame.textualHistory;
}

function updateTooltipValue(element) {
    $(element).attr('data-original-title', element.value).tooltip('show');
    $(element).siblings('span').text('\xa0' + element.value);
}

function continueGame() {
    let speed = formValues["speed"];
    let opponent = formValues["opponent"];
    let winnerStarts = formValues["winnerStarts"];
    let lossesTrained = formValues["lossesTrained"];
    let lastWins = formValues["lastWins"];

    let endGame = false;
    if (speed == 0) { // one move at the time
        endGame = overallGame.playOneMove();
        updateGame(endGame, opponent, winnerStarts, lossesTrained, lastWins);
    } else if (speed == 1) { // one game at the time
        endGame = overallGame.playOneGame();
        updateGame(endGame, opponent, winnerStarts, lossesTrained, lastWins);
    } else { // non-stop
        document.getElementById("adapt_speed_interval_range").disabled = false;
        document.getElementById("adapt_pause").classList.remove("d-none");
        document.getElementById("adapt_continue").classList.add("d-none");
        interval = setInterval(() => updateGame(overallGame.playNonStop(), opponent, winnerStarts, lossesTrained, lastWins), (1 - intervalValue) * 1000);
    }
    return false;
}

function updateGame(endGame, opponent, winnerStarts, lossesTrained, lastWins) {
    updateStatus();
    if (endGame) {
        var win = overallGame.player == 0;
        if(!lastWins) win = !win;
        if (!win) {//opponent won
            nbDefeats++;
            overallGame.reinforcement(false, 0, lossesTrained);
            if (overallGame.opponent == opponent[0]) {
                overallGame.reinforcement(true, 1, lossesTrained);
            }
        } else { //machine won
            nbWins++;
            overallGame.reinforcement(true, 0, lossesTrained);
            if (overallGame.opponent == opponent[0]) {
                overallGame.reinforcement(false, 1, lossesTrained);
            }
        }
        for (let j = 1; j < overallGame.nbBaskets; j++) {
            updateBadges(j);
            updateASingleBasket(j);
        }
        updateScore();
        var tmpTxt = texts["adaptation_status_game_number"][langPicked];
        tmpTxt += (nbDefeats + nbWins + 1);
        overallGame.textualHistory = tmpTxt + "<br>" + overallGame.textualHistory;

        overallGame.restartGame();
        if (!winnerStarts && lastWins) { //the player who won starts the next game
            overallGame.player = 1 - overallGame.player
        }
    }
}

function updateStatus() {
    var status = document.getElementById("adapt_history");
    var gameStatus = overallGame.textualHistory;
    status.innerHTML = gameStatus;
    window.dispatchEvent(new Event('resize'));
}


function pauseGame() {
    clearInterval(interval);
    document.getElementById("adapt_speed_interval_range").disabled = true;
    document.getElementById("adapt_continue").classList.remove("d-none");
    document.getElementById("adapt_pause").classList.add("d-none");
}

/* PART ABOUT THE VISUALIZATION */

var canvas = null;
var colors = ["yellow", "red", "blue", "green", "purple"];
var eventAdded = false;
var basketPositions = [];

function updateCanvas() {
    if (interval != null) pauseGame();
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

        eventAdded = true;
    }

    var newG = document.getElementById("adapt_new_game");
    newG.disabled = true;

    //show or hide elements needed for nonstop mode
    //TODO: visual issue with the grid coz it's fitting depending of the content...
    document.getElementById("adapt_continue").classList.remove("d-none");
    if(formValues["speed"] === 2){
        document.getElementById("adaptation").classList.add("grid_modified");
        document.getElementById("adapt_nonstop_speed").classList.remove("d-none");
    } else {
        document.getElementById("adaptation").classList.remove("grid_modified");
        document.getElementById("adapt_nonstop_speed").classList.add("d-none");
        document.getElementById("adapt_pause").classList.add("d-none");
    }

    setTimeout(() => {
        //console.profile("updateCanvas");
        canvas = document.getElementById("adapt_visualization");
        var nbBaskets = formValues["nbBaskets"];
        var moves = formValues["moves"];
        var nbBalls = formValues["nbBalls"];

        canvas.innerHTML = '<legend for="adapt_visualization" translate="adaptation_vizualisation">' + texts["adaptation_vizualisation"][langPicked] + '</legend>';
        createBaskets(nbBaskets, moves);
        createBalls(nbBalls, moves, nbBaskets);
        updateBasketPositions();
        positionBalls();

        //if the grid is one column, scroll to the visualization part
        if (window.innerWidth < 1000) {
            document.getElementById("adapt_game_status").scrollIntoView({ behavior: "smooth" });
        }

        newG.disabled = false;
        
        //console.profileEnd("updateCanvas");
    }, 100);
}

function createBaskets(nbBaskets, moves) {
    var basket = '<img src="./images/new_basket.png" width="150px" height="150px" class="basket_drawing" alt="A basket/un casier">';
    var nbBalls = formValues["nbBalls"];
    var tmpCounter = 0;
    for (var i = 1; i < nbBaskets; i++) {
        canvas.innerHTML += basket;
        canvas.innerHTML += '<span class="badge badge-secondary rounded-circle position-absolute badge_nb_basket">' + i + '</span>';
        canvas.children[canvas.children.length - 2].id = "basket" + i;
        var badgeForEachColor = '<span class="badge badge-primary position-absolute badge_nb_color badge_NBASKET COLOR_counter" style="transform: translateX(TRANSXpx);">NBALLS</span>';
        var result = "";

        var originalTransX = -90;
        if (i >= moves[tmpCounter + 1]) {
            tmpCounter++;
        }
        originalTransX -= 15 * (tmpCounter);

        for (var j = 0; j < moves.length; j++) {
            var tmp_res = "";
            if (moves[j] - 1 < i) {
                tmp_res += badgeForEachColor.replace("NBALLS", nbBalls);
                tmp_res = tmp_res.replace("TRANSX", originalTransX + 30 * (j));
                tmp_res = tmp_res.replace("NBASKET", i);
            }
            result += tmp_res.replace("COLOR", colors[moves[j] - 1]);
        }
        canvas.innerHTML += result;
    }
}

function createBall(basketID, ballID, move) {
    var ball = '<div id="ball_' + basketID + '_' + ballID + '_' + move + '" class="div_balls" style="background-color: ' + colors[move] + ';"></div>';
    return ball;
}

function createBalls(nbBalls, moves, nbBaskets) {
    var result = "";
    for (var i = 1; i < nbBaskets; i++) {
        for (var j = 0; j < nbBalls; j++) {
            for (var k = 0; k < moves.length; k++) {
                if (moves[k] - 1 < i) {
                    result += createBall(i, j, moves[k] - 1);
                }
            }
        }
    }
    canvas.innerHTML += result;
}

function updateBadges(basketID) {
    var badges = document.getElementsByClassName("badge_nb_color");
    var moves = formValues["moves"];
    for (var i = 0; i < badges.length; i++) {
        if (badges[i].classList.contains("badge_" + (basketID))) {
            badges[i].classList.remove("badge_shadow");
            for (var j = 0; j < moves.length; j++) {
                if (badges[i].classList.contains(colors[moves[j] - 1] + "_counter")) {
                    if (overallGame.machineState[basketID][j] != badges[i].innerHTML && formValues["speed"] != 2) {
                        badges[i].classList.add("badge_shadow");
                    }
                    badges[i].innerHTML = overallGame.machineState[basketID][j];
                    break;
                }
            }
        }
    }
}

function updateASingleBasket(basketID) {
    //why are there more balls than expected sometimes?
    var basketState = overallGame.machineState[basketID];
    var moves = formValues["moves"];
    var balls = document.getElementsByClassName("div_balls");
    var ballsOfBasket = [];
    for (var i = 0; i < balls.length; i++) {
        if (balls[i].id.split("_")[1] == basketID) {
            ballsOfBasket.push(balls[i]);
        }
    }
    for (var i = 0; i < moves.length; i++) {
        var ballsOfMove = [];
        var hiddenBallsOfMove = [];
        for (var j = 0; j < ballsOfBasket.length; j++) {
            if (ballsOfBasket[j].id.split("_")[3] == moves[i] - 1) {
                if (ballsOfBasket[j].style.display == "none") {
                    hiddenBallsOfMove.push(ballsOfBasket[j]);
                } else {
                    ballsOfMove.push(ballsOfBasket[j]);
                }
            }
        }
        if (ballsOfMove.length > basketState[i]) {
            var difference = ballsOfMove.length - basketState[i];
            for (var j = 0; j < difference; j++) {
                ballsOfMove[j].style.display = "none";
            }
        } else if (ballsOfMove.length < basketState[i]) {
            var difference = basketState[i] - ballsOfMove.length;
            for (var j = 0; j < hiddenBallsOfMove.length && j < difference; j++) {
                hiddenBallsOfMove[j].style.display = "block";
            }
            if (j < difference) {
                for (var j = 0; j < difference - hiddenBallsOfMove.length; j++) {
                    var newBall = createBall(basketID, ballsOfBasket.length, moves[i] - 1);
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
        if (move <= basket - 1) {
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

function changeIntervalValue(elem, val){
    intervalValue = val;
    if(interval != null){
        clearInterval(interval);
        interval = setInterval(() => updateGame(overallGame.playNonStop(), formValues["opponent"], formValues["machineStarts"]), (1 - intervalValue) * 1000);
    }
    var label = elem.previousElementSibling;
    label.innerHTML = "x" + Math.round(val * 100) / 100;
}

/* PART ABOUT THE SCORE */

function updateScore() {
    var htmlScore = document.getElementById("adapt_score");
    var progressBars = htmlScore.getElementsByClassName("progress-bar");
    var htmlCounter = document.getElementById("adapt_counter_games");
    htmlCounter.innerHTML = nbDefeats + nbWins;
    htmlCounter = document.getElementById("adapt_victories");
    htmlCounter.innerHTML = nbWins;
    htmlCounter = document.getElementById("adapt_defeats");
    htmlCounter.innerHTML = nbDefeats;
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