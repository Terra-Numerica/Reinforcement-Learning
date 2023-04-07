
nbMatches = 8; //number of matches in the game
nbMoves = 0;

red =  //number of red balls for each match
yellow = new Array(8); //number of yellow balls for each match
AImoves = new Array(5); //record of the moves made by the AI
nbMatchesPerMove = new Array(5); //number of removed matches

basketState = null;
gameResult = null;
lastmove = null;
matchesLeft = null;

function initInteracting(){
    basketState = document.getElementById("int_basket_state");
    gameResult = document.getElementById("int_end_report");
    lastmove = document.getElementById("int_last_move");
    matchesLeft = document.getElementById("int_matches_left");

    for(let i=0; i<8; i++){
        red[i] = 6;
        yellow[i] = 6;
    }

    red[0] = 0;
    for (let i=0; i<5;i++){
        AImoves[i] = 0;
        nbMatchesPerMove[i] = 0;
    }

    fillTextBasketState();
    fillMatchesLeft();
    console.log(red);
    console.log(yellow);
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
    txt = basketState.innerHTML;
    txt = txt.replace("YBALLS", JSON.stringify(yellow));
    txt = txt.replace("RBALLS", JSON.stringify(red));
    basketState.innerHTML = txt;
}

function fillResult(result){
    if (result == 0){ //The AI won
        gameResult.translate = "int_end_won";
    } else { // The AI lost
        gameResult.translate ="int_end_lost";
    }
}

//TODO: display the player's latest move as well in another function
function fillLastMove(nbOfMatchesTaken){
    lastmove.innerHTML = texts["int_last_move"][langPicked];
    txt = lastmove.innerHTML;
    txt = txt.replace("NMATCHES", nbOfMatchesTaken);
    lastmove.innerHTML = txt;
}

function fillMatchesLeft(){
    txt = matchesLeft.innerHTML;
    txt = txt.replace("NMATCHES", nbMatches);
    matchesLeft.innerHTML = txt;
}

function errorMessage(){
    matchesLeft.innerHTML = texts["int_error"][langPicked];
    gameResult.innerHTML = texts["int_end_error"][langPicked];
}

function actionAI(){
    if (nbMatches == 1){
        AImoves[nbMoves] = nbMatches - 1;
        nbMatchesPerMove[nbMoves] = 1;
        nbMatches = 0;
        fillMatchesLeft();
        fillLastMove(0);
        fillRedYellow(3);
        nbMoves = 0;
    } else {
        let nbRed = red[nbMatches - 1];
        let nbYellow = yellow[nbMatches - 1];
        let randomNb = 0;
        if (nbRed == 0 && nbYellow == 0){
            nbMatches = 8;
            init();
            basketState.innerHTML = "";
            gameResult.innerHTML = "";
            lastmove.innerHTML = "";
            matchesLeft.innerHTML = "";
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
                fillResult(0);
                fillRedYellow(3);
                nbMoves = 0;
            }
        }
    }
}

function interact(btn){
    if (btn == 1 && nbMatches - 1 >= 0) {
        nbMatches--;
        fillMatchesLeft();
        gameResult.innerHTML = "";
        if (nbMatches == 0){
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
        if (nbMatches == 0) {
            fillResult(1);
            fillRedYellow(-1);
        } else if (nbMatches > 0) {
            fillLastMove(2);
            actionAI();
        }
    } else if (btn == 3){
        nbMatches = 8;
        fillMatchesLeft();
        fillRedYellow(0);
        gameResult.innerHTML = "";
        lastmove.innerHTML = "";
    } else if (btn == 4){
        nbMatches = 8;
        fillMatchesLeft();
        initInteracting();
        gameResult.innerHTML = "";
        lastmove.innerHTML = "";
    }
}