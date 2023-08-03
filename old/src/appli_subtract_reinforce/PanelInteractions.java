package appli_subtract_reinforce;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Arrays;

/**
 * Author Milena
 * Onglet interactif afin de mieux comprendre comment fonctionne un apprentissage par renforcement dans le cas du jeu de Nim
 */

public class PanelInteractions extends JPanel implements ActionListener{
    public int nbAllu =8;
    public int[] red; // Nombre de boules rouges pour chaque allumette
    public int[] yellow; // Nombre de boules jaunes pour chaque allumette
    public int[] poss; // Position des changements
    public int[] numSticks; // Nombre d'allumettes retirees
    int nbCoups = 0;
    public JButton btn1;
    public JButton btn2;
    public JButton btn3;

    public JButton btn4;
    JLabel howSticks;
    JLabel Result;
    JLabel ActionsIA;
    JLabel ActionsIA2;

    public String contentHowSticks(){
        return("<html><body><center><font size=+1><font color=blue>" + "Il reste 8 allumette(s)." +
                "</font></font></center>" +
                "</body></html>");
    }
    public PanelInteractions(String content){
        JLabel lbl1 = new JLabel(content);
        howSticks = new JLabel(contentHowSticks(), SwingConstants.CENTER);
        Result = new JLabel("", SwingConstants.CENTER);
        ActionsIA = new JLabel("", SwingConstants.CENTER);
        ActionsIA2 = new JLabel("", SwingConstants.CENTER);

        btn1 = new JButton("1 allumette");
        btn2 = new JButton("2 allumettes");
        btn3 = new JButton("Recommencer");
        btn4 = new JButton("Reinitialiser");

        GridBagLayout gb = new GridBagLayout();
        GridBagConstraints gbc = new GridBagConstraints();
        setLayout(gb);
        gbc.fill = GridBagConstraints.BOTH;
        gbc.weightx = 1;
        gbc.weighty = 1;
        gbc.gridx = 1;

        gb.setConstraints(lbl1, gbc);
        gb.setConstraints(howSticks, gbc);
        gb.setConstraints(Result, gbc);
        gb.setConstraints(ActionsIA, gbc);
        gb.setConstraints(ActionsIA2, gbc);
        gb.setConstraints(btn1, gbc);
        gb.setConstraints(btn2, gbc);
        gb.setConstraints(btn3, gbc);
        gb.setConstraints(btn4, gbc);

        add(lbl1);
        add(howSticks);
        add(Result);
        add(ActionsIA);
        add(ActionsIA2);
        add(btn1);
        add(btn2);
        add(btn3);
        add(btn4);

        btn1.addActionListener(this);
        btn2.addActionListener(this);
        btn3.addActionListener(this);
        btn4.addActionListener(this);

        init();
    }

    public void init(){
        red = new int[8];
        yellow = new int[8];
        poss = new int[5];
        numSticks = new int[5];
        for(int i=0; i<8; i++){
            red[i] = 6;
            yellow[i] = 6;
        }
        red[0] = 0;
        for (int i=0; i<5;i++){
            poss[i] = 0;
            numSticks[i] = 0;
        }
        fillActionIA2Casier();
        System.out.println(Arrays.toString(red));
        System.out.println(Arrays.toString(yellow));
    }

    public void fillActionIA2Casier(){
        this.ActionsIA2.setText("<html><body><center><font size=+1>" +
                "Le contenu du casier : <br>les boules jaunes " +
                Arrays.toString(yellow) +
                "<br>les boules rouges " + Arrays.toString(red) +
                "</font></center>" +
                        "</body></html>"
        );
    }
    public void fillRedYellow(int reward){
        for(int i=0; i< 5; i++){
            if(numSticks[i] == 1){
                yellow[poss[i]] += reward;
            }
            if (numSticks[i] == 2){
                red[poss[i]] += reward;
            }
        }
        for (int i=0; i<5;i++){
            poss[i] = 0;
            numSticks[i] = 0;
        }
        nbCoups=0;
        fillActionIA2Casier();
        System.out.println("Contenu des casiers");
        System.out.println("Les rouges" + Arrays.toString(red));
        System.out.println("Les jaunes" + Arrays.toString(yellow));
    }

    public void fillResult(int i){
        if (i==0){ //IA a gagne
            this.Result.setText("<html><body><center><font size=+2>" + "L'IA a gagné." +
                    "</font></center>" +
                    "</body></html>");
        }
        if (i==1){ //IA a perdu
            this.Result.setText("<html><body><center><font size=+2>" + "L'IA a perdu." +
                    "</font></center>" +
                    "</body></html>");
        }
    }

