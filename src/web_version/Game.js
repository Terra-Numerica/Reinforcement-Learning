const opponents = {
    HUMAN: 0,
    MACHINE: 1,
    EXPERT: 2,
    HAZARD: 3
}

var S = new Array() // les coups possibles
var nb_couleurs;
var nb_casiers;
var machine = null; //2d array
var position_courante;
var coups_machine = null;//2d array
var reward;
var penalty;
var c; // nombre de billes de chaque couleur dans chaque casier
var vitesse;
var joueur; // 0 machine
var adversaire;
var ppos = new Array();

const NB_CASIERS_MAX = 17;

class Game {
    constructor(moves, longueur) {
        this.nb_couleurs = moves;
        this.S = new Array(this.nb_couleurs);
        for (let i = 1; i < moves; i++)
            this.S[i] = i;
        this.nb_casiers = longueur;
        this.machine = new Array(this.nb_casiers);
        for (let i = 0; i < this.nb_casiers; i++)
            this.machine[i] = new Array(this.nb_couleurs);
        this.coups_machine = new Array(NB_CASIERS_MAX);//0: machine 1, 1: machine 2
        for (let i = 0; i < NB_CASIERS_MAX; i++)
            this.coups_machine[i] = new Array(2);
        this.position_courante = this.nb_casiers - 1;
        this.joueur = 0;
        this.adversaire = opponents['HAZARD'];
        this.vitesse = 0;
        this.reward = 3;
        this.penalty = -1;
        this.ppos = new Array(NB_CASIERS_MAX);
    }

    init_machine(t, nbcas, nbc, c, p, r, vitesse, adversaire, jo) {
        this.c = c;
        this.penalty = p;
        this.reward = r;
        this.adversaire = adversaire;
        this.nb_casiers = nbcas;
        this.vitesse = vitesse;
        this.joueur = jo;
        nb_couleurs = nbc;
        S = new Array(nb_couleurs);
        let j = 0;
        for (let i = 0; i < t; i++) {
            S[j] = t;
            j++;
        }
        for (let i = 0; i < NB_CASIERS_MAX; i++)
            this.coups_machine[i] = new Array(this.nb_couleurs);
        this.position_courante = this.nb_casiers - 1;
        for (let i = 1; i < this.nb_casiers; i++) {
            this.init_casier(i);
            this.coups_machine[i][0] = this.coups_machine[i][1] = -1; //pas joué
        }
        this.calcul_ppos();
    }


    reinit_partie() {
        for (let i = 1; i < this.nb_casiers; i++) {
            this.coups_machine[i][0] = this.coups_machine[i][1] = -1; //pas joué
        }
        this.position_courante = nb_casiers - 1;
    }

    init_casier(i) {//iit equitable avec c de chaque couleur
        for (let j = 0; j < this.nb_couleurs; j++)
            if (S[j] <= i)
                this.machine[i][j] = c;
            else
                this.machine[i][j] = 0;
    }

    coup_machine(numero_machine) {//retourne une valeur dans 0..nb_couleurs-1
        var nb_billes = 0;
        for (let j = 0; j < this.nb_couleurs; j++)
            nb_billes += this.machine[this.position_courante][j];
        var alea = (int)(Math.random() * nb_billes);
        for (let j = 0; j < this.nb_couleurs; j++)
            for (let k = 0; k < this.machine[this.position_courante][j]; k++) {
                alea--;
                if (alea < 0) {
                    this.coups_machine[this.position_courante][this.numero_machine] = j;
                    return j;
                }

            }
        return -1;//si probleme
    }

    coup_alea() {//coup aleatoire de l'humain
        var coup;
        do {
            coup = (int)(Math.random() * this.nb_couleurs);
        } while (S[coup] > this.position_courante);
        return coup;
    }

    coup_humain() {
        console.log("position courante " + this.position_courante);
        let j = parseInt(prompt("choisissez un coup: "));
        return j;
    }

