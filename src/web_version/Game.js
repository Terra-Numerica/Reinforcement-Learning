const opponents = {
    MACHINE: 0,
    EXPERT: 1,
    HAZARD: 2
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
    currPosition; //format: currPosition = current basket
    gameMovesHistory; //format: gameMovesHistory[basket][player] = move done by player in basket
    winningMoves; //format: winningMoves[nbBalls] = 1 if winning move, 0 otherwise

    constructor(nbMoves, nbBaskets, nbBalls, reward, penalty, speed, opponent) {
        this.nbMoves = nbMoves;
        this.nbBaskets = nbBaskets;
        this.nbBalls = nbBalls;
        this.reward = reward;
        this.penalty = penalty;
        this.speed = speed;
        this.opponent = opponent;

        this.player = 0;
        this.machineState = [];
        for (var i = 0; i < nbBaskets; i++) {
            this.machineState[i] = [];
            for (var j = 0; j < nbMoves; j++) {
                if(j <= i) {
                    this.machineState[i][j] = nbBalls;
                } else {
                    this.machineState[i][j] = 0;
                }
            }
        }
        this.currPosition = nbBaskets - 1;
        this.possibleMoves = [];
        for (var i = 0; i < nbMoves; i++) {
            this.possibleMoves[i] = i + 1;
        }
        this.gameMovesHistory = [];
        for (var i = 0; i < nbBaskets; i++) {
            this.gameMovesHistory[i] = [];
            for (var j = 0; j < 2; j++) { //because 2 players facing off
                this.gameMovesHistory[i][j] = -1;
            }
        }
        this.winningMoves = [];
        this.computeWinningMoves();

        console.log("Possible moves: " + this.possibleMoves);
        console.log("Machine: " + this.machineState);
        console.log("Current position: " + this.currPosition);
        console.log("Machine moves: " + this.gameMovesHistory);
        console.log("Winning moves: " + this.winningMoves);
    }

    restartGame() {
        for (var i = 0; i < this.nbBaskets; i++) {
            this.gameMovesHistory[i][0] = this.gameMovesHistory[i][1] = -1; //not played??
        }
        this.currPosition = this.nbBaskets - 1;
    }

    computeWinningMoves() {
        this.winningMoves[0] = 0;
        for (var i = 1; i < NB_CASIERS_MAX; i++) {
            this.winningMoves[i] = 0;
            for (var j = 0; j < this.nbMoves; j++) {
                if (i - this.possibleMoves[j] >= 0 && this.winningMoves[i - this.possibleMoves[j]] == 0) {
                    this.winningMoves[i] = 1;
                    break;
                }
            }
        }
    }

    playMove(move){
        console.log("Current position: " + (this.currPosition + 1) + " Move: " + this.possibleMoves[move]);
        this.currPosition -= this.possibleMoves[move];
        this.player = 1 - this.player;
        if (this.currPosition < this.possibleMoves[0]){
            console.log("Game ended");
            return true;
        } else {
            return false;
        }
    }

    machineMove(id) {
        var currNbBalls = 0;
        for (var i = 0; i < this.nbMoves; i++) {
            currNbBalls += this.machineState[this.currPosition][i];
            var rnd = parseInt(Math.random() * currNbBalls);
            for (var j = 0; j < this.nbMoves; j++) {
                for (var k = 0; k < this.machineState[this.currPosition][j]; k++) {
                    rnd--;
                    if (rnd < 0) {
                        this.gameMovesHistory[this.currPosition][id] = j + 1;
                        return j;
                    }
                }
            }
        }
        return -1;
    }

    expertMove(){
        for (var i = 0; i < this.nbMoves; i++) {
            if (this.currPosition - this.possibleMoves[i] >= 0 && this.winningMoves[this.currPosition - this.possibleMoves[i]] == 0) {
                return i;
            }
        }
        return hazardMove();
    }

    hazardMove(){
        move = parseInt(Math.random() * this.nbMoves);
        while (this.currPosition - this.possibleMoves[move] < 0) {
            move = parseInt(Math.random() * this.nbMoves);
        }
        return move;
    }

    reinforcement(hasWon, idMachine){
        for (var i = 1; i < this.nbBaskets; i++) {
            if (this.gameMovesHistory[i][idMachine] >= 0) {
                this.machineState[i][this.gameMovesHistory[i][idMachine]] += (hasWon) ? this.reward : this.penalty;
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
            if (sum == 0) {
                this.initBaskets(i);
            }
        }
    }

    playOneMove() {
        var move = 0;
        if (this.player == 0){ //machine's turn
            move = this.machineMove(0);
        } else { //opponent's turn
            switch (this.opponent){
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
    }

    playNonStop(){
        while (true) {
            this.playOneGame();
        }
    }
}