nbMatches = 8; //number of matches in the game
nbMoves = 0;

newStart = true; //true if the game has just started, false otherwise
restart = false; //true if the game has just been restarted, false otherwise

red =  //number of red balls for each match
yellow = new Array(8); //number of yellow balls for each match
AImoves = new Array(5); //record of the moves made by the AI
nbMatchesPerMove = new Array(5); //number of removed matches

//html elements
basketState = null;
gameResult = null;
lastmove = null;
matchesLeft = null;
buttons = null;

//dynamic html elements
htmlYellowBalls = null;
htmlRedBalls = null;
htmlNbMatches = null;
htmlNbOfMatchesTakenByLastMove = null;

function initInteracting(){
    //retrieve the html elements used for displaying the game state
    basketState = document.getElementById("int_basket_state");
    gameResult = document.getElementById("int_end_report");
    lastmove = document.getElementById("int_last_move");
    matchesLeft = document.getElementById("int_matches_left");
    buttons = document.getElementsByClassName("int_btn");

    htmlNbMatches = document.getElementById("NMATCHES_left");
    htmlYellowBalls = document.getElementById("YBALLS");
    htmlRedBalls = document.getElementById("RBALLS");
    htmlNbOfMatchesTakenByLastMove = document.getElementById("NMATCHES_taken");

    for(let i=0; i<8; i++){
        red[i] = 6;
        yellow[i] = 6;
    }
    red[0] = 0;
    for (let i=0; i<5;i++){
        AImoves[i] = 0;
        nbMatchesPerMove[i] = 0;
    }

    if(newStart){
        gameResult.innerHTML = "";
    }
    enableBtns();
    fillTextBasketState();
    fillMatchesLeft();
    console.log(red);
    console.log(yellow);
}

function enableBtns(){
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
    }
}

function fillRedYellow(reward){
    for(let i=0; i< 5; i++){
        if(nbMatchesPerMove[i] == 1){
            yellow[AImoves[i]] += reward;
        }
        if (nbMatchesPerMove[i] == 2){
            red[AImoves[i]] += reward;
        }
    }
    for (let i=0; i<5;i++){
        AImoves[i] = 0;
        nbMatchesPerMove[i] = 0;
    }
    nbMoves = 0;
    fillTextBasketState();
    console.log("Contenu des casiers");
    console.log("Les rouges" + red);
    console.log("Les jaunes" + yellow);
}

function fillTextBasketState(){
    basketState.parentNode.classList.remove("d-none");
    if(basketState.getAttribute("translate") == undefined){
        basketState.setAttribute("translate", "interacting_basket_state");
    }
    basketState.innerHTML = texts["interacting_basket_state"][langPicked];
    htmlYellowBalls.innerHTML = JSON.stringify(yellow);
    htmlRedBalls.innerHTML = JSON.stringify(red);
}

function fillResult(result){
    if (result == 0){ //The AI won
        gameResult.classList.remove("text-danger");
        gameResult.classList.add("text-success");
        gameResult.setAttribute("translate", "interacting_end_won");
        gameResult.innerHTML = texts["interacting_end_won"][langPicked];
    } else { // The AI lost
        gameResult.classList.remove("text-success");
        gameResult.classList.add("text-danger");
        gameResult.setAttribute("translate", "interacting_end_lost");
        gameResult.innerHTML = texts["interacting_end_lost"][langPicked];
    }
}

//TODO: should display the player's latest move as well in another function
function fillLastMove(nbOfMatchesTaken){
    lastmove.parentNode.classList.remove("d-none");
    if(lastmove.getAttribute("translate") == undefined){
        lastmove.setAttribute("translate", "interacting_last_move");
    }
    lastmove.innerHTML = texts["interacting_last_move"][langPicked];
    htmlNbOfMatchesTakenByLastMove.innerHTML = nbOfMatchesTaken;
}

function fillMatchesLeft(){
    htmlNbMatches.parentNode.classList.remove("d-none");
    htmlNbMatches.innerHTML = nbMatches;
}