    coup_expert() {
        var coup;
        for (let j = 0; j < this.nb_couleurs; j++) {
            if (this.position_courante - S[j] >= 0 && this.ppos[this.position_courante - S[j]] == 0)
                return j;
        }
        return coup_alea();
    }

    jouer_coup(j) {//joue le coup S[j] et return true si coup gagnant
        console.log("position courante: " + this.position_courante + " coup joue " + S[j]);
        this.position_courante -= this.S[j];
        joueur = 1 - joueur;
        if (this.position_courante < this.S[0]) {
            console.log("partie finie");
            return true;
        }
        else
            return false;
    }

    renforcement(victoire, numero_machine) {
        for (let i = 1; i < this.nb_casiers; i++) {
            if (this.coups_machine[i][numero_machine] >= 0) {
                this.machine[i][this.coups_machine[i][numero_machine]] += (victoire) ? this.reward : this.penalty;
                if (this.machine[i][this.coups_machine[i][numero_machine]] < 0)
                    this.machine[i][this.coups_machine[i][numero_machine]] = 0;
            }
        }
        for (let i = 1; i < this.nb_casiers; i++) {
            var sum = 0;
            for (let j = 0; j < this.nb_couleurs; j++) {
                sum += machine[i][j];
            }
            if (sum == 0)
                this.init_casier(i);
        }

    }

    partie_humaine() {
        var j;
        var joueur = (int)(Math.random() * 2);//0=machine, 1=human
        var continuer = true;
        var fin_partie;
        do {
            console.log("NOUVELLE PARTIE");
            joueur = (int)(Math.random() * 2);
            fin_partie = false;
            this.position_courante = this.nb_casiers - 1;
            while (!fin_partie) {
                if (joueur == 0) {
                    j = this.coup_machine(0);
                    console.log("La machine joue " + S[j]);
                    fin_partie = this.jouer_coup(j);
                }
                else {
                    j = this.coup_humain();
                    fin_partie = this.jouer_coup(j);
                }
            }
            if (joueur == 0) {
                console.log("Humain gagne");
                this.renforcement(false, 0);
            }
            else {
                console.log("Machine gagne");
                this.renforcement(true, 0);
            }
            console.log("Mise à jour des valeurs...");
            console.log("Affichage de la machine\n" + this);

            continuer = prompt("Voulez vous recommencer ? (o/n) ").equals("o");

        } while (continuer);
    }

    toString() {
        var s = "";
        for (let i = 1; i < this.nb_casiers; i++) {
            s += "casier " + i + " ";
            for (let j = 0; j < this.nb_couleurs; j++)
                s += "-" + S[j] + ":" + this.machine[i][j] + " ";
            s += "\n";
        }
        return s;
    }

    jouerUnCoup() {
        var j = 0;

        if (joueur == 0) {//à la machine de jouer
            j = this.coup_machine(0);
        }
        else {//à l'adversaire de jouer
            switch (adversaire) {
                case "HAZARD": j = coup_alea(); break;
                case "HUMAN": j = coup_humain(); break;
                case "MACHINE": j = coup_machine(1); break;
                case "EXPERT": j = coup_expert(); break;
            }
        }
        return this.jouer_coup(j);
    }

    jouerUnePartie() {
        var fin_partie = false;
        console.log("NOUVELLE PARTIE");
        var j;
        while (!fin_partie) {
            fin_partie = this.jouerUnCoup();
        }
    }

    calcul_ppos() {
        this.ppos[0] = 0;
        var j;
        for (let i = 1; i < NB_CASIERS_MAX; i++) {
            j = 0;
            this.ppos[i] = 0;
            while (j < this.nb_couleurs) {
                if (i - S[j] >= 0 && this.ppos[i - this.S[j]] == 0) {
                    this.ppos[i] = 1;
                    break;
                }
                j++;
            }
        }
    }
}