/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package appli_subtract_reinforce;

import java.awt.Dimension;
import java.awt.FlowLayout;
import java.awt.GridLayout;
import javax.swing.BorderFactory;
import javax.swing.JComponent;
import javax.swing.JPanel;

/**
 *
 * @author Eric-PC
 */
public class Dessin_Machine extends JPanel{
    
    Jeu jeu;
    Casier tab_casiers[];
    
    public Dessin_Machine(Jeu jeu){
        this.jeu=jeu;
        tab_casiers=new Casier[jeu.NB_CASIERS_MAX];
        int x=0;
        this.setBorder(BorderFactory.createTitledBorder("Visualisation de la machine"));
        this.setLayout(new GridLayout(2,8));
        // Les casiers qui doivent etre affiches
        for (int i=1;i<jeu.nb_casiers;i++){
            tab_casiers[i]=new Casier(jeu,i);
            this.add(tab_casiers[i]);
        }
        // Les casiers qui ne doivent pas apparaitre a l ecran
        for (int i=jeu.nb_casiers;i<jeu.NB_CASIERS_MAX;i++){
            tab_casiers[i]=new Casier(jeu,i);
            this.add(tab_casiers[i]);
            tab_casiers[i].setVisible(false);
        }
            

        //this.setPreferredSize(new Dimension(jeu.nb_casiers*tab_casiers[1].getPreferredSize().width,tab_casiers[1].getPreferredSize().height) );
        
    }

    //Agit lorsque clic sur bouton Amorcer machine
    public void update(int i){//met à jour le casier i, tout si -1
        if (i!=-1){
            for (int j=0;j<jeu.nb_couleurs;j++)
                tab_casiers[i].tab[j]=jeu.machine[i][j];
            tab_casiers[i].repaint();
        }
        else{
            
            for (int j=1;j<jeu.nb_casiers;j++){
                tab_casiers[j].reset(jeu);
                tab_casiers[j].repaint();   
                tab_casiers[j].setVisible(true);
            }
            for (int j=jeu.nb_casiers;j<jeu.NB_CASIERS_MAX;j++)
                tab_casiers[j].setVisible(false);
            
        }
    }
            
            
}
