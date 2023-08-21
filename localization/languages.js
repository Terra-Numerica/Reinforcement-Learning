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
    "back": {
        fr: "Retour",
        en: "Back"
    },
    "welcome_msg": {
        fr: "Bienvenue sur le jeu Machine IA !",
        en: "Welcome to the AI Machine game!"
    },
    "welcome_desc": {
        fr: "Cette activité a pour but de vous faire découvrir l'apprentissage par renforcement à travers un jeu de Nim inspiré de Fort Boyard.",
        en: "The purpose of this activity is to introduce you to reinforcement learning through a Nim game inspired by Fort Boyard."
    },
    "HvM": {
        fr: "Humain contre machine",
        en: "Human versus machine"
    },
    "MvM": {
        fr: "Machine contre machine",
        en: "Machine versus machine"
    },
    "rules_game": {
        fr: "Règles du jeu de Nim de Fort Boyard",
        en: "Rules of the Fort Boyard Nim game"
    },
    "rein_learning": {
        fr: "L'apprentissage par renforcement",
        en: "Reinforcement learning"
    },
    "probabilities": {
        fr: "Le système de récompense",
        en: "The reward system"
    },
    "goal": { 
        fr:"L'objectif de l'IA",
        en: "The AI's goal"
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

    "rules_video" : {
        fr: "Exemple vidéo de <i>l'épreuve des Batônnets</i> de Fort Boyard",
        en: "Video example of <i>the Sticks test</i> of Fort Boyard"
    },
    "rules_gist": { 
        fr: "Dans Fort Boyard, 21 bâtonnets sont présentés à 2 joueurs. À tour de rôle, chacun devra retirer un, deux, ou trois bâtonnets à la fois. Le joueur se retrouvant avec le dernier bâtonnet perd la partie. Le but du jeu sera donc de trouver une stratégie pour s'assurer que son adversaire se retrouve avec un seul bâtonnet.",
        en: "In Fort Boyard, 21 sticks are presented to 2 players. In turn, each player will have to remove one, two, or three sticks at a time. The player who ends up with the last stick loses the game. The goal of the game will therefore be to find a strategy to ensure that your opponent ends up with only one stick."
    },
    "rules_custom": {
        fr: "Dans cette activité, vous verrez que les règles peuvent être plus flexibles. 😉",
        en: "In this activity, you will see that the rules can be more flexible. 😉"
    },
    "rules_illustr_title": {
        fr: "Illustrons le jeu",
        en: "Let's illustrate the game"
    },
    "rules_illust_statement": {
        fr: "Au début 5 allumettes sont disponibles. À chaque tour, chaque joueur peut retirer soit 1 soit 2 allumettes. Voici une partie en 5 étapes.",
        en: "At the beginning 5 matches are available. At each turn, each player can remove either 1 or 2 matches. Here is a game in 5 steps."
    },
    "rules_illustr_0": {
        fr: "Début du jeu : 5 allumettes disponibles.",
        en: "Start of the game: 5 matches available."
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
        fr: "<b>Le joueur 1 a gagné.</b>",
        en: "<b>Player 1 won.</b>"
    },

    /* REINFORCEMENT LEARNING PART */

    "rein_field": {
        fr: "Quel est le domaine concerné ?",
        en: "What is the field in question?"
    },
    "rein_field_gist": {
        fr: "Le domaine de l'Intelligence Artificielle (IA), plus précisément en apprentissage automatique qui consiste à donner à une machine la capacité d'apprendre à partir de données fournies.",
        en: "The field of Artificial Intelligence (AI), more precisely in machine learning which consists in giving a machine the ability to learn from provided data."
    },
    "rein_tools": {
        fr: "Avec quel outil ?",
        en: "With what tool?"
    },
    "rein_tools_gist": {
        fr: "Un agent autonome : c'est un programme qui accomplit des tâches à la manière d'un automate, donc qui agira en fonction de ce que lui a demandé son auteur sans que ce dernier agisse durant l'opération.",
        en: "An autonomous agent: it is a program that performs tasks in the manner of an automaton, therefore it will act according to what its author has asked of it without the latter acting during the operation."
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
        fr: "Pour représenter le nombre d'allumettes retirées on utilise des balles de différentes couleurs : <ul class='m-auto' style='width: fit-content;'> <li>jaune pour 1 allumette retirée</li> <li>rouge pour 2 allumettes retirées</li> </ul> Au début il y a 2 balles jaunes et 2 balles rouges. <br>La probabilité de retirer une balle jaune est la même que la probabilité de retirer une balle rouge.",
        en: "To represent the number of matches removed we use balls of different colors: <ul class='m-auto' style='width: fit-content;'> <li>yellow for 1 match removed</li> <li>red for 2 matches removed</li> </ul> At the beginning there are 2 yellow balls and 2 red balls. <br>The probability of removing a yellow ball is the same as the probability of removing a red ball."
    },
    "probs_win": {
        fr: "Si l'IA a gagné la partie, elle ajoutera 3 balles de la couleur correspondante à chaque coup qu'elle aura effectué. <br>Ici l'IA a retiré 2 allumettes ce qui correspond à une balle rouge. <br>Comme c'est une action qui lui a permis de gagner, 3 balles rouges vont être ajoutées à chaque casier correspondant. <br>La probabilité de retirer deux alumettes en un coup augmente.",
        en: "If the AI has won the game, it will add 3 balls of the corresponding color for each move it has made. <br>Here the AI removed 2 matches which corresponds to a red ball. <br>As this is an action that allowed it to win, 3 red balls will be added to each corresponding basket. <br>The probability of removing two matches in one move increases."
    },
    "probs_lost": {
        fr: "Si l'IA a perdu la partie, elle retirera 1 balle de la couleur correspondante à chaque coup qu'elle aura effectué. <br>Ici l'IA a retiré 2 allumettes ce qui correspond à une balle rouge. <br>Comme c'est une action qui lui a fait perdre, 1 balle rouge va être retirée à chaque casier correspondant. <br>La probabilité de retirer deux alumettes en un coup diminue.",
        en: "If the AI has lost the game, it will remove 1 ball of the corresponding color for each move it has made. <br>Here the AI removed 2 matches which corresponds to a red ball. <br>Since this is an action that made it lose, 1 red ball will be removed from each corresponding basket. <br>The probability of removing two matches in one move decreases."
    },

    /* GOAL PART */

    "goal_premise": {
        fr: "Principe du fonctionnement de l'apprentissage par renforcement dans un jeu de Nim",
        en: "The operation principle of reinforcement learning in a Nim game"
    },
    "goal_gist": {
        fr: "Mon but : maximiser ma récompense au cours des parties.<br>Quelle est ma récompense ? Obtenir un grand nombre de balles.<br>Comment obtenir ma récompense ? En gagnant face à mon adversaire le plus possible.",
        en: "My goal: to maximize my reward over the games.<br>What is my reward? Get a lot of balls.<br>How to get my reward? By winning against my opponent as much as possible."
    },
    "goal_about_matches": {
        fr: "Chaque allumette est représentée par un casier. Pour représenter le nombre d'allumettes retirées on utilise des balles de différentes couleurs :<ul><li style='width: fit-content;'>jaune pour 1 allumette retirée.</li><li style='width: fit-content;'>rouge pour 2 allumettes retirées.</li></ul>",
        en: "Each match is represented by a drawer. To represent the number of matches removed we use balls of different colors: <ul> <li style='width: fit-content;'>yellow for 1 match removed.</li> <li style='width: fit-content;'>red for 2 matches removed.</li> </ul>"
    },
    "goal_desc": {
        fr: "Il y a au début le même nombre de balles de couleur jaune que de couleur rouge. Pour chaque nombre d'allumettes restantes au cours des parties, la probabilité de retirer une balle jaune ou une balle rouge (donc de retirer une ou deux allumettes) varie avec le temps.",
        en: "At the beginning there is the same number of yellow balls as red balls. For each number of matches remaining during the games, the probability of removing a yellow ball or a red ball (so removing one or two matches) varies over time."
    },
    "goal_concl": {
        fr: "Au fil du temps les actions ayant permis la victoire étant bien plus présentes, statistiquement j'aurai plus de chances de gagner !",
        en: "Over time the actions that allowed the victory being much more present, statistically I will have more chances to win!"
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
        fr: "Il ne reste plus aucun coup possible à l'IA par faute de balles disponibles.<br>Réinitialisation forcée du jeu.",
        en: "There is no more possible move for the AI due to lack of available balls.<br>Forced game reset." 
    },
    "interacting_end_won": {
        fr: "L'IA a gagné !<br>L'IA va recevoir une récompense : pour chacun des coups qu'elle a fait, elle récupère trois balles de la couleur correspondant au nombre d'allumettes enlevées.",
        en: "The AI has won!<br>The AI will receive a reward: for each move it has made, it gets three balls of the color corresponding to the number of matches removed."
    },
    "interacting_end_lost": {
        fr: "L'IA a perdu !<br>L'IA va recevoir une punition : pour chacun des coups qu'elle a fait, elle doit enlever une balle de la couleur correspondant au nombre d'allumettes enlevées.",
        en: "The AI has lost!<br>The AI will receive a punishment: for each move it has made, it must remove a ball of the color corresponding to the number of matches removed."
    },
    "interacting_basket_state": {
        fr: "Le contenu du casier : <br><br>les balles jaunes - les balles rouges",
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

    "param_desc_title": {
        fr: "Des casiers et des balles",
        en: "Baskets and balls"
    },
    "param_desc_1": {
        fr: "Pour illustrer l'apprentissage de l'IA, nous utiliserons des casiers et des balles. Le but sera de montrer quel sera le coup privilégié par l'IA au bout d'un grand nombre de parties lorsqu'il ne reste qu'un certain nombre d'allumettes.",
        en: "To illustrate the AI's learning, we will use baskets and balls. The goal will be to show what will be the AI's preferred move after a large number of games when there are only a certain number of matches left."
    },
    "param_desc_2": {
        fr: "Cette simulation permet de modifier les règles de base du jeu de Nim de Fort Boyard et de manipuler l'apprentissage de l'IA en jouant avec plusieurs paramètres.",
        en: "This simulation allows you to modify the basic rules of the Fort Boyard Nim game and to manipulate the AI's learning by playing with several parameters."
    },
    "param_desc_elements": {
        fr: "L'élément",
        en: "The element"
    },
    "param_desc_3": {
        fr: "Explication",
        en: "Explanation"
    },
    "param_desc_4": {
        fr: "Représentation d'un casier. Un casier correspond au nombre d'allumettes restantes. Il y a autant de casiers que d'allumettes en début de jeu.",
        en: "Representation of a basket. A basket corresponds to the number of matches remaining. There are as many baskets as matches at the beginning of the game."
    },
    "param_desc_5": {
        fr: "Représentation d'un ensemble de balles. Le nombre de balles par couleur est choisi par l'utilisateur via les paramètres, et les couleurs permettent de différencier les coups possibles. Toutefois, dans un casier ne seront pas représentées les couleurs qui permettraient de retirer plus d'allumettes qu'il n'en reste. Par exemple, il n'y aura pas de boules rouges (retrait de 2 allumettes) dans la casier 1.",
        en: "Representation of a set of balls. The number of balls per color is chosen by the user via the parameters, and the colors make it possible to differentiate the possible moves. However, in a basket will not be represented the colors that would allow to remove more matches than there are left. For example, there will be no red balls (removal of 2 matches) in basket 1."
    },
    "param_desc_6": {
        fr: "Numéro de casier. Il correspond au nombre d'allumettes restantes.",
        en: "Basket number. It corresponds to the number of matches remaining."
    },
    "param_desc_7": {
        fr: "Compteurs de balles par couleur. Ils correspondent au nombre de balles par couleur présentes par casier. A noter que, par exemple, le casier n°1 n'a qu'un seul compteur de balles car il n'y a qu'un coup possible lorsqu'il ne reste qu'une allumette.",
        en: "Ball counters by color. They correspond to the number of balls by color present by basket. Note that, for example, basket n°1 has only one ball counter because there is only one possible move when there is only one match left."
    },
    "param_moves_title" : {
        fr: "Paramétrer le jeu de Nim",
        en: "Set up the Nim game"
    },
    "param_moves": {
        fr: "Vous pouvez choisir les coups autorisés ainsi que le nombre d'allumettes à souhait. <br>L'ordre d'attribution des couleurs des balles est le suivant : jaune, rouge, bleu, vert, violet. <br>",
        en: "You can choose the allowed moves as well as the number of matches you want. <br>The order of assignment of the colors of the balls is as follows: yellow, red, blue, green, purple. <br>"
    },
    "param_opponents_title": {
        fr: "Adversaire possible",
        en: "Possible opponent"
    },
    "param_opponents": {
        fr: "Trois niveaux de difficulté possibles :<br>- Aléatoire : aucune stratégie de la part de l'adversaire, des choix purement hasardeux.<br>- Machine : une autre IA apprenant le même algorithme d'apprentissage par renforcement.<br>- Expert : adversaire possédant une stratégie mise en place afin de rendre plus difficile les victoires pour l'IA.",
        en: "Three possible difficulty levels: <br>- Random: no strategy on the part of the opponent, purely random choices. <br>- Machine: another AI learning the same reinforcement learning algorithm. <br>- Expert: opponent with a strategy in place to make it more difficult for the AI to win."
    },
    "param_learning_title": {
        fr: "Apprentissage",
        en: "Learning"
    },
    "param_learning": {
        fr: "Ici vous aurez la possibilité de paramétrer l'apprentissage de l'IA en choisissant la récompense et la pénalité qu'elle recevra à chaque partie. <br>Décider du nombre de balles par couleur au début de la simulation permettra aussi de maîtriser sa vitesse d'apprentissage.",
        en: "Here you will have the possibility to set the AI's learning by choosing the reward and the penalty it will receive for each game. <br>Deciding on the number of balls per color at the beginning of the simulation will also allow you to control its learning speed."
    },
    "param_speed_title": {
        fr: "Vitesse d'affichage",
        en: "Display speed"
    },
    "param_speed": {
        fr: "Il vous est proposé de choisir la vitesse d'actualisation de l'affichage de la simulation. <br>Vous pouvez choisir entre 3 cadences : <br> - Un coup : l'affichage est actualisé à chaque coup joué par l'IA ou l'adversaire. <br> - Une partie : l'affichage est actualisé après une partie jouée. <br> - Non stop : l'affichage est actualisé à chaque partie jouée, sans pause.",
        en: "You are offered to choose the speed of updating the display of the simulation. <br>You can choose between 3 speeds: <br> - One move: the display is updated with every move played by the AI or the opponent. <br> - One game: the display is updated after one game played. <br> - Non stop: the display is updated after each game played, without pause."
    },
    "param_rules_bending_title": {
        fr: "Règles flexibles",
        en: "Flexible rules"
    },
    "param_rules_bending": {
        fr: "Vous pouvez choisir de modifier les règles du jeu de Nim de Fort Boyard pour générer des situations plus complexes.",
        en: "You can choose to modify the rules of the Fort Boyard Nim game to generate more complex situations."
    },
    "param_RL_spec_title": {
        fr: "Spécificité de l'apprentissage par renforcement",
        en: "Specificitie of reinforcement learning"
    },
    "param_RL_spec": {
        fr: "Ce paramètre vous permet de choisir si l'IA doit apprendre des coups de son adversaire. Par exemple, si l'IA a gagné la partie, elle considèrera les coups de son adversaire comme des coups perdants et les ajoutera à son apprentissage.",
        en: "This parameter allows you to choose if the AI should learn from its opponent's moves. For example, if the AI has won the game, it will consider its opponent's moves as losing moves and add them to its learning."
    },

    /* ADAPTATION PART */

    "adaptation_game_status": {
        fr: "Statut de la simulation",
        en: "Simulation status"
    },
    "adaptation_vizualisation": {
        fr: "Visualisation de la machine",
        en: "Visualization of the machine"
    },
    "adaptation_speed_interval" : {
        fr: "Vitesse d'exécution",
        en: "Execution speed"
    },
    "adaptation_score": {
        fr: "Score",
        en: "Score"
    },
    "adaptation_victories": {
        fr: "Victoires :",
        en: "Victories:"
    },
    "adaptation_defeats": {
        fr: "Défaites :",
        en: "Defeats:"
    },
    "adaptation_counter_games": {
        fr: "Nombre de parties :",
        en: "Number of games:"
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
        fr: "Cadence :",
        en: "Cadence:"
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
    "adaptation_if_winner_starts": {
        fr: "Est-ce que le gagnant de la partie précédente commence ?",
        en: "Does the winner of the previous game start?"
    },
    "adaptation_yes": {
        fr: "Oui",
        en: "Yes"
    },
    "adaptation_no": {
        fr: "Non",
        en: "No"
    },
    "adaptation_train_losses_too": {
        fr: "Est-ce que l'IA doit apprendre des coups de son adversaire ?",
        en: "Should the AI learn from its opponent's moves?"
    },
    "adaptation_winning_condition": {
        fr: "Est-ce que le joueur qui retire la dernière allumette gagne la partie ?",
        en: "Does the player who removes the last match win the game?"
    },
    "adaptation_new_game": {
        fr: 'Nouvelle partie &#43;',
        en: 'New game &#43;'
    },
    "adaptation_continue": {
        fr: 'Continuer &#9193;',
        en: 'Continue &#9193;'
    },
    "adaptation_pause": {
        fr: 'Pause &#9208;',
        en: 'Pause &#9208;'
    },
    "adaptation_status_game_number": {
        fr: "Partie n°",
        en: "Game n°"
    },
    "adaptation_status_player": {
        fr: "Le joueur",
        en: "The player"
    },
    "adaptation_status_player_0": {
        fr: '"machine"',
        en: '"machine"'
    },
    "adaptation_status_player_1": {
        fr: '"adversaire"',
        en: '"opponent"'
    },
    "adaptation_status_retrieved": {
        fr: "a retiré",
        en: "retrieved"
    },
    "adaptation_status_matches": {
        fr: "allumette(s) quand il restait",
        en: "match(es) when there were"
    },
    "adaptation_status_matches_left": {
        fr: "allumette(s) restante(s)",
        en: "match(es) left"
    },
    "adaptation_status_game_over": {
        fr: "Partie finie : le joueur",
        en: "Game over: player"
    },
    "adaptation_status_won": {
        fr: "a gagné",
        en: "won"
    },
    "adaptation_too_many_games": {
        fr: "Mise en pause automatique de la simulation",
        en: "Automatic pause of the simulation"
    },
}