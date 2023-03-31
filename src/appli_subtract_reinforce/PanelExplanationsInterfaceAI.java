package appli_subtract_reinforce;

import javax.swing.*;

/**
 * Author Milena
 * Onglet decrivant le contenu des casiers
 */

public class PanelExplanationsInterfaceAI extends JPanel {

    public PanelExplanationsInterfaceAI(String content){
        content = content.replace("<img src=\"./images/SchemaCasier.png\">",
        "<img src=\"" + PanelExplanations.class.getResource("fichiers/images/SchemaCasier.png") + "\">");

        JLabel lbl = new JLabel(content);
        add(lbl);
    }
}
