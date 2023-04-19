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
    //TODO : send the formValues to the server
    //TODO : the btn text & color has to change and become "pause" and "resume" depending on the state of the game
}

function updateTooltipValue(element) {
    $(element).attr('data-original-title', element.value).tooltip('show');
    $(element).siblings('span').text('\xa0' + element.value);
}