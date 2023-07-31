const opponents = {
    MACHINE: "MACHINE",
    EXPERT: "EXPERT",
    HAZARD: "HAZARD"
}

const NB_CASIERS_MAX = 17;

class Game {
    possibleMoves; //format: possibleMoves[id] = move

    nbMoves;
    nbBaskets;
    nbBalls;
    reward;
    penalty;
    speed;
    opponent;

    player; //0 if machine, 1 if opponent
    machineState; //format: machineState[basket][move] = current number of balls for said move in said basket
    currPosition; //format: currPosition = the basket currently visited
    gameMovesHistory; //format: gameMovesHistory[basket][player] = move done by player in basket
    winningMoves; //format: winningMoves[nbBalls] = 1 if winning move, 0 otherwise
    textualHistory; //format: textualHistory = history of the game in text format

    constructor(moves, nbBaskets, nbBalls, reward, penalty, speed, opponent, machineStarts) {
        this.nbMoves = moves.length;
        this.nbBaskets = nbBaskets;
        this.nbBalls = nbBalls;
        this.reward = reward;
        this.penalty = penalty;
        this.speed = speed;
        this.opponent = opponent;

        this.player = (machineStarts) ? 0 : 1;
        this.machineState = [];
        for (var i = 0; i < nbBaskets; i++) {
            this.machineState[i] = [];
        }
        this.currPosition = nbBaskets - 1;
        this.possibleMoves = moves;
        this.gameMovesHistory = [];
        for (var i = 1; i < nbBaskets; i++) {
            this.gameMovesHistory[i] = [];
            for (var j = 0; j < 2; j++) { //because 2 players facing off
                this.gameMovesHistory[i][j] = -1;
            }
        }
        this.winningMoves = [];
        this.computeWinningMoves();
        for (var i = 0; i < nbBaskets; i++) {
            this.initBasket(i);
        }
        this.textualHistory = "";
    }

    //Reset the position (we retrieve the nbBaskets matches) and erase the current history
    restartGame() {
        for (var i = 1; i < this.nbBaskets; i++) {
            this.gameMovesHistory[i][0] = this.gameMovesHistory[i][1] = -1; //not played
        }
        this.currPosition = this.nbBaskets - 1;
    }

    //Compute the winning moves for each basket for the expert opponent. 
    computeWinningMoves() {
        this.winningMoves[0] = 0;
        for (var i = 1; i < NB_CASIERS_MAX; i++) {
            this.winningMoves[i] = 0;
            var j = 0;
            while(j < this.nbMoves){
                // if this move is possible and the next move is not winning, then this move is winning
                if (i - this.possibleMoves[j] >= 0 && this.winningMoves[i - this.possibleMoves[j]] == 0) {
                    this.winningMoves[i] = 1;
                    break;
                }
                j++;
            }
        }
    }

    // Play a move for the machine. It can be the player or its opponent
    // The machine will choose a move randomly, but the probability of choosing a move is proportional to the number of balls in the basket for this move.
    // This is this game's goal: selecting a move that will lead to a winning position thanks to the number of balls in the corresponding basket.
    machineMove(id) {
        var currNbBalls = 0;
        for (var i = 0; i < this.nbMoves; i++) {
            currNbBalls += this.machineState[this.currPosition][i];
        }
        var rnd = parseInt(Math.random() * currNbBalls);
        for (var j = 0; j < this.nbMoves; j++) {
            for (var k = 0; k < this.machineState[this.currPosition][j]; k++) {
                rnd--;
                if (rnd < 0) {
                    this.gameMovesHistory[this.currPosition][id] = j;
                    return j;
                }
            }
        }
        return this.hazardMove();
    }

