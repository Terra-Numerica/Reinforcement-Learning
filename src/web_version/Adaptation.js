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

    //disable preview and start btns
    var prev = document.getElementById("adapt_preview");
    var start = document.getElementById("adapt_start");
    prev.disabled = true;
    start.disabled = true;

    setTimeout(() => {
        console.profile("updateCanvas");
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

        //enable preview and start btns
        prev.disabled = false;
        start.disabled = false;
        console.profileEnd("updateCanvas");
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
        var badgeForEachColor = '<span class="badge badge-primary position-absolute badge_nb_color COLOR_counter">NB</span>';
        var result = "";
        for (var j = 0; j < nbMoves; j++) {
            var tmp_res = result;
            if(j <= i + 1) {
                tmp_res += badgeForEachColor.replace("NB", nbBalls);
            }
            result += tmp_res.replace("COLOR", colors[j]);
        }
        canvas.innerHTML += result;
    }
}

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
    //put balls ids
    var balls = canvas.getElementsByClassName("div_balls");
    for (var i = 0; i < balls.length; i++) {
        balls[i].id = ids[i];
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