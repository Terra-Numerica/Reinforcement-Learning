package appli_subtract_reinforce;

import javax.swing.*;

/**
 * Author Milena
 * Onglet expliquant les regles utilisees dans le jeu de Nim
 */
public class PanelExplications extends JPanel {

    public PanelExplications(String InfoGame){
        InfoGame = InfoGame.replace("<img src= \"images/allu.png\">",
                "<img src=\"" + PanelExplications.class.getResource("fichiers/images/allu.png") + "\">");

        JLabel lbl = new JLabel(InfoGame);
        add(lbl);
    }
}