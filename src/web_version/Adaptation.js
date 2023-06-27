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
    formValues["nbBaskets"] = parseInt(document.getElementById("pick_baskets_nb").value);

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

function startGame() {
    updateCanvas();

    let nbMoves = formValues["nbMoves"];
    let nbBaskets = formValues["nbBaskets"];
    let nbBalls = formValues["nbBalls"];
    let reward = formValues["reward"];
    let penalty = formValues["penalty"];
    let speed = formValues["speed"];
    let opponent = formValues["opponent"];

    overallGame = new Game(nbMoves, nbBaskets, nbBalls, reward, penalty, speed, opponent);

    //show hiden btns
    document.getElementById("adapt_continue").classList.remove("d-none");
    if(speed == 2) document.getElementById("adapt_pause").classList.remove("d-none");
}

function updateTooltipValue(element) {
    $(element).attr('data-original-title', element.value).tooltip('show');
    $(element).siblings('span').text('\xa0' + element.value);
}

function continueGame(){
    let speed = formValues["speed"];
    let opponent = formValues["opponent"];
    let machineStarts = formValues["machineStarts"];

    if (speed == 0) { // one move at the time
        let endGame = overallGame.playOneMove();
        if (endGame) {
            var win = overallGame.player == 0;
            if (!win) {//opponent won
                nbDefeats++;
                console.log("Opponent won");
                overallGame.reinforcement(false, 0);
                if (overallGame.opponent == opponent[0]) {
                    overallGame.reinforcement(true, 1);
                }
            } else {
                nbWins++;
                console.log("Machine won");
                overallGame.reinforcement(true, 0);
                if (overallGame.opponent == opponent[0]){
                    overallGame.reinforcement(false, 1);
                }
            }
            console.log("Updating values...");
            for (let j = 1; j < overallGame.nbBaskets; j++) {
                if (overallGame.gameMovesHistory[j][0] > 0) {
                    updateASingleBasket(j, overallGame.gameMovesHistory[j][0], win);
                }
            }

            updateScore();
            overallGame.restartGame();
            if(!machineStarts) {
                overallGame.player = 1;
            } else {
                overallGame.player = 0;
            }
        }
    }
    return false;
}

/* PART ABOUT THE VISUALIZATION */

var canvas = null;
var colors = ["yellow", "red", "blue", "green", "purple"];
var eventAdded = false;
var basketPositions = [];

