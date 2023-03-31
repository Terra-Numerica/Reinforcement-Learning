package appli_subtract_reinforce;

import javax.swing.*;

/**
 * Author Milena
 * Onglet decrivant les parametres utilises
 */

public class PanelExplanationsInterfaceAINext extends JPanel {

    public PanelExplanationsInterfaceAINext(String content){
        content = content.replace("<img src=\"./images/Coups.png\">",
                "<img src=\"" + PanelExplanations.class.getResource("fichiers/images/Coups.png") + "\">");
        content = content.replace("<img src=\"./images/adversaire.png\">",
                "<img src=\"" + PanelExplanations.class.getResource("fichiers/images/adversaire.png") + "\">");
        content = content.replace("<img src=\"./images/recompense.png\">",
                "<img src=\"" + PanelExplanations.class.getResource("fichiers/images/recompense.png") + "\">");
        content = content.replace("<img src=\"./images/vitesse.png\">",
                "<img src=\"" + PanelExplanations.class.getResource("fichiers/images/vitesse.png") + "\">");
        content = content.replace("<img src=\"./images/amorcer.png\">",
                "<img src=\"" + PanelExplanations.class.getResource("fichiers/images/amorcer.png") + "\">");
        JLabel lbl = new JLabel(content);
        add(lbl);
    }
}