package appli_subtract_reinforce;

import javax.swing.*;

/**
 * Author Milena
 * Onglet expliquant ce qu'est un apprentissage par renforcement de maniere generale
 */

public class PanelLearning extends JPanel {

    public PanelLearning(String InfoReinforce){
        JLabel lbl = new JLabel(InfoReinforce);
        add(lbl);
    }
}