function updateCanvas() {
    getFormValues();

    if (!eventAdded) {
        /* EVENTS NEEDED FOR THE RESPONSIVENESS OF THE BALLS */
        window.addEventListener("resize", function () {
            hideBalls();
            updateBasketPositions();
            positionBalls(false, formValues["nbBalls"], formValues["nbMoves"], formValues["nbBaskets"]);
            showBalls();
        });

        $('#navbarTabs').on('hide.bs.collapse', function () {
            hideBalls();
        });

        $('#navbarTabs').on('hidden.bs.collapse', function () {
            showBalls();
            updateBasketPositions();
            positionBalls(false, formValues["nbBalls"], formValues["nbMoves"], formValues["nbBaskets"]);
        });

        $('#navbarTabs').on('show.bs.collapse', function () {
            hideBalls();
        });

        $('#navbarTabs').on('shown.bs.collapse', function () {
            showBalls();
            updateBasketPositions();
            positionBalls(false, formValues["nbBalls"], formValues["nbMoves"], formValues["nbBaskets"]);
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
    for (var i = 0; i < nbBaskets; i++) {
        canvas.innerHTML += basket;
        canvas.innerHTML += '<span class="badge badge-primary position-absolute badge_nb_basket">' + (i + 1) + '</span>';
        canvas.children[canvas.children.length - 2].id = "basket" + i;
        var badgeForEachColor = '<span class="badge badge-primary position-absolute badge_nb_color badge_NBASKET COLOR_counter">NBALLS</span>';
        var result = "";
        for (var j = 0; j < nbMoves; j++) {
            var tmp_res = result;
            if(j <= i) {
                tmp_res += badgeForEachColor.replace("NBALLS", nbBalls);
                tmp_res = tmp_res.replace("NBASKET", i + 1);
            }
            result += tmp_res.replace("COLOR", colors[j]);
        }
        canvas.innerHTML += result;
    }
}

//TODO: separate the creation of a single ball and the creation of all the balls
function createBalls(nbBalls, nbMoves, nbBaskets) {
    var singleBalls = [];
    for (var i = 0; i < nbMoves; i++) {
        singleBalls.push('<div class="div_balls" style="background-color: ' + colors[i] + ';"></div>');
    }

    var result = "";
    var ids = [];
    for (var i = 0; i < nbBaskets; i++) {
        var idB = "basket" + i;
        for (var j = 0; j < nbBalls; j++) {
            for (var k = 0; k < nbMoves; k++) {
                if(k <= i){
                    result += singleBalls[k];
                    ids.push("ball_" + i + "_" + j + "_" + k);
                }
            }
        }
    }
    canvas.innerHTML += result;
    //set balls ids
    var balls = canvas.getElementsByClassName("div_balls");
    for (var i = 0; i < balls.length; i++) {
        balls[i].id = ids[i];
    }

}


function updateASingleBasket(basketID, move, hasWon) {
    var badges = document.getElementsByClassName("badge_nb_color");
    for (var i = 0; i < badges.length; i++) {
        if (badges[i].classList.contains("badge_" + (basketID + 1)) && badges[i].classList.contains(colors[move - 1] + "_counter")) {
            badges[i].innerHTML -= move;
        }
    }
    //retrieve the balls of the basket basketID
    var balls = document.getElementsByClassName("div_balls");
    var ballsOfBasket = [];
    for (var i = 0; i < balls.length; i++) {
        if (balls[i].id.includes("ball_" + basketID)) {
            ballsOfBasket.push(balls[i]);
        }
    }
    //if lost, remove "penalty" balls depending on the move done
    if (!hasWon) {
        var penalty = -formValues["penalty"];
        var counter = 0;
        for (var i = 0; i < ballsOfBasket.length; i++) {
            if (ballsOfBasket[i].style.backgroundColor == colors[move - 1] && ballsOfBasket[i].style.display != "none") {
                ballsOfBasket[i].style.display = "none";
                counter++;
            }
            if (counter == penalty) {
                break;
            }
        }
    } else {//if won, create "reward" balls depending on the move done
        var singleBalls = [];
        for (var i = 0; i < nbMoves; i++) {
            singleBalls.push('<div class="div_balls" style="background-color: ' + colors[i] + ';"></div>');
        }
        var reward = formValues["reward"];
        var counter = 0;
        for (var i = 0; i < ballsOfBasket.length; i++) {
            if (ballsOfBasket[i].style.display == "none") {
                ballsOfBasket[i].style.display = "block";
                ballsOfBasket[i].style.backgroundColor = colors[move - 1];
                counter++;
            }
            if (counter == reward) {
                break;
            }
        }
        if(counter != reward){
            var result = "";
            for (var i = 0; i < reward - counter; i++) {
                result += singleBalls[move - 1];
            }
            canvas.innerHTML += result;
            positionBall(true, canvas.lastChild, basketID);
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

function positionBalls(randomly, nbBalls, nbMoves, nbBaskets) {
    for (var i = 0; i < nbBaskets; i++) {
        for (var j = 0; j < nbBalls; j++) {
            for (var k = 0; k < nbMoves; k++) {
                if(k <= i){
                    positionBall(randomly, document.getElementById("ball_" + i + "_" + j + "_" + k), i);
                }
            }
        }
    }
}


function positionBall(randomly, ball, basketID) {
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

    var ballX = parseInt(ball.style.left);
    var ballY = parseInt(ball.style.top);

    //calculate the position of the ball randomly
    ballX = Math.floor(Math.random() * (maxBallX - minBallX + 15)) + minBallX;
    ballY = Math.floor(Math.random() * (maxBallY - minBallY + 15)) + minBallY;

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

var htmlScore = document.getElementById("adapt_score");

//redo
function updateScore() {
    var progressBars = htmlScore.getElementsByClassName("progress-bar");
    if (nb_wins + nb_defeats == 0) {
        progressBars[0].style.width = "50%";
        progressBars[1].style.width = "50%";
    } else {
        var wins = nb_wins / (nb_wins + nb_defeats) * 100;
        var defeats = nb_defeats / (nb_wins + nb_defeats) * 100;

        progressBars[0].setAttribute("aria-valuenow", wins);
        progressBars[0].style.width = wins + "%";
        progressBars[0].innerHTML = Math.round(wins) + "%";
        progressBars[1].setAttribute("aria-valuenow", defeats);
        progressBars[1].style.width = defeats + "%";
        progressBars[1].innerHTML = Math.round(defeats) + "%";
    }
}