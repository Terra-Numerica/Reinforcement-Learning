/* PART ABOUT THE PARAMETERS */


//nbMoves, nbBaskets, nbBalls, reward, penalty, speed, opponent, machineStarts (bool)
var formValues = {};

function getFormValues() {
    //retrieve the nb of moves possible
    var formNbMoves = document.getElementById("pick_nb_of_moves_possible");
    var formNbMovesChoices = formNbMoves.getElementsByClassName("form-control");
    for (var i = 0; i < formNbMovesChoices.length; i++) {
        if (formNbMovesChoices[i].checked) {
            formValues["nbMoves"] = formNbMovesChoices[i].value;
        }
    }

    //retrieve the nb of baskets
    formValues["nbBaskets"] = document.getElementById("pick_baskets_nb").value;

    //retrieve the nb of balls
    formValues["nbBalls"] = document.getElementById("balls_per_color").value;

    //retrieve the reward
    formValues["reward"] = document.getElementById("pick_reward").value;

    //retrieve the penalty
    formValues["penalty"] = document.getElementById("pick_penalty").value;

    //retrieve the speed from the select element pick_speed
    var formSpeed = document.getElementById("pick_speed");
    formValues["speed"] = formSpeed.options[formSpeed.selectedIndex].value;

    //retrieve the opponent from the select element pick_opponent
    var formOpponent = document.getElementById("pick_opponent");
    formValues["opponent"] = formOpponent.options[formOpponent.selectedIndex].value;

    //add the value of the checkbox
    formValues["machineStarts"] = document.getElementById("machine_starts").checked;

    console.log(formValues);
}

function playGame() {
    updateCanvas();
    //launchGame(); //in Game.js

    //TODO : send the formValues to the server (?)
    //TODO : the btn text & color has to change and become "pause" and "stop" depending on the state of the game
    return false;
}

function updateTooltipValue(element) {
    $(element).attr('data-original-title', element.value).tooltip('show');
    $(element).siblings('span').text('\xa0' + element.value);
}


/* PART ABOUT THE VISUALIZATION */

var canvas = null;

function updateCanvas() {
    getFormValues();
    canvas = document.getElementById("adapt_visualization");
    updateBaskets();
    updateBalls();
    window.addEventListener("resize", function () {
        if (!document.getElementById("adaptation").classList.contains("hidden")) {
            var balls = document.getElementsByClassName("ball_drawings");
            for (var i = 0; i < balls.length; i++) {
                var basketID = "basket" + Math.floor(i / (parseInt(formValues["nbBalls"]) * parseInt(formValues["nbMoves"])));
                positionBall(balls[i], basketID);
            }
        }
    });
}

function updateBaskets() {
    canvas.innerHTML = '<legend for="adapt_visualization" translate="adaptation_vizualisation">' + texts["adaptation_vizualisation"][langPicked] + '</legend>';
    var basket = '<img src="./images/new_basket.png" width="150px" height="150px" class="basket_drawing" alt="A basket/un casier">';
    for (var i = 0; i < parseInt(formValues["nbBaskets"]); i++) {
        canvas.innerHTML += basket;
        canvas.innerHTML += '<span class="badge badge-primary position-absolute badge_nb_basket">' + (i + 1) + '</span>';
        canvas.children[canvas.children.length - 2].id = "basket" + i;
    }
}

function updateBalls() {
    var redBall = '<img src="./images/new_redball.png" width="10px" height="10px" class="ball_drawings" alt="A red ball/une bille rouge">';
    var yellowBall = '<img src="./images/new_yellowball.png" width="10px" height="10px" class="ball_drawings" alt="A yellow ball/une bille jaune">';
    for (var i = 0; i < parseInt(formValues["nbBaskets"]); i++) {
        for (var j = 0; j < parseInt(formValues["nbBalls"]); j++) {
            canvas.innerHTML += redBall;
            var redB = canvas.lastChild;
            var idB = "basket" + i;
            positionBall(redB, idB);
            canvas.innerHTML += yellowBall;
            var yellowB = canvas.lastChild;
            positionBall(yellowB, idB);
        }
    }
}

function positionBall(ball, basketID) {
    var basket = document.getElementById(basketID);
    var sizeBasket = basket.width - 30;

    //retrieve position of document
    var documentPosition = document.documentElement.getBoundingClientRect();

    //retrieve position of the basket according to documentPosition
    var basketPosition = basket.getBoundingClientRect()
    var basketX = basketPosition.left - documentPosition.left;
    var basketY = basketPosition.top - documentPosition.top;

    //calculate the max position of the ball
    var maxBallX = basketX + sizeBasket;
    var maxBallY = basketY + sizeBasket;

    //retrieve the min position of the ball
    var minBallX = basketX + 10;
    var minBallY = basketY + 50;

    //calculate the position of the ball randomly
    var ballX = Math.floor(Math.random() * (maxBallX - minBallX + 15)) + minBallX;
    var ballY = Math.floor(Math.random() * (maxBallY - minBallY + 15)) + minBallY;

    //modify ball position
    ball.style.position = "absolute";
    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";
}


/* PART ABOUT THE SCORE */

var htmlScore = document.getElementById("adapt_score");

var nbWins = 0;
var nbLosses = 0;

function updateScore() {
    //TODO : update the score 
}