function errorMessage(){
    matchesLeft.innerHTML = texts["interacting_error"][langPicked];
    gameResult.innerHTML = texts["interacting_end_error"][langPicked];
}

function actionAI(){
    if (nbMatches == 1){
        AImoves[nbMoves] = nbMatches - 1;
        nbMatchesPerMove[nbMoves] = 1;
        nbMatches = 0;
        fillMatchesLeft();
        fillResult(0);
        fillLastMove(0);
        fillRedYellow(3);
        lastmove.parentNode.classList.add("d-none");
        nbMoves = 0;
    } else {
        let nbRed = red[nbMatches - 1];
        let nbYellow = yellow[nbMatches - 1];
        let randomNb = 0;
        if (nbRed == 0 && nbYellow == 0){
            nbMatches = 8;
            initInteracting();
            basketState.parentNode.classList.add("d-none");
            gameResult.innerHTML = "";
            lastmove.parentNode.classList.add("d-none");
            matchesLeft.parentNode.classList.add("d-none");
            errorMessage();
            randomNb = 3;
        } else if (nbRed == 0) {
            randomNb = 1;
        } else if (nbYellow == 0) {
            randomNb = 2;
        } else {
            let valuation = 1 + parseInt(Math.random() * (nbRed + nbYellow));
            //valuation is a random number between 1 and the sum of the number of red and yellow balls
            if (valuation <= nbYellow) {
                randomNb = 1;
            } else {
                randomNb = 2;
            }
        }
        if (randomNb == 1) {
            AImoves[nbMoves] = nbMatches - 1;
            nbMatchesPerMove[nbMoves] = 1;
            nbMoves++;
        }
        if (randomNb == 2){
            AImoves[nbMoves] = nbMatches - 1;
            nbMatchesPerMove[nbMoves] = 2;
            nbMoves++;
        }
        if (randomNb != 3){
            nbMatches -= randomNb;
            fillLastMove(randomNb);
            fillMatchesLeft();
            if (nbMatches == 0) {
                lastmove.parentNode.classList.add("d-none");
                fillResult(0);
                fillRedYellow(3);
                nbMoves = 0;
            }
        }
    }
}

function interact(btn){
    newStart = false;
    restart = false;
    if (btn == 1 && nbMatches - 1 >= 0) {
        nbMatches--;
        if(nbMatches < 2){
            buttons[1].disabled = true;
        }
        if(nbMatches < 1){
            buttons[0].disabled = true;
        }
        fillMatchesLeft();
        gameResult.innerHTML = "";
        basketState.parentNode.classList.add("d-none");
        if (nbMatches == 0){
            lastmove.parentNode.classList.add("d-none");
            fillResult(1);
            fillRedYellow(-1);
        } else if (nbMatches > 0) {
            fillLastMove(2);
            actionAI();
        }
    } else if (btn == 2 && nbMatches - 2 >= 0) {
        nbMatches -= 2;
        fillMatchesLeft();
        gameResult.innerHTML = "";
        basketState.parentNode.classList.add("d-none");
        if (nbMatches == 0) {
            lastmove.parentNode.classList.add("d-none");
            fillResult(1);
            fillRedYellow(-1);
        } else if (nbMatches > 0) {
            fillLastMove(2);
            actionAI();
        }
    } else if (btn == 3){
        restart = true;
        nbMatches = 8;
        enableBtns();
        fillMatchesLeft();
        fillRedYellow(0);
        basketState.parentNode.classList.add("d-none");
        gameResult.innerHTML = "";
        lastmove.parentNode.classList.add("d-none");
    } else if (btn == 4){
        initInteracting();
        nbMatches = 8;
        fillMatchesLeft();
        gameResult.innerHTML = "";
        lastmove.parentNode.classList.add("d-none");
    }

    if(nbMatches < 2){
        buttons[1].disabled = true;
    }

    if(nbMatches < 1){
        buttons[0].disabled = true;
    }
}
