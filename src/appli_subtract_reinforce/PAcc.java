package appli_subtract_reinforce;
import javax.swing.*;

public class PAcc  {

    public static void main(String[] args) {
        new PAcc();
    }
    public PAcc(){
        var f = new JFrame("Une IA ayant appris un algorithme d'apprentissage renforce");
        var tb = new JTabbedPane();
        f.setContentPane(tb);
        tb.addTab("Jeu utilise", new PanelExplications());
        tb.addTab("C'est quoi un apprentissage par renforcement ?", new PanelApprentissage());
        tb.addTab("Interactions", new PanelInteractif());
        tb.addTab("Une IA qui s'adapte a plusieurs parametres", new FenetrePrincipale());
        f.setSize(1400,700);
        f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        f.setVisible(true);
    }
}