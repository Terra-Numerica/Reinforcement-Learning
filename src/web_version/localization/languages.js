let texts = {
    /* GENERAL PART */

    "page_title":{
        fr: "Apprentissage par renforcement",
        en: "Reinforcement learning"
    },
    "lang_switch": {
        fr: "English",
        en: "Français"
    },
    "nim_game": {
        fr: "Jeu de Nim",
        en: "Nim game"
    },
    "rules_game": {
        fr: "Règles appliquées du jeu de Nim",
        en: "Rules applied to the game of Nim"
    },
    "rein_learning": {
        fr: "C'est quoi un apprentissage par renforcement ?",
        en: "What is reinforcement learning?"
    },
    "probabilities": {
        fr: "Les probabilités",
        en: "Probabilities"
    },
    "goal": { 
        fr:"Le but de l'IA",
        en:"The goal of the AI"
    },
    "interacting": {
        fr: "Mode interactif",
        en: "Interactive mode"
    },
    "param_tuto": {
        fr: "Description des paramètres de la simulation",
        en: "Description of the simulation parameters"
    },
    "adaptation": {
        fr: "Adaptation de l'IA",
        en: "AI adaptation"
    },

    /* RULES PART */

    "rules_gist": { 
        fr:"Au début, un certain nombre d'allumettes, noté n, est disponible. Les joueurs retirent tour à tour des allumettes. Le nombre d'allumettes qu'un joueur peut retirer à la fois doit être compris entre 1 et la valeur maximale d fixée pour le jeu en cours où d est inférieur à n. Le gagnant est le joueur ayant retiré la dernière allumette.",
        en:"At the beginning, a certain number of matches, noted n, is available. The players take turns removing matches. The number of matches a player can remove at a time must be between 1 and the maximum value d set for the current game where d is less than n. The winner is the player who removed the last match."
    },
    "rules_illustr_title": {
        fr: "Illustrons le jeu",
        en: "Let's illustrate the game"
    },
    "rules_illust_statement": {
        fr: "Au début 5 allumettes sont disponibles. A chaque tour, chaque joueur peut retirer soit 1 soit 2 allumettes.",
        en: "At the beginning 5 matches are available. At each turn, each player can remove either 1 or 2 matches."
    },
    "rules_illustr_0": {
        fr: "5 allumettes disponibles.<br>n = 5",
        en: "5 matches available.<br>n = 5"
    },
    "rules_illustr_1": {
        fr: "Le joueur 1 retire 1 allumette.<br>Il reste 4 allumettes.",
        en: "Player 1 removes 1 match.<br>There are 4 matches left."
    },
    "rules_illustr_2": {
        fr: "Le joueur 2 retire 2 allumettes.<br>Il reste 2 allumettes.",
        en: "Player 2 removes 2 matches.<br>There are 2 matches left."
    },
    "rules_illustr_3": {
        fr: "Le joueur 1 retire 1 allumette.<br>Il reste 1 allumette.",
        en: "Player 1 removes 1 match.<br>There is 1 match left."
    },
    "rules_illustr_4": { 
        fr: "Le joueur 2 retire 1 allumette.<br>Il reste 0 allumette.",
        en: "Player 2 removes 1 match.<br>There is 0 match left."
    },
    "rules_illust_over": {
        fr: "<b>Le joueur 2 a gagné.</b>",
        en: "<b>Player 2 won.</b>"
    },

    /* REINFORCEMENT LEARNING PART */

    "rein_field": {
        fr: "Quel est le domaine concerné ?",
        en: "What is the field in question?"
    },
    "rein_field_gist": {
        fr: "En Intelligence Artificielle (IA), plus précisément en apprentissage automatique.",
        en: "In Artificial Intelligence (AI), more precisely in machine learning."
    },
    "rein_tools": {
        fr: "Pour quel outil ?",
        en: "For which tool?"
    },
    "rein_tools_gist": {
        fr: "Un agent autonome : c'est un programme qui accomplit des tâches à la manière d'un automate et en fonction de ce que lui a demandé son auteur.",
        en: "An autonomous agent: it is a program that performs tasks in the manner of an automaton and depending on what its author has asked it."
    },
    "rein_examples": {
        fr: "Quelques exemples d'agents autonomes :",
        en: "Some examples of autonomous agents:"
    },
    "rein_examples_gist": {
        fr: "<li class='list-group-item'>Agent robot : un agent logiciel intelligent qui est mobile dans le monde réel.</li> <li class='list-group-item'>Agent utilisateur : l'interface utilisateur pour une application réseau sophistiquée. Par exemple, le navigateur web.</li> <li class='list-group-item'>Agent système : il fonctionne de façon continue en tâche de fond sur le bureau.</li>",
        en: "<li class='list-group-item'>Robot agent: a smart software agent that is mobile in the real world.</li> <li class='list-group-item'>User agent: the user interface for a sophisticated network application. For example, the web browser.</li> <li class='list-group-item'>System agent: it works continuously in the background on the desktop.</li>"
    },
    "rein_agent": {
        fr: "Quel est le but de l'agent autonome ?",
        en: "What is the goal of the autonomous agent?"
    },
    "rein_agent_gist": {
        fr: "Apprendre les actions à prendre, à partir d'expériences, de façon à optimiser une récompense quantitative au cours du temps.",
        en: "Learn the actions to take, through experiences, in order to optimize a quantitative reward over time."
    },
    "rein_opti": {
        fr: "Comment cette optimisation est-elle faite ?",
        en: "How is this optimization done?"
    },
    "rein_opti_gist": {
        fr: "L'agent est plongé au sein d'un environnement et prend ses décisions en fonction de son état courant. En retour, l'environnement procure à l'agent une récompense, qui peut être positive ou négative.",
        en: "The agent is immersed in an environment and makes its decisions based on its current state. In return, the environment provides the agent with a reward, which can be positive or negative."
    },

    /* PROBABILITIES PART */

    "probs_initial": {
        fr: "Pour représenter le nombre d'allumettes retirées on utilise des boules de différentes couleurs : <ul class='m-auto' style='width: fit-content;'> <li>jaune pour 1 allumette retirée</li> <li>rouge pour 2 allumettes retirées</li> </ul> Au début il y a 2 boules jaunes et 2 boules rouges. <br>La probabilité de retirer une boule jaune est la même que la probabilité de retirer une boule rouge.",
        en: "To represent the number of matches removed we use balls of different colors: <ul class='m-auto' style='width: fit-content;'> <li>yellow for 1 match removed</li> <li>red for 2 matches removed</li> </ul> At the beginning there are 2 yellow balls and 2 red balls. <br>The probability of removing a yellow ball is the same as the probability of removing a red ball."
    },
    "probs_win": {
        fr: "Si l'IA a gagné la partie, elle ajoutera 3 boules de la couleur correspondante à chaque coup qu'elle aura effectué. <br>Ici l'IA a retiré 2 allumettes ce qui correspond à une boule rouge. <br>Comme c'est une action qui lui a permis de gagner, 3 boules rouges vont être ajoutés. <br>La probabilité de retirer une boule rouge augmente.",
        en: "If the AI has won the game, it will add 3 balls of the corresponding color for each move it has made. <br>Here the AI removed 2 matches which corresponds to a red ball. <br>As this is an action that allowed it to win, 3 red balls will be added. <br>The probability of removing a red ball increases."
    },
    "probs_lost": {
        fr: "Si l'IA a perdu la partie, elle retirera 1 boule de la couleur correspondante à chaque coup qu'elle aura effectué. <br>Ici l'IA a retiré 2 allumettes ce qui correspond à une boule rouge. <br>Comme c'est une action qui lui a fait perdre, 1 boule rouge va lui être retirée. <br>La probabilité de retirer une boule rouge diminue.",
        en: "If the AI has lost the game, it will remove 1 ball of the corresponding color for each move it has made. <br>Here the AI removed 2 matches which corresponds to a red ball. <br>Since this is an action that made it lose, 1 red ball will be removed from it. <br>The probability of removing a red ball decreases."
    },

    /* GOAL PART */

    "goal_premise": {
        fr: "Principe du fonctionnement de l'apprentissage par renforcement dans un jeu de Nim",
        en: "The operation principle of reinforcement learning in a Nim game"
    },
    "goal_gist": {
        fr: "Son but : maximiser sa récompense au cours des parties.<br>Quelle est sa récompense ? Obtenir le plus grand nombre de boules.<br>Comment obtenir sa récompense ? En gagnant face à son adversaire.",
        en: "Its goal: to maximize its reward over the games.<br>What is its reward? To get the most balls.<br>How to get its reward? By winning against its opponent."
    },
    "goal_about_matches": {
        fr: "Chaque allumette est représentée par un casier. Pour représenter le nombre d'allumettes retirées on utilise des boules de différentes couleurs :<ul><li style='width: fit-content;'>jaune pour 1 allumette retirée.</li><li style='width: fit-content;'>rouge pour 2 allumettes retirées.</li></ul>",
        en: "Each match is represented by a drawer. To represent the number of matches removed we use balls of different colors: <ul> <li style='width: fit-content;'>yellow for 1 match removed.</li> <li style='width: fit-content;'>red for 2 matches removed.</li> </ul>"
    },
    "goal_desc": {
        fr: "Il y a au début le même nombre de boules de couleur jaune que de couleur rouge. Pour chaque nombre d'allumettes restantes au cours des parties, la probabilité de retirer une boule jaune ou une boule rouge (donc de retirer une ou deux allumettes) varie avec le temps.",
        en: "At the beginning there is the same number of yellow balls as red balls. For each number of matches remaining during the games, the probability of removing a yellow ball or a red ball (so removing one or two matches) varies over time."
    },
    "goal_concl": {
        fr: "Au fil du temps les actions ayant permis la victoire étant bien plus présentes, statistiquement l'IA aura plus de chances de gagner.",
        en: "Over time, the actions that allowed victory being much more recurring, statistically the AI will have more chances to win."
    },

    /* INTERACTING PART */

    "interacting_gist": {
        fr: "On vous propose ici de jouer face à une IA ayant appris à jouer à un jeu de Nim grâce à un algorithme d'apprentissage par renforcement. Il y a <b>8 allumettes</b> au début. Les coups possibles sont de retirer <span style='color:#ffc107;'>1</span> ou <span style='color:red;'>2</span> allumettes.",
        en: "Here we offer you to play against an AI that has learned to play a Nim game thanks to a reinforcement learning algorithm. There are <b>8 matches</b> at the beginning. The possible moves are to remove <span style='color:#ffc107;'>1</span> or <span style='color:red;'>2</span> matches."
    },
    "interacting_start": {
        fr: "Vous commencez :",
        en: "You start:"
    },
    "interacting_matches_left": {
        fr: "Nombre d'allumette(s) restante(s) :",
        en: "Number of match(es) left:"
    },
    "interacting_last_move": {
        fr: "L'IA a également joué, nombre d'allumettes retirées :",
        en: "The AI also played, number of matches removed:"
    },
    "interacting_error": {
        fr: "On remet 8 allumettes",
        en: "We put back 8 matches"
    },
    "interacting_end_error": {
        fr: "Il ne reste plus aucun coup possible à l'IA par faute de boules disponibles.<br>Réinitialisation forcée du jeu.",
        en: "There is no more possible move for the AI due to lack of available balls.<br>Forced game reset." 
    },
    "interacting_end_won": {
        fr: "L'IA a gagné !<br>L'IA va recevoir une récompense : pour chacun des coups qu'elle a fait, elle récupère trois boules de la couleur correspondant au nombre d'allumettes enlevées.",
        en: "The AI has won!<br>The AI will receive a reward: for each move it has made, it gets three balls of the color corresponding to the number of matches removed."
    },
    "interacting_end_lost": {
        fr: "L'IA a perdu !<br>L'IA va recevoir une punition : pour chacun des coups qu'elle a fait, elle doit enlever une boule de la couleur correspondant au nombre d'allumettes enlevées.",
        en: "The AI has lost!<br>The AI will receive a punishment: for each move it has made, it must remove a ball of the color corresponding to the number of matches removed."
    },
    "interacting_basket_state": {
        fr: "Le contenu du casier : <br><br>les boules jaunes - les boules rouges",
        en: "The basket content: <br><br>the yellow balls - the red balls"
    },
    "interacting_take_1": {
        fr: "Retirer 1 allumette",
        en: "Take 1 match"
    },
    "interacting_take_2": {
        fr: "Retirer 2 allumettes",
        en: "Take 2 matches"
    },
    "interacting_restart": {
        fr: "Recommencer",
        en: "Restart"
    },
    "interacting_reinitialize": {
        fr: "Réinitialiser l'IA",
        en: "Reinitialize the AI"
    },

    /* PARAMETERS PART */

    "param_desc_1": {
        fr: "Chaque allumette est représentée par un casier. Le casier et son contenu servent à modéliser ce qui se passe lors de l'application de l'algorithme. Schéma de la représentation des actions possibles par l'IA pour une allumette :",
        en: "Each match is represented by a basket. The basket and its content are used to model what happens when the algorithm is applied. Representation scheme of the possible actions by the AI for a match:."
    },
    "param_desc_2": {
        fr: "Il y a autant de casiers que d'allumettes. Le contenu de chaque casier est indépendant du contenu des autres casiers. Dans un casier, il ne peut pas y avoir un nombre de boules qui permettrait de retirer plus d'allumettes qu'il n'y a d'allumettes dans le casier. Par exemple, dans le dernier casier, il ne peut y avoir que des boules jaunes.",
        en: "There are as many baskets as matches. The content of each basket is independent of the content of the other baskets. In a basket, there cannot be a number of balls that would allow to remove more matches than there are in the basket. For example, in the last basket, there can only be yellow balls."
    },
    "param_moves_title" : {
        fr: "Coups possibles",
        en: "Possible moves"
    },
    "param_moves": {
        fr: "La couleur des boules est attribuée dans l'ordre croissant des coups cochés. <br>L'ordre d'attribution des couleurs est le suivant : jaune, rouge, bleu, vert, violet. <br>",
        en: "The color of the balls is assigned in ascending order of the checked moves. <br>The order of assignment of the colors is as follows: yellow, red, blue, green, purple. <br>"
    },
    "param_opponents_title": {
        fr: "Adversaires possibles",
        en: "Possible opponents"
    },
    "param_opponents": {
        fr: "Trois adversaires possibles : <ul><li>Aléatoire : aucune stratégie de la part de l'adversaire.</li> <li>Machine : une autre IA ayant appris avec le même algorithme d'apprentissage par renforcement.</li> <li>Expert : une stratégie mise en place afin de rendre plus difficile les victoires pour l'IA.</li> </ul>",
        en: "Three possible opponents: <ul><li>Random: no strategy on the opponent's part.</li> <li>Machine: another AI that has learned with the same reinforcement learning algorithm.</li> <li>Expert: a strategy put in place to make it more difficult for the AI to win.</li> </ul>"
    },
    "param_learning_title": {
        fr: "Apprentissage",
        en: "Learning"
    },
    "param_learning": {
        fr: "Au départ, on attribue des valeurs par défaut pour la récompense/punition en cas de victoire/défaite de l'IA.",
        en: "Initially, we assign default values for the reward/punishment in case of AI victory/defeat."
    },
    "param_speed_title": {
        fr: "Vitesse d'affichage",
        en: "Display speed"
    },
    "param_speed": {
        fr: "Trois vitesses d'exécution de l'algorithme : <ul><li>Un coup : un choix est fait soit par l'IA soit par l'autre joueur.</li><li>Une partie : les allumettes sont tirées jusqu'à obtenir un vainqueur. Le nombre de boules est actualisé selon le résultat.</li><li>Non stop : les parties s'enchainent sans pause les unes après les autres.</li></ul>",
        en: "Three execution's speeds of the algorithm: <ul><li>One move: a choice is made either by the AI or by the other player.</li><li>One game: the matches are drawn until a winner is obtained. The number of balls is updated according to the result.</li><li>Non stop: the games follow one after the other without pause.</li></ul>"
    },

    /* ADAPTATION PART */

    "adaptation_vizualisation": {
        fr: "Visualisation de la machine",
        en: "Visualization of the machine"
    },
    "adaptation_score": {
        fr: "Score",
        en: "Score"
    },
    "adaptation_victories": {
        fr: "Victoires",
        en: "Victories"
    },
    "adaptation_defeats": {
        fr: "Défaites",
        en: "Defeats"
    },
    "adaptation_parameters": {
        fr: "Choix de paramètres",
        en: "Choice of parameters"
    },
    "adaptation_possible_moves": {
        fr: "Coups possibles :",
        en: "Possible moves:"
    },
    "adaptation_select_opp": {
        fr: "Adversaire :",
        en: "Opponent:"
    },
    "adaptation_random": {
        fr: "Aléatoire",
        en: "Random"
    },
    "adaptation_machine": {
        fr: "Machine",
        en: "Machine"
    },
    "adaptation_expert": {
        fr: "Expert",
        en: "Expert"
    },
    "adaptation_nb_baskets": {
        fr: "Nombre de casiers :",
        en: "Number of baskets:"
    },
    "adaptation_balls_color" : {
        fr: "Billes par couleur :",
        en: "Balls per color:"
    },
    "adaptation_reward": {
        fr: "Récompense :",
        en: "Reward:"
    },
    "adaptation_penalty" : {
        fr: "Pénalité :",
        en: "Penalty:"
    },
    "adaptation_speed": {
        fr: "Vitesse :",
        en: "Speed:"
    },
    "adaptation_one_move": {
        fr: "Un coup",
        en: "One move"
    },
    "adaptation_one_game": {
        fr: "Une partie",
        en: "One game"
    },
    "adaptation_non_stop": {
        fr: "Non stop",
        en: "Non stop"
    },
    "adaptation_who_starts": {
        fr: "Qui commence ?",
        en: "Who starts ?"
    },
    "adaptation_machine_starts": {
        fr: "La machine",
        en: "The machine"
    },
    "adaptation_opponent_starts": {
        fr: "L'adversaire",
        en: "The opponent"
    },
    "adaptation_new_game": {
        fr: '<span class="glyphicon glyphicon-plus"></span> Nouvelle partie',
        en: '<span class="glyphicon glyphicon-plus"></span> New game'        
    },
    "adaptation_continue": {
        fr: '<span class="glyphicon glyphicon-play-circle"></span> Continuer',
        en: '<span class="glyphicon glyphicon-play-circle"></span> Continue'
    },
    "adaptation_pause": {
        fr: '<span class="glyphicon glyphicon-pause"></span> Pause',
        en: '<span class="glyphicon glyphicon-pause"></span> Pause'
    },
}