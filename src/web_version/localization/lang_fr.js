let fr = {
    /* GENERAL PART */
    
    "page_title": "Apprentissage par renforcement",
    "rules_game": "Règles appliquées du jeu de Nim",
    "rein_learning": "C'est quoi un apprentissage par renforcement ?",
    "probabilities": "Les probabilités",
    "goal": "Le but de l'IA",
    "interacting": "Mode interactif",
    "param_tuto": "Description des paramètres de la simulation",
    "adaptation": "Adaptation de l'IA",

    /* RULES PART */

    "rules_gist": "Au début, un certain nombre d'allumettes, noté n, est disponible. Les joueurs retirent tour à tour des allumettes. Le nombre d'allumettes qu'un joueur peut retirer à la fois doit être compris entre 1 et la valeur maximale d fixée pour le jeu en cours où d est inférieur à n. Le gagnant est le joueur ayant retiré la dernière allumette.",
    "rules_illustr_title": "Illustrons le jeu",
    "rules_illust_statement": "Au début 5 allumettes sont disponibles. A chaque tour, chaque joueur peut retirer soit 1 soit 2 allumettes.",
    "rules_illustr_0": "5 allumettes disponibles.<br>n = 5",
    "rules_illustr_1": "Le joueur 1 retire 1 allumette.<br>Il reste 4 allumettes.",
    "rules_illustr_2": "Le joueur 2 retire 2 allumettes.<br>Il reste 2 allumettes.",
    "rules_illustr_3": "Le joueur 1 retire 1 allumette.<br>Il reste 1 allumette.",
    "rules_illustr_4": "Le joueur 2 retire 1 allumette.<br>Il reste 0 allumette.",
    "rules_illust_over": "Le joueur 2 a gagné.",

    /* REINFORCEMENT LEARNING PART */

    "rein_field": "Quel est le domaine concerné ?",
    "rein_field_gist": "En Intelligence Artificielle (IA), plus précisément en apprentissage automatique.",
    "rein_tools": "Pour quel outil ?",
    "rein_tools_gist": "Un agent autonome : c'est un programme qui accomplit des tâches à la manière d'un automate et en fonction de ce que lui a demandé son auteur.",
    "rein_examples": "Quelques exemples d'agents autonomes :",
    "rein_examples_gist": "<li>Agent robot : un agent logiciel intelligent qui est mobile dans le monde réel.</li> <li>Agent utilisateur : l'interface utilisateur pour une application réseau sophistiquée. Par exemple, le navigateur web.</li> <li>Agent système : il fonctionne de façon continue en tâche de fond sur le bureau.</li>",
    "rein_agent": "Quel est le but de l'agent autonome ?",
    "rein_agent_gist": "Apprendre les actions à prendre, à partir d'expériences, de façon à optimiser une récompense quantitative au cours du temps.",
    "rein_opti": "Comment cette optimisation est-elle faite ?",
    "rein_opti_gist": "L'agent est plongé au sein d'un environnement et prend ses décisions en fonction de son état courant. En retour, l'environnement procure à l'agent une récompense, qui peut être positive ou négative.",

    /* PROBABILITIES PART */

    "probs_initial": "Pour représenter le nombre d'allumettes retirées on utilise des boules de différentes couleurs : <ul> <li>jaune pour 1 allumette retirée</li> <li>rouge pour 2 allumettes retirées</li> </ul> Au début il y a 2 boules jaunes et 2 boules rouges. <br>La probabilité de retirer une boule jaune est la même que la probabilité de retirer une boule rouge.",
    "probs_win": "Si l'IA a gagné la partie, elle ajoutera 3 boules de la couleur correspondante à chaque coup qu'elle aura effectué. <br>Ici l'IA a retiré 2 allumettes ce qui correspond à une boule rouge. <br>Comme c'est une action qui lui a permis de gagner, 3 boules rouges vont être ajoutés. <br>La probabilité de retirer une boule rouge augmente.",
    "probs_lost": "Si l'IA a perdu la partie, elle retirera 1 boule de la couleur correspondante à chaque coup qu'elle aura effectué. <br>Ici l'IA a retiré 2 allumettes ce qui correspond à une boule rouge. <br>Comme c'est une action qui lui a fait perdre, 1 boule rouge va lui être retirée. <br>La probabilité de retirer une boule rouge diminue.",
    
    /* GOAL PART */

    "goal_premise": "Principe du fonctionnement de l'apprentissage par renforcement dans un jeu de Nim",
    "goal_gist": "<li>Son but : maximiser sa récompense au cours des parties.</li><li>C'est quoi sa récompense ? Obtenir le plus grand nombre de boules.</li><li>Comment obtenir sa récompense ? En gagnant face à son adversaire.</li><li>Chaque allumette est représentée par un casier.</li><li>Pour représenter le nombre d'allumettes retirées on utilise des boules de différentes couleurs :</li><ul><li>jaune pour 1 allumette retirée.</li><li>rouge pour 2 allumettes retirées.</li></ul>",
    "goal_desc": "Il y a au début le même nombre de boules de couleur jaune que de couleur rouge. Pour chaque nombre d'allumettes restantes au cours des parties, la probabilité de retirer une boule jaune ou une boule rouge (donc de retirer une ou deux allumettes) varie avec le temps.",
    "goal_concl": "Au fil du temps les actions ayant permis la victoire étant bien plus présentes, statistiquement l'IA aura plus de chances de gagner.",

    /* INTERACTING PART */

    "interacting_gist": "On vous propose ici de jouer face à une IA ayant appris à jouer à un jeu de Nim grâce à un algorithme d'apprentissage par renforcement. Il y a 8 allumettes au début. Les coups possibles sont de retirer 1 ou 2 allumettes.",
    "interacting_start": "Vous commencez :",

    /* PARAMETERS PART */



    /* ADAPTATION PART */
}