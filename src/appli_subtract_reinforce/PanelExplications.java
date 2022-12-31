package appli_subtract_reinforce;

import javax.swing.*;


public class PanelExplications extends JPanel {

    public PanelExplications(String InfoGame){
        String fin = "</tr></table><br><p><font size=+1>Le joueur 2 a gagné.</font> </html>";

        String five = addAllImagesNeeded(5);
        String four = addAllImagesNeeded(4);
        String two = addAllImagesNeeded(2);
        String one = addAllImagesNeeded(1);
        JLabel lbl = new JLabel(InfoGame + "<tr>" + five + four + two + one +fin);
        add(lbl);
    }

    public String addAllImagesNeeded(int n){
        String images = "<th>";
        for (int i =0; i<n; i++){
            images += "<img src=\"" + PanelExplications.class.getResource("images/allu.png") + "\">";
        }
        images += "</th>";
        return images;
    }
}