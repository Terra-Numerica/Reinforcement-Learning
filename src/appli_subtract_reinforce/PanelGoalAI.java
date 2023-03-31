package appli_subtract_reinforce;

import javax.swing.*;

/**
 * Author Milena
 * Onglet expliquant comment l'IA maximise ses gains
 */
public class PanelGoalAI extends JPanel {

    public PanelGoalAI(String content){
        content = content.replace("<img src= \"./images/plusieurs.png\">",
                "<img src=\"" + PanelExplanations.class.getResource("fichiers/images/plusieurs.png") + "\">");
        JLabel lbl = new JLabel(content);
        add(lbl);
    }
}
