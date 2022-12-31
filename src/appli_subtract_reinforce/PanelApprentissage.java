package appli_subtract_reinforce;

import javax.swing.*;

public class PanelApprentissage extends JPanel {

    public PanelApprentissage(String InfoReinforce){
        JLabel lbl = new JLabel(InfoReinforce);
        add(lbl);
    }
}