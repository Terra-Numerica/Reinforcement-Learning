package appli_subtract_reinforce;
import javax.swing.*;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class PAcc  {

    public static void main(String[] args) throws IOException {
        Path currentRelativePath = Paths.get("");
        String s = currentRelativePath.toAbsolutePath().toString();
        Path filename1 = Path.of(s + "/src/appli_subtract_reinforce/fichiers/ExplicationsJeu.html");
        Path filename2 = Path.of(s + "/src/appli_subtract_reinforce/fichiers/ApprentissageRenforce.html");
        String contentGame = Files.readString(filename1);
        String contentReinforce = Files.readString(filename2);
        new PAcc(contentGame ,contentReinforce);
    }
    public PAcc(String InfoGame,String InfoReinforce){
        var f = new JFrame("Une IA ayant appris un algorithme d'apprentissage renforcé");
        var tb = new JTabbedPane();
        f.setContentPane(tb);
        tb.addTab("Jeu utilisé", new PanelExplications(InfoGame));
        tb.addTab("C'est quoi un apprentissage par renforcement ?", new PanelApprentissage(InfoReinforce));
        //tb.addTab("Actions faites par l'IA afin de gagner le jeu", new PanelIAActionsToWin());
        tb.addTab("Interactions", new PanelInteractif());
        tb.addTab("Une IA qui s'adapte à plusieurs paramètres", new FenetrePrincipale());
        f.setSize(1200,700);
        f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        f.setVisible(true);
    }
}