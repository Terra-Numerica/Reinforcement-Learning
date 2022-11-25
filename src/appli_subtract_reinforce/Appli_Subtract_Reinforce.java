/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package appli_subtract_reinforce;

/**
 *
 * @author Eric_portable_HP
 */
public class Appli_Subtract_Reinforce {
    


    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        int t[]={1,2};
        Jeu j= new Jeu(t,9);
        j.init_machine(t,9, 2,6,-1,3,0,Adversaire.ALEA,0);
        
        FenetrePrincipale fen=new FenetrePrincipale(j);
        fen.setVisible(true);
        
        j.partie_humaine();
    }
    
}
