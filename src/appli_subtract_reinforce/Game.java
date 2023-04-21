/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package appli_subtract_reinforce;

import java.util.Scanner;

/**
 *
 * @author Eric_portable_HP
 */
public class Game {
    
    int S[]; // les coups possibles
    int nb_couleurs;
    int nb_casiers;
    int machine[][];
    int position_courante;
    int coups_machine[][];
    int reward;
    int penalty;
    int c; // nombre de billes de chaque couleur dans chaque casier
    int vitesse;
    int joueur; // 0 machine
    Opponent adversaire;
    int ppos[];
    final int NB_CASIERS_MAX=17;
    
    Game(int[] moves, int longueur){
        nb_couleurs=moves.length;
        S=new int[nb_couleurs];
        for (int i=0;i<moves.length;i++)
            S[i]=moves[i];
        nb_casiers=longueur;
        machine=new int[nb_casiers][nb_couleurs];
        coups_machine=new int[NB_CASIERS_MAX][2];//0: machine 1, 1: machine 2
        position_courante=nb_casiers-1;
        joueur=0;
        adversaire=Opponent.HAZARD;
        vitesse=0;
        reward=3;
        penalty=-1;
        ppos=new int[NB_CASIERS_MAX];
    }
    
    public void init_machine(int t[], int nbcas, int nbc, int c, int p, int r, int vitesse, Opponent adversaire, int jo) { // init équitable, avec c billes de chaque couleur
        this.c=c;
        this.penalty=p;
        this.reward=r;
        this.adversaire=adversaire;
        this.nb_casiers=nbcas;
        this.vitesse=vitesse;
        this.joueur=jo;
        nb_couleurs=nbc;
        S=new int[nb_couleurs];
        int j=0;
        for (int i=0;i<t.length;i++){
            if (t[i]!=0){ //on ne garde que les coups non nuls
                S[j]=t[i];
                j++;
            }
        }
        machine=new int[NB_CASIERS_MAX][nb_couleurs];
        position_courante=nb_casiers-1;
	for (int i = 1; i < nb_casiers; i++) {
             init_casier(i);
             coups_machine[i][0]=coups_machine[i][1]=-1; //pas joué
        }
        calcul_ppos();
    }
    
    public void reinit_partie(){
        for (int i = 1; i < nb_casiers; i++) {
             coups_machine[i][0]=coups_machine[i][1]=-1; //pas joué
        }
        position_courante=nb_casiers-1;
        
    }
    
    
    public void init_casier(int i){//iit equitable avec c de chaque couleur
        for (int j = 0; j < nb_couleurs; j++)
                    if (S[j]<=i)
			machine[i][j]=c;  
                    else 
                        machine[i][j]=0;
    }
    
    public int coup_machine(int numero_machine){//retourne une valeur dans 0..nb_couleurs-1
        int nb_billes = 0;
	for (int j = 0; j < nb_couleurs; j++)
		nb_billes += machine[position_courante][j];
        int alea=(int) (Math.random()*nb_billes);
        for (int j=0;j<nb_couleurs;j++)
		for (int k = 0; k < machine[position_courante][j]; k++) {
			alea--;
			if (alea < 0){
                            coups_machine[position_courante][numero_machine]=j;
                            return j;
                        }
				
                }
        return -1;//si probleme
    }
    
    public int coup_alea(){//coup aleatoire de l'humain
        int coup;
        do {
        coup=(int)(Math.random()*nb_couleurs);
        } while (S[coup]>position_courante);
        return coup;
    }
    
    public int coup_humain(){
        System.out.println("position courante "+position_courante);
        System.out.print("choisissez un coup: ");
        Scanner sc = new Scanner(System.in);
        int j=sc.nextInt();
        return j;
    }
    
    public int coup_expert(){
        int coup;
        for (int j=0;j<nb_couleurs;j++){
            if (position_courante-S[j]>=0 && ppos[position_courante-S[j]]==0)
                return j;
        }
        return coup_alea();
    }
    
    public boolean jouer_coup(int j){//joue le coup S[j] et return true si coup gagnant
        System.out.println("position courante: "+position_courante+" coup joue "+S[j]);
        position_courante-=S[j];
        joueur = 1 - joueur ;
        if (position_courante<S[0]){
            System.out.println("partie finie");
            return true;
        }
        else 
            return false;
    }
    
    public void renforcement(boolean victoire, int numero_machine){
        for (int i=1;i<nb_casiers;i++){
            if (coups_machine[i][numero_machine]>=0){
                machine[i][coups_machine[i][numero_machine]] += (victoire)? reward : penalty ;
                if (machine[i][coups_machine[i][numero_machine]] <0)
                    machine[i][coups_machine[i][numero_machine]]=0;
            }
        }
        for (int i=1;i<nb_casiers;i++){
            int sum=0;
            for (int j=0;j<nb_couleurs;j++){              
                sum+=machine[i][j];            
            }
            if (sum==0)
                init_casier(i);
        }      
      
    }
    
    public void partie_humaine(){
        int j;
        int joueur=(int) (Math.random()*2);//0=machine, 1=human
        boolean continuer = true;
        boolean fin_partie;
        Scanner sc = new Scanner(System.in);
        do{
            System.out.println("NOUVELLE PARTIE");
            joueur=(int) (Math.random()*2);
            fin_partie=false;
            position_courante=nb_casiers-1;
            while (!fin_partie){ 
                if (joueur==0){
                    j= coup_machine(0) ;
                    System.out.println("La machine joue "+S[j]);
                    fin_partie=jouer_coup(j);
                }
                else {
                    j= coup_humain();
                    fin_partie=jouer_coup(j);
                }
            }
            if (joueur==0){
                System.out.println("Humain gagne");
                renforcement(false, 0);
            }
            else {
                System.out.println("Machine gagne");
                renforcement(true, 0);
            }
            System.out.println("Mise à jour des valeurs...");
            System.out.println("Affichage de la machine\n"+this);
            
            System.out.println("Voulez vous recommencer ?");           
            continuer=sc.nextBoolean();
            
        }while (continuer);
    }
    
    
    @Override
    public String toString(){
        String s="";
        for (int i = 1; i < nb_casiers; i++) {
            s+="casier "+i+" ";
            for (int j = 0; j < nb_couleurs; j++)
                s+="-"+S[j]+":"+machine[i][j]+" ";
            s+="\n";
        }       
        return s;
        
    }

    boolean jouerUnCoup() {
        int j=0;

        if (joueur==0){//à la machine de jouer
            j=coup_machine(0);           
        }
        else {//à l'adversaire de jouer
            switch (adversaire){
                case HAZARD: j=coup_alea();break;
                case HUMAN: j=coup_humain();break;
                case MACHINE: j=coup_machine(1);break;
                case EXPERT: j=coup_expert();break;
            }
        }                
        return jouer_coup(j);
    }

    void jouerUnePartie() {
        
        boolean fin_partie=false;
        System.out.println("NOUVELLE PARTIE");
        int j;
        while (!fin_partie){ 
            fin_partie=jouerUnCoup();
        }
    }


    private void calcul_ppos() {
        ppos[0]=0;
        int j;
        for (int i=1;i<NB_CASIERS_MAX;i++){
            j=0;
            ppos[i]=0;
            while (j<nb_couleurs){
                if (i-S[j]>=0 && ppos[i-S[j]]==0){
                    ppos[i]=1;
                    break;
                }
                j++;
            }
        }
    }
    
}
