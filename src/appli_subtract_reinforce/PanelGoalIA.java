package appli_subtract_reinforce;

import javax.swing.*;

/**
 * Author Milena
 * Onglet expliquant comment l'IA maximise ses gains
 */
public class PanelGoalIA extends JPanel {

    public PanelGoalIA(String content){
        content = content.replace("<img src= \"./images/plusieurs.png\">",
                "<img src=\"" + PanelExplications.class.getResource("fichiers/images/plusieurs.png") + "\">");
        JLabel lbl = new JLabel(content);
        add(lbl);
    }
}
