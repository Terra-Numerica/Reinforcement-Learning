/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package appli_subtract_reinforce;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.Hashtable;
import java.util.concurrent.TimeUnit;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.Clip;
import javax.sound.sampled.LineUnavailableException;
import javax.swing.BorderFactory;
import javax.swing.ButtonGroup;
import javax.swing.Icon;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JCheckBox;
import javax.swing.JComboBox;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JRadioButton;
import javax.swing.JSlider;
import javax.swing.JTextField;

/**
 *
 * @author Eric-PC
 */
public class FenetrePrincipale extends JFrame
{
    Dessin_Machine pano_machine ;
    PanneauActions pano_actions;
    Panneau_score pano_score;
    Jeu jeu;
    int musique=-1;
    long clipTime=0;
    
    public FenetrePrincipale(Jeu jeu) {
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        this.jeu=jeu;
        pano_machine = new Dessin_Machine(jeu);
        pano_actions = new PanneauActions();
        pano_score = new Panneau_score(0, 0);
        
        this.getContentPane().setLayout(new GridBagLayout());
        GridBagConstraints cont = new GridBagConstraints();
        cont.fill = GridBagConstraints.BOTH;
        //cont.weighty = 1.0;
        cont.gridx = 0;
        cont.gridy = 0;
        cont.gridheight = 1;
        this.getContentPane().add(pano_machine, cont);
         cont.gridx = 0;
        cont.gridy = 1;
        cont.gridheight = 1;
        this.getContentPane().add(pano_score, cont);
        cont.gridx = 1;
        cont.gridy = 0;
        cont.gridheight = 2;
        this.getContentPane().add(pano_actions, cont);
        this.pack();
    }
    
    public class PanneauActions extends JPanel {
        

        JLabel valeurs = new JLabel("Coups possibles");
        JCheckBox un= new JCheckBox("1");
        JCheckBox deux= new JCheckBox("2");
        JCheckBox trois= new JCheckBox("3");
        JCheckBox quatre= new JCheckBox("4");
        JCheckBox cinq= new JCheckBox("5");
        
        JLabel adversaire = new JLabel("Adversaire");
        String[] elements = { "Aléatoire", "Expert", "Machine"}; 
        JComboBox<String> combo=new JComboBox<>(elements);
        
        JLabel casiers_l = new JLabel("Nombre de casiers");
        JSlider casiers_t = new JSlider(JSlider.HORIZONTAL,8,16,8);
        
        JLabel billes_init = new JLabel("Billes par couleur");
        JSlider billes_s = new JSlider(JSlider.HORIZONTAL,2,10,6);
        
        JLabel penalty_l = new JLabel("Penalité");
        JLabel reward_l = new JLabel("Récompense");
        JTextField penalty = new JTextField("-1");
        JTextField reward = new JTextField("3");
        
        JLabel vitesse = new JLabel("Vitesse");
        JSlider vitesse_s = new JSlider(JSlider.HORIZONTAL,0,2,1);
        
        JLabel commence_l= new JLabel("La machine commence");
        JRadioButton oui=new JRadioButton("Oui");
        JRadioButton non=new JRadioButton("Non");
   
        JButton amorcer=new JButton("Amorcer machine");
        
