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
    getFormValues();
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

function updateCanvas(){
    canvas = document.getElementById("adapt_visualization");
    updateBaskets();
}

function updateBaskets(){
    canvas.innerHTML = "";
    var basket = '<img src="./images/new_basket.png" width="150px" height="150px" usemap="#basket_map" alt="A basket/un casier">';
    for (var i = 0; i < parseInt(formValues["nbBaskets"]); i++) {
        canvas.innerHTML += basket;
        updateBalls(canvas.lastChild);
    }
}

function updateBalls(basket){
    var redBall = '<img src="./images/new_redball.png" width="10px" height="10px" alt="A red ball/une bille rouge">';
    var yellowBall = '<img src="./images/new_yellowball.png" width="10px" height="10px" alt="A yellow ball/une bille jaune">';
    for (var i = 0; i < parseInt(formValues["nbBalls"]); i++) {
        //TODO : add the balls in the map of the basket image
        canvas.innerHTML += redBall;
        positionBall(canvas.lastChild, basket);
        canvas.innerHTML += yellowBall;
        positionBall(canvas.lastChild, basket);
    }
}

function positionBall(ball, basket){
    var sizeBall = 10;
    var sizeBasket = 150;

    //retrieve position of the basket
    var basketPosition = basket.getBoundingClientRect();
    var basketX = basketPosition.x;
    var basketY = basketPosition.y;
    
    //calculate the max position of the ball
    var maxBallX = basketX + sizeBasket - sizeBall;
    var maxBallY = basketY + sizeBasket - sizeBall;

    //calculate the min position of the ball
    var minBallX = basketX;
    var minBallY = basketY;

    //calculate the position of the ball
    var ballX = Math.floor(Math.random() * (maxBallX - minBallX + 1)) + minBallX;
    var ballY = Math.floor(Math.random() * (maxBallY - minBallY + 1)) + minBallY;

    ball.style.position = "absolute";
    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";
}


/* PART ABOUT THE SCORE */

var htmlScore = document.getElementById("adapt_score");

function updateScore(){
    //TODO : update the score
}