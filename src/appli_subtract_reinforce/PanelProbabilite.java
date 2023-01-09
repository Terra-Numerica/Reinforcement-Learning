package appli_subtract_reinforce;

import javax.swing.*;

/**
 * Author Milena
 * Onglet expliquant comment les probabilites sont utilisees par l'IA afin de gagner au jeu de Nim
 */
public class PanelProbabilite extends JPanel {

    public PanelProbabilite(String content){
        content = content.replace("<img src = \"images/initial.png\">",
                "<img src=\"" + PanelExplications.class.getResource("fichiers/images/initial.png") + "\">" );
        content = content.replace("<img src=\"images/victoire.png\">",
                "<img src=\"" + PanelExplications.class.getResource("fichiers/images/victoire.png") + "\">");
        content = content.replace("<img src=\"images/defaite.png\">",
                "<img src=\"" + PanelExplications.class.getResource("fichiers/images/defaite.png") + "\">");
        content = content.replace("<img src=\"images/plusieurs.png\">",
                "<img src=\"" + PanelExplications.class.getResource("fichiers/images/plusieurs.png") + "\">");
        JLabel lbl = new JLabel(content);
        add(lbl);
    }
}
