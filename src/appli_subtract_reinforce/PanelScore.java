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
import javax.swing.BorderFactory;
import javax.swing.JComponent;
import javax.swing.JPanel;

/**
 *
 * @author Eric-PC
 */
public class PanelScore extends JPanel {
    
    Dessin_score dessin;
    int nb_victoires;
    int nb_defaites;

    public void setNb_victoires(int nb_victoires) {
        this.nb_victoires = nb_victoires;
    }

    public void setNb_defaites(int nb_defaites) {
        this.nb_defaites = nb_defaites;
    }
    
    public PanelScore(int v, int d){
        nb_victoires=v;
        nb_defaites=d;
        this.setBorder(BorderFactory.createTitledBorder("Score"));
        dessin=new Dessin_score();
        this.add(dessin);
    }
    
    public class Dessin_score extends JComponent{
        
        int largeur_pixels = 600;
        int hauteur_pixels = 40;
        
        public Dessin_score(){
            
        }
        
        @Override
        protected void paintComponent(Graphics g) {
            Graphics2D gr=(Graphics2D) g;
            gr.setStroke(new BasicStroke(4));
            gr.setFont(new Font("courier",Font.BOLD,35));
            int largeur_v=0;                      
            if (nb_victoires+nb_defaites>0){
                largeur_v = largeur_pixels*nb_victoires/(nb_defaites+nb_victoires);               
            }
            else
                largeur_v = largeur_pixels / 2;
            gr.setColor(new Color(50, 205, 50));          
            gr.drawString("victoires", 0, 30);
            //gr.fillRect(80, 40, largeur_v, hauteur_pixels);
            gr.fillRect(85, 40, largeur_v, hauteur_pixels);
            gr.drawString(""+nb_victoires, 0, 30+hauteur_pixels);
            gr.setColor(Color.RED);          
            gr.drawString("défaites", largeur_pixels-10, 30);
            gr.fillRect(85+largeur_v, 40, largeur_pixels-largeur_v, hauteur_pixels);
            //gr.drawString(""+nb_defaites, 55+largeur_pixels+8, 30+hauteur_pixels);
            gr.drawString(""+nb_defaites, 85+largeur_pixels+8, 30+hauteur_pixels);
            gr.setColor(Color.black);    
            //gr.drawRect(80, 40, largeur_pixels-20, hauteur_pixels);
            gr.drawRect(85, 40, largeur_pixels, hauteur_pixels);
            


        }
        
        @Override
        public Dimension getPreferredSize() {
            return new Dimension(largeur_pixels+160, hauteur_pixels+50);
         }   
        
        
    }
    
}