    // Play a move for the expert opponent. It will choose a move that will lead to a winning position.
    // It will check if there is a winning move for the opponent. If there is, it will play this move, otherwise, it will play a move randomly.
    expertMove() {
        for(var i = 0; i < this.nbMoves; i++){
            if(this.currPosition - this.possibleMoves[i] >= 0 && this.winningMoves[this.currPosition - this.possibleMoves[i]] == 0){
                return i;
            }
        }
        return this.hazardMove();
    }

    // Play a move for the hazard opponent. It will choose a move randomly.
    hazardMove() {
        var max = this.nbMoves;
        if(max > this.currPosition){
            max = this.currPosition;
        }
        return parseInt(Math.random() * max);
    }

    // Update the machine's state according to the result of the game
    // If the machine won, it will reinforce the moves that led to this victory
    // If the machine lost, it will penalize the moves that led to this defeat
    // It will also check if a basket is empty. If it is, it will fill it with the maximum number of balls possible. (It's a reset)
    reinforcement(hasWon, idMachine) {
        for (var i = 1; i < this.nbBaskets; i++) {
            if (this.gameMovesHistory[i][idMachine] >= 0) {
                this.machineState[i][this.gameMovesHistory[i][idMachine]] += ((hasWon) ? this.reward : this.penalty);
                if (this.machineState[i][this.gameMovesHistory[i][idMachine]] < 0) {
                    this.machineState[i][this.gameMovesHistory[i][idMachine]] = 0;
                }
            }
        }
        for (var i = 1; i < this.nbBaskets; i++) {
            var sum = 0;
            for (var j = 0; j < this.nbMoves; j++) {
                sum += this.machineState[i][j];
            }
            if (sum <= 0) {
                this.initBasket(i);
            }
        }
    }

    // Initialize a basket with the number of balls selected for each move
    initBasket(basket){
        for(var i = 0; i < this.nbMoves; i++){
            if(this.possibleMoves[i] <= basket){
                this.machineState[basket][i] = this.nbBalls;
            } else {
                this.machineState[basket][i] = 0;
            }
        }
    }

    // Play a move and return true if the game is over, false otherwise
    playMove(move) {
        // update the history of the game
        var tmpTxt = texts["adaptation_status_player"][langPicked] + " ";
        tmpTxt += texts["adaptation_status_player_" + this.player][langPicked] + " ";
        tmpTxt += texts["adaptation_status_retrieved"][langPicked] + " ";
        tmpTxt += this.possibleMoves[move] + " ";
        tmpTxt += texts["adaptation_status_matches"][langPicked] + " ";
        tmpTxt += this.currPosition + " ";
        tmpTxt += texts["adaptation_status_matches_left"][langPicked] + " ";
        this.textualHistory = tmpTxt + "<br>" + this.textualHistory;

        this.currPosition -= this.possibleMoves[move];
        this.player = (this.player + 1) % 2;
        // if the current position is below the smallest move possible, then the game is over
        if (this.currPosition < this.possibleMoves[0]) {
            tmpTxt = texts["adaptation_status_game_over"][langPicked] + " ";
            tmpTxt += texts["adaptation_status_player_" + this.player][langPicked] + " ";
            tmpTxt += texts["adaptation_status_won"][langPicked];
            this.textualHistory = tmpTxt + "<br>" + this.textualHistory;
            return true;
        } else {
            return false;
        }
    }

    playOneMove() {
        var move = 0;
        if (this.player == 0) { // machine's turn
            move = this.machineMove(0);
        } else { // opponent's turn
            switch (this.opponent) {
                case opponents.MACHINE:
                    move = this.machineMove(1);
                    break;
                case opponents.EXPERT:
                    move = this.expertMove();
                    break;
                case opponents.HAZARD:
                    move = this.hazardMove();
                    break;
            }
        }
        return this.playMove(move);
    }

    playOneGame() {
        this.gameOver = false;
        while (!this.gameOver) {
            this.gameOver = this.playOneMove();
        }
        return this.gameOver;
    }

    playNonStop() {
        var endGame = this.playOneGame();
        return endGame;
    }
}