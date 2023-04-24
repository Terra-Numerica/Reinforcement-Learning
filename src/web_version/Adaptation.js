var overall_game = null;

var nb_defeats = 0;
var nb_wins = 0;

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

function playGame() {
    updateCanvas();
    //TODO : send the formValues to the server (?)
    //TODO : the btn text & color has to change and become "pause" and "stop" depending on the state of the game

    let nbMoves = formValues["nbMoves"];
    let nbBaskets = formValues["nbBaskets"];
    let nbBalls = formValues["nbBalls"];
    let reward = formValues["reward"];
    let penalty = formValues["penalty"];
    let speed = formValues["speed"];
    let opponent = formValues["opponent"];
    let machineStarts = formValues["machineStarts"];

    overall_game = new Game(nbMoves, nbBaskets);
    overall_game.init_machine(nbMoves, nbBaskets, nbBalls, reward, penalty, speed, opponent, machineStarts ? 0 : 1);

    let actif = false; //for the nonstop mode

    if (speed == 0) {
        var fin_partie = overall_game.jouerUnCoup();
        if (fin_partie) {
            if (overall_game.joueur == 0) {//adversaire a gagné
                nb_defeats++;
                console.log("Adversaire gagne");
                overall_game.renforcement(false, 0);
                if (overall_game.adversaire == opponent[MACHINE])
                    overall_game.renforcement(true, 1);
            }
            else {
                nb_wins++;
                console.log("Machine gagne");
                overall_game.renforcement(true, 0);
                if (overall_game.adversaire == opponent[MACHINE])
                    overall_game.renforcement(false, 1);
            }
            console.log("Mise à jour des valeurs...");

            for (let j = 1; j < overall_game.nb_casiers; j++) {
                if (overall_game.coups_machine[j][0] != -1 || overall_game.coups_machine[j][1] != -1) {
                    updateASingleBasket(j);
                }
            }
            updateScore();
            overall_game.reinit_partie();
            if (!machineStarts)
                overall_game.joueur = 1;
            else overall_game.joueur = 0;
        }
    } else if (speed == 1) {
        jeu.jouerUnePartie();
        if (jeu.joueur == 0) {//adversaire a gagné
            nb_defeats++;
            console.log("Adversaire gagne");
            jeu.renforcement(false, 0);
            if (jeu.adversaire == opponents[MACHINE])
                jeu.renforcement(true, 1);
        }
        else {
            nbWins++;
            console.log("Machine gagne");
            jeu.renforcement(true, 0);
            if (jeu.adversaire == opponents[MACHINE])
                jeu.renforcement(false, 1);
        }
        console.log("Mise à jour des valeurs...");
        for (let j = 1; j < jeu.nb_casiers; j++) {
            if (jeu.coups_machine[j][0] != -1 || jeu.coups_machine[j][1] != -1) {
                updateASingleBasket(j);
            }
        }
        updateScore();
        jeu.reinit_partie();
        if (!machineStarts)
            jeu.joueur = 1;
        else jeu.joueur = 0;
    } else {
        //TODO : implement the speed 2 (non-stop, which uses threads in java)
    }

    return false;
}

function updateTooltipValue(element) {
    $(element).attr('data-original-title', element.value).tooltip('show');
    $(element).siblings('span').text('\xa0' + element.value);
}

/* PART ABOUT THE VISUALIZATION */

var canvas = null;
var colors = ["yellow", "red", "blue", "green", "purple"];

function updateCanvas() {
    getFormValues();

    canvas = document.getElementById("adapt_visualization");
    updateBaskets(formValues["nbBaskets"], formValues["nbMoves"]);
    updateBalls(formValues["nbBalls"], formValues["nbMoves"], formValues["nbBaskets"]);
    window.addEventListener("resize", function () {
        if (!document.getElementById("adaptation").classList.contains("hidden")) {
            var balls = document.getElementsByClassName("ball_drawings");
            for (var i = 0; i < balls.length; i++) {
                var basketID = "basket" + Math.floor(i / (parseInt(formValues["nbBalls"]) * parseInt(formValues["nbMoves"])));
                positionBall(balls[i], basketID);
            }
        }
    });

    //if the grid is one column, scroll to the visualization part
    if (window.innerWidth < 1000) {
        document.getElementById("adapt_visualization").scrollIntoView({behavior: "smooth"});
    }
}

function updateBaskets(nbBaskets, nbMoves) {
    canvas.innerHTML = '<legend for="adapt_visualization" translate="adaptation_vizualisation">' + texts["adaptation_vizualisation"][langPicked] + '</legend>';
    var basket = '<img src="./images/new_basket.png" width="150px" height="150px" class="basket_drawing" alt="A basket/un casier">';
    for (var i = 0; i < nbBaskets; i++) {
        canvas.innerHTML += basket;
        canvas.innerHTML += '<span class="badge badge-primary position-absolute badge_nb_basket">' + (i + 1) + '</span>';
        canvas.children[canvas.children.length - 2].id = "basket" + i;
        var badgeForEachColor = '<span class="badge badge-primary position-absolute badge_nb_color COLOR_counter">0</span>';
        for (var j = 0; j < nbMoves; j++) {
            canvas.innerHTML += badgeForEachColor.replace("COLOR", colors[j]);
        }
    }
}

function updateBalls(nbBalls, nbMoves, nbBaskets) {
    var singleBall = '<img src="./images/new_COLORball.png" width="10px" height="10px" class="ball_drawings" alt="A COLOR ball/une bille COLOR">';
    for (var i = 0; i < nbBaskets; i++) {
        var idB = "basket" + i;
        for (var j = 0; j < nbBalls; j++) {
            for (var k = 0; k < nbMoves; k++) {
                canvas.innerHTML += singleBall.replace("COLOR", colors[k]);
                var ball = canvas.lastChild;
                ball.id = "ball" + i + "_" + j + "_" + k;
                positionBall(ball, idB);
            }
        }
    }
}

function updateASingleBasket(basketID, nbMoves) { //nb of balls and badges values
    var basket = document.getElementById("basket" + (basketID + 1));
    var nbBallsForEachColor = [0, 0, 0, 0, 0];
    //use overal_game "machine"
    for (var i = 0; i < nbMoves; i++) {
        console.log(overall_game.machine);
        nbBalls += overall_game.machine[basketID][i];
        nbBallsForEachColor[i] = overall_game.machine[basketID][i];
    }
    //update the number of balls in the basket for each color
    var currBadge = basket.nextSibling.nextSibling;
    while (currBadge != null && currBadge.classList.contains("badge_nb_color")) {
        //get the class with _counter in it
        var thisColor = "";
        for (var i = 0; i < currBadge.classList.length; i++) {
            if (currBadge.classList[i].includes("_counter")) {
                thisColor = currBadge.classList[i].split("_")[2];
                break;
            }
        }
        currBadge.innerHTML = nbBallsForEachColor[colors.indexOf(thisColor)];
        currBadge = currBadge.nextSibling;
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