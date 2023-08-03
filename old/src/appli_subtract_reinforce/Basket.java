/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package appli_subtract_reinforce;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import javax.swing.JComponent;

/**
 *
 * @author Eric-PC
 */
public class Basket extends JComponent{
    
    private int largeur_basse = 75;
    private int largeur_haute = 100;
    private int hauteur = 120;

    int tab[];
    int n;
    
    public Basket(Game jeu, int n){
        this.n=n;
        tab=new int[jeu.nb_couleurs];
        for (int i=0;i<jeu.nb_couleurs;i++)
            tab[i]=jeu.machine[n][i];
        
    }
    
    void reset(Game jeu) {
        tab=new int[jeu.nb_couleurs];
        for (int i=0;i<jeu.nb_couleurs;i++)
            tab[i]=jeu.machine[n][i];
        
    }
    
    
    @Override
    protected void paintComponent(Graphics g) {
        Graphics2D gr=(Graphics2D) g;
        int espace_ligne=20;
        gr.setStroke(new BasicStroke(6));
        gr.drawLine(0, 0, (largeur_haute-largeur_basse)/2, hauteur);
        gr.drawLine((largeur_haute-largeur_basse)/2, hauteur, (largeur_haute-largeur_basse)/2+largeur_basse, hauteur);
        gr.drawLine((largeur_haute-largeur_basse)/2+largeur_basse, hauteur, largeur_haute, 0);
        gr.setFont(new Font("Times",Font.BOLD,15));
        gr.drawString(Integer.toString(n),(largeur_haute)/2-5, hauteur+15);
        
        int nb_billes=0;
        for (int i=0;i<tab.length;i++){
            nb_billes+=tab[i];
        }
        gr.setFont(new Font("Times",Font.PLAIN,14));
        int xrand,yrand;
        Color c;
        for (int i=0;i<tab.length;i++){
            switch (i){
                    case 0: c=new Color(255,215,0);gr.setColor(c);break;
                    case 1: gr.setColor(Color.red);break;
                    case 2: c=new Color(0, 191, 255);gr.setColor(c);break;
                    case 3: gr.setColor(new Color(50, 205, 50));break;
                    case 4: gr.setColor(Color.magenta);break;
                    default: gr.setColor(Color.orange);break;
                }
            for (int j=0;j<tab[i];j++){
                do{
                yrand=(hauteur-15)-(int)(Math.random()*nb_billes*1.2);
                } while (yrand<5);
                xrand=(largeur_haute-largeur_basse)/2  + (int)(Math.random()*(largeur_basse-10));
                gr.fillOval(xrand, yrand, 10, 10);
            }
            
            gr.fillRect(5+i*espace_ligne, hauteur+20, 25, 20);
            gr.setColor(Color.black);
            gr.drawString(Integer.toString(tab[i]),5+i*espace_ligne, hauteur+35);
        }
        
        //codage choisi: 1 pixel par bille, donc nb_billes pixels de hauteur max.
        
        //affichage des stats du casier
        
    }
    
     public Dimension getPreferredSize() {
        return new Dimension(largeur_haute, hauteur+45);
    }


}
