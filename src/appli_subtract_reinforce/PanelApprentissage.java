package appli_subtract_reinforce;

import javax.swing.*;

/**
 * Author Milena
 * Onglet expliquant ce qu'est un apprentissage par renforcement de maniere generale
 */

public class PanelApprentissage extends JPanel {

    public PanelApprentissage(String InfoReinforce){
        JLabel lbl = new JLabel(InfoReinforce);
        add(lbl);
    }
}