    public void fillActionIA(int i){
        if(i==0){ //IA a gagne
            this.ActionsIA.setText("<html><body><center><font size=+1><font color=green>" +
                    "L'IA va recevoir une récompense : pour chacun des coups qu'elle a fait," +
                    "<br>elle récupère trois boules de la couleur correspondant au nombre d'allumettes enlevées." +
                    "</font></font></center>" +
                    "</body></html>");

        }
        if (i==1){ //IA a perdu
            this.ActionsIA.setText("<html><body><center><font size=+1><font color=green>" +
                    "L'IA va recevoir une punition : pour chacun des coups qu'elle a fait," +
                    "<br>elle doit enlever une boule de la couleur correspondant au nombre d'allumettes enlevées." +
                    "</font></font></center>" +
                    "</body></html>");
        }
        if (i ==2) { //Pas de gagnant pour le moment
            this.ActionsIA.setText("<html><body><center><font size=+1>" +
                    "L'IA a également joué." +
                    "</font></center>" +
                    "</body></html>");
        }
    }

    public void fillActionIA2(int i){
        this.ActionsIA2.setText("<html><body><center><font size=+1>" +
                        "L'IA a enlevé " + i + " allumette(s)." +
                "</font></center>" +
                "</body></html>");
    }

    public void fillHowSticks(){
        this.howSticks.setText("<html><body><center><font size=+1><font color=blue>" +
                        "Il reste " + Integer.toString(this.nbAllu) + " allumette(s)." +
                "</font></font></center>" +
                "</body></html>");
    }

    public void errorMessage(){
        this.howSticks.setText("<html><body><center><font size=+1>" +
                "On remet 8 allumettes" +
                "</font></font></center>" +
                "</body></html>" );
        this.Result.setText("<html><body><center><font size=+1>" +
                "Il ne reste plus aucun coup possible à l'IA par faute de boules disponibles." +
                        "<br>Reinitialisation forcée du jeu." +
                "</font></font></center>" +
                "</body></html>");
    }
    
    public void actionIA(){
        if (this.nbAllu == 1){
            poss[nbCoups] = this.nbAllu - 1;
            numSticks[nbCoups] = 1;
            this.nbAllu = 0;
            fillHowSticks();
            fillResult(0);
            fillActionIA(0);
            fillRedYellow(3);
            nbCoups=0;
        } else {
            int nbRed = red[this.nbAllu - 1];
            int nbYellow = yellow[this.nbAllu - 1];
            int randomNum;
            if (nbRed == 0 && nbYellow == 0){
                this.nbAllu = 8;
                init();
                this.ActionsIA.setText("");
                this.ActionsIA2.setText("");
                this.Result.setText("");
                this.howSticks.setText("");
                errorMessage();
                randomNum = 3;
            }
            else if (nbRed == 0)
                randomNum = 1;
            else if (nbYellow == 0)
                randomNum = 2;
            else {
                int temp = 1 + (int) (Math.random() * (nbRed + nbYellow));
                if (temp <= nbYellow)
                    randomNum = 1;
                else
                    randomNum = 2;
            }
            if (randomNum == 1) {
                poss[nbCoups] = this.nbAllu - 1;
                numSticks[nbCoups] = 1;
                nbCoups++;
            }
            if (randomNum == 2){
                poss[nbCoups] = this.nbAllu - 1;
                numSticks[nbCoups] = 2;
                nbCoups++;
            }
            if (randomNum != 3){
                this.nbAllu -= randomNum;
                fillActionIA2(randomNum);
                fillHowSticks();
                if (this.nbAllu == 0) {
                    fillActionIA(0);
                    fillResult(0);
                    fillRedYellow(3);
                    nbCoups = 0;
                }
            }
        }
    }

    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == btn1 && this.nbAllu - 1 >= 0) {
            this.nbAllu = this.nbAllu - 1;
            fillHowSticks();
            this.Result.setText("");
            if (this.nbAllu == 0){
                fillResult(1);
                fillActionIA(1);
                fillRedYellow(-1);
            } else if (this.nbAllu > 0) {
                fillActionIA(2);
                actionIA();
            }
        }
        if (e.getSource() == btn2 && this.nbAllu - 2 >= 0) {
            this.nbAllu -=2;
            fillHowSticks();
            this.Result.setText("");
            if (this.nbAllu == 0) {
                fillResult(1);
                fillActionIA(1);
                fillRedYellow(-1);
            } else if (this.nbAllu > 0) {
                fillActionIA(2);
                actionIA();
            }
        }
        if (e.getSource() == btn3){
            this.nbAllu = 8;
            fillHowSticks();
            fillRedYellow(0);
            this.Result.setText("");
            this.ActionsIA.setText("");
            this.ActionsIA2.setText("");
        }
        if (e.getSource() == btn4){
            this.nbAllu = 8;
            fillHowSticks();
            init();
            this.Result.setText("");
            this.ActionsIA.setText("");
        }
    }
}