        Icon play;
        JButton next ;
                //=new JButton(new ImageIcon(getClass().getResource("//resources//Images//play.png")));

        
        public PanneauActions(){
            this.setBorder(BorderFactory.createTitledBorder("Choix des paramètres"));
            //remplissage du combo
            //ajout des Ã©lÃ©ments graphiques
            this.setLayout(new GridBagLayout());
            GridBagConstraints cont = new GridBagConstraints();
            cont.gridx = cont.gridy = 0;
            cont.gridwidth = 5;
            cont.fill = GridBagConstraints.HORIZONTAL;
            cont.ipady=15;
            this.add(valeurs, cont);
            cont.gridx = 0;
            cont.gridy = 1;
            cont.ipadx=20;
            cont.gridwidth = 1;     
            un.setSelected(true);
            this.add(un, cont);
            cont.gridx = 1;
            deux.setSelected(true);
            this.add(deux, cont);
            cont.gridx = 2;
            this.add(trois, cont);
            cont.gridx = 3;
            this.add(quatre, cont);
            cont.gridx = 4;
            this.add(cinq, cont);
            cont.gridx = 0; 
            cont.gridy = 2;
            cont.ipadx=0;
            cont.gridwidth = 2;
            this.add(adversaire, cont);
            cont.gridx = 2; 
            cont.gridy = 2;
            cont.gridwidth = 2; 
            this.add(combo, cont);
            
            
            cont.gridx = 0; 
            cont.gridy = 3;
            cont.gridwidth = 2; 
            this.add(casiers_l, cont);
            cont.gridx = 2; 
            cont.gridwidth = 3; 
            cont.insets=new Insets(10,0,0,0);  
            Hashtable labelTable3 = new Hashtable();
            labelTable3.put( new Integer( 8 ), new JLabel("8") );
            labelTable3.put( new Integer( 12 ), new JLabel("12") );
            labelTable3.put( new Integer( 16 ), new JLabel("16") );
            casiers_t.setLabelTable( labelTable3 );
            casiers_t.setPaintLabels(true);
            casiers_t.setPaintTicks(true);
            casiers_t.setMajorTickSpacing(2);
            this.add(casiers_t,cont);
            
            cont.gridx = 0; 
            cont.gridy = 4;
            cont.gridwidth = 2;
            this.add(billes_init, cont);
            //Create the label table
            Hashtable labelTable2 = new Hashtable();
            labelTable2.put( new Integer( 2 ), new JLabel("2") );
            labelTable2.put( new Integer( 6 ), new JLabel("6") );
            labelTable2.put( new Integer( 10 ), new JLabel("10") );
            billes_s.setLabelTable( labelTable2 );
            billes_s.setPaintLabels(true);
            billes_s.setPaintTicks(true);
            billes_s.setMajorTickSpacing(1);
            cont.gridx = 2; 
            cont.gridy = 4;
            cont.gridwidth = 3; 
            //cont.insets=new Insets(10,0,10,0);  
            this.add(billes_s, cont);
            
            cont.insets=new Insets(5,0,0,0);  
            cont.gridx = 0; 
            cont.gridy = 5;
            cont.gridwidth = 2; 
            this.add(reward_l, cont);
            cont.gridx = 3; 
            cont.gridwidth = 1; 
            this.add(reward,cont);
            cont.gridx = 0; 
            cont.gridy = 6;
            cont.gridwidth = 2; 
            this.add(penalty_l, cont);
            cont.gridx = 3; 
            cont.gridwidth = 1; 
            this.add(penalty,cont);
            
            cont.gridx = 0; 
            cont.gridy = 7;
            cont.gridwidth = 1;
            this.add(vitesse, cont);
            //Create the label table
            Hashtable labelTable = new Hashtable();
            labelTable.put( new Integer( 0 ), new JLabel("Un Coup") );
            labelTable.put( new Integer( 1 ), new JLabel("Une Partie") );
            labelTable.put( new Integer( 2 ), new JLabel("Non stop") );
            vitesse_s.setLabelTable( labelTable );

            vitesse_s.setPaintLabels(true);
            cont.gridx = 2; 
            cont.gridy = 7;
            cont.gridwidth = 3; 
            this.add(vitesse_s, cont);
            
            ButtonGroup bg=new ButtonGroup();
            bg.add(oui);
            bg.add(non);
            cont.gridx = 0; 
            cont.gridy = 8;
            cont.gridwidth = 3; 
            this.add(commence_l, cont);
            cont.gridx=3;
            cont.gridwidth = 1; 
            oui.setSelected(true);
            this.add(oui, cont);
            cont.gridx=4;
            cont.gridwidth = 1; 
            this.add(non, cont);
            
            cont.gridx = 0; 
            cont.gridy = 9;
            cont.gridwidth = 2; 
            cont.fill=GridBagConstraints.NONE;
            this.add(amorcer, cont);
            
            File f = new File("./resources/Images/play.png");          
            ClassLoader classLoader = getClass().getClassLoader();
            URL url = classLoader.getResource("icons/play.png");
            //System.out.println(file.getCanonicalPath()+" "+file.exists());
            next= new JButton(new ImageIcon(url));
            next.setContentAreaFilled(true);
            next.setBackground(Color.white);
            next.setMnemonic(KeyEvent.VK_SPACE);
            cont.gridx = 3; 
            cont.gridy = 9;
            cont.gridwidth = 1; 
            cont.anchor=GridBagConstraints.BASELINE;
            //cont.insets=new Insets(5,0,10,0);  
            this.add(next, cont);
            

            
            amorcer.addActionListener(new ActionListener() {
                
                @Override
                public void actionPerformed(ActionEvent ae) {
                    int t[]=new int[5];
                    int j=0;
                    int nbc=0;
                    Adversaire adv=Adversaire.ALEA;
                    if (un.isSelected()){
                        nbc++;
                        t[j]=1;
                        j++;
                    }
                    if (deux.isSelected()){
                        nbc++;
                        t[j]=2;
                        j++;
                    }
                    if (trois.isSelected()){
                        nbc++;
                        t[j]=3;
                        j++;
                    }
                    if (quatre.isSelected()){
                        nbc++;
                        t[j]=4;
                        j++;
                    }
                    if (cinq.isSelected()){
                        nbc++;
                        t[j]=5;
                        j++;
                    }
                    switch (combo.getSelectedIndex()){
                        case 0: adv=Adversaire.ALEA;break;
                        case 1: adv=Adversaire.EXPERT;break;
                        case 2: adv=Adversaire.MACHINE;break;
                        case 3: adv=Adversaire.HUMAIN;break;                             
                    }
                    int c=billes_s.getValue();
                    int r=Integer.parseInt(reward.getText());
                    int p=Integer.parseInt(penalty.getText());
                    int v=vitesse_s.getValue();
                    int nbcas=casiers_t.getValue()+1;
                    int joueur=0;
                    musique=(musique+1)%5;
                    clipTime=0;
                    if (non.isSelected())
                        joueur=1;
                    jeu.init_machine(t, nbcas, nbc, c, p, r, v, adv,joueur);
                    pano_score.setNb_defaites(0);
                    pano_score.setNb_victoires(0);
                    
                    pano_machine.update(-1);
                    pano_score.dessin.repaint();
                }
            });
            
            next.addActionListener(new ActionListener() {
                boolean actif=false;
                Clip clip=null;
                Jouer t=new Jouer();   
                @Override
                public void actionPerformed(ActionEvent ae) {
                    if (jeu.vitesse==0){
                        boolean fin_partie=jeu.jouerUnCoup();
                        if (fin_partie) {
                            if (jeu.joueur==0){//adversaire a gagné
                                pano_score.nb_defaites++;
                                System.out.println("Adversaire gagne");
                                jeu.renforcement(false, 0);
                                if (jeu.adversaire==Adversaire.MACHINE)
                                    jeu.renforcement(true, 1);
                            }
                            else {
                                pano_score.nb_victoires++;
                                System.out.println("Machine gagne");
                                jeu.renforcement(true, 0);       
                                if (jeu.adversaire==Adversaire.MACHINE)
                                    jeu.renforcement(false, 1);
                            }
                            System.out.println("Mise à jour des valeurs...");
                            
                            for (int j=1;j<jeu.nb_casiers;j++){
                                if (jeu.coups_machine[j][0]!=-1 || jeu.coups_machine[j][1]!=-1)
                                        pano_machine.update(j);                                  
                            }
                            pano_score.dessin.repaint();
                            jeu.reinit_partie();
                            if (non.isSelected())
                                jeu.joueur=1;
                            else jeu.joueur=0;
                        }
                    }
                    else if (jeu.vitesse==1){
                        jeu.jouerUnePartie();
                        if (jeu.joueur==0){//adversaire a gagné
                                pano_score.nb_defaites++;
                                System.out.println("Adversaire gagne");
                                jeu.renforcement(false, 0);
                                if (jeu.adversaire==Adversaire.MACHINE)
                                    jeu.renforcement(true, 1);                               
                        }
                        else {
                                pano_score.nb_victoires++;
                                System.out.println("Machine gagne");
                                jeu.renforcement(true, 0);       
                                if (jeu.adversaire==Adversaire.MACHINE)
                                    jeu.renforcement(false, 1);
                        }
                        System.out.println("Mise à jour des valeurs...");
                        for (int j=1;j<jeu.nb_casiers;j++){
                                if (jeu.coups_machine[j][0]!=-1 || jeu.coups_machine[j][1]!=-1)
                                        pano_machine.update(j);                                  
                        }
                        pano_score.dessin.repaint();
                        jeu.reinit_partie();
                        if (non.isSelected())
                                jeu.joueur=1;
                        else jeu.joueur=0;
                    }
                    else {   
                        if (!actif){
                            actif=true;
                            t.start();
                            try {
                                clip = AudioSystem.getClip();
                                switch (musique){
                                    case 0:clip.open(AudioSystem.getAudioInputStream(new File("C:\\Users\\Eric-PC\\Downloads\\fatboy.wav")));break;
                                    case 1:clip.open(AudioSystem.getAudioInputStream(new File("C:\\Users\\Eric_portable_HP\\Downloads\\muse.wav")));break;
                                    case 2: clip.open(AudioSystem.getAudioInputStream(new File("C:\\Users\\Eric_portable_HP\\Downloads\\temper.wav")));break;
                                    case 3: clip.open(AudioSystem.getAudioInputStream(new File("C:\\Users\\Eric_portable_HP\\Downloads\\parov.wav")));break;
                                    case 4: clip.open(AudioSystem.getAudioInputStream(new File("C:\\Users\\Eric_portable_HP\\Downloads\\avener.wav")));break;
                                }
                                
                                clip.setMicrosecondPosition(clipTime);
                                clip.start();
                            } catch (Exception ex) {
                                Logger.getLogger(FenetrePrincipale.class.getName()).log(Level.SEVERE, null, ex);
                            }
    
                        }
                        else{
                            if (clip!=null){
                                clipTime= clip.getMicrosecondPosition();
                                clip.stop();
                                clip=null;
                            }
                            t.stop();                            
                            actif=false;
                        }
                    }
                        
                }
                
                class Jouer implements Runnable{
                    
                    private Thread t;
                    private volatile boolean reset = false;
                    
                    public void start(){
                        t=new Thread(this);
                        t.start();
                    }

                    @Override
                    public void run() {
                        reset=false;
                        do{
                            jeu.jouerUnePartie();
                            if (jeu.joueur==0){//adversaire a gagné
                                pano_score.nb_defaites++;
                                System.out.println("Adversaire gagne");
                                jeu.renforcement(false, 0);
                                if (jeu.adversaire==Adversaire.MACHINE)
                                    jeu.renforcement(true, 1);                               
                            }
                             else {
                                pano_score.nb_victoires++;
                                System.out.println("Machine gagne");
                                jeu.renforcement(true, 0);       
                                if (jeu.adversaire==Adversaire.MACHINE)
                                    jeu.renforcement(false, 1);
                            }
                            System.out.println("Mise à jour des valeurs...");
                            for (int j=1;j<jeu.nb_casiers;j++){
                                    if (jeu.coups_machine[j][0]!=-1 || jeu.coups_machine[j][1]!=-1)
                                            pano_machine.update(j);                                  
                            }
                            pano_score.dessin.repaint();
                            jeu.reinit_partie();
                            if (non.isSelected())
                                    jeu.joueur=1;
                            else jeu.joueur=0;
                            try {
                                TimeUnit.MILLISECONDS.sleep(500);
                            } catch (InterruptedException ex) {
                                Logger.getLogger(FenetrePrincipale.class.getName()).log(Level.SEVERE, null, ex);
                            }
                        }while (!reset);
                    }
                    
                    public void stop(){
                        reset=true;
                    }
                    
                }
            });
        }
    }
    
}
