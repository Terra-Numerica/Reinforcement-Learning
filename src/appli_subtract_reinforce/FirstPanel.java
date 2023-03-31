package appli_subtract_reinforce;
import javax.swing.*;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;


/**
 * Author Milena
 * Fichier ou se trouve le main
 * Recuperation du contenu des fichiers html et mise en place des onglets
 */

public class FirstPanel  {

    public static void main(String[] args) throws IOException {
        Path currentRelativePath = Paths.get("");
        String s = currentRelativePath.toAbsolutePath().toString();
        Path filename1 = Path.of(s + "/src/appli_subtract_reinforce/fichiers/ExplicationsJeu.html");
        Path filename2 = Path.of(s + "/src/appli_subtract_reinforce/fichiers/ApprentissageRenforce.html");
        Path filename3 = Path.of(s + "/src/appli_subtract_reinforce/fichiers/PanelExplicationInterfaceIA.html");
        Path filename4 = Path.of(s + "/src/appli_subtract_reinforce/fichiers/PanelExplicationInterfaceIANext.html");
        Path filename5 = Path.of(s + "/src/appli_subtract_reinforce/fichiers/Interaction.html");
        Path filename6 = Path.of(s + "/src/appli_subtract_reinforce/fichiers/Probabilite.html");
        Path filename7 = Path.of(s + "/src/appli_subtract_reinforce/fichiers/ButIA.html");

        String contentGame = Files.readString(filename1);
        String contentReinforce = Files.readString(filename2);
        String contentExplicationInterface = Files.readString(filename3);
        String contentExplicationInterfaceNext = Files.readString(filename4);
        String contentInteraction = Files.readString(filename5);
        String contentProbability = Files.readString(filename6);
        String contentGoal = Files.readString(filename7);

        new FirstPanel(contentGame ,contentReinforce, contentExplicationInterface, contentExplicationInterfaceNext,
                contentInteraction, contentProbability, contentGoal);
    }

    public FirstPanel(String InfoGame,String InfoReinforce, String contentExplicationInterface,
                String contentExplicationInterfaceNext, String contentInteraction , String contentProbability,
                String contentGoal){

        var f = new JFrame("Une IA ayant appris un algorithme d'apprentissage par renforcement");
        var tb = new JTabbedPane();
        f.setContentPane(tb);
        tb.addTab("Règles appliquées du jeu de Nim", new PanelExplanations(InfoGame));
        tb.addTab("C'est quoi un apprentissage par renforcement ?", new PanelLearning(InfoReinforce));
        tb.addTab("Les probabilités", new PanelProbabilities(contentProbability));
        tb.addTab("But de l'IA", new PanelGoalAI(contentGoal));
        tb.addTab("Mode interactif", new PanelInteractions(contentInteraction));
        tb.addTab("Description des paramètres de la simulation", new PanelExplanationsInterfaceAI(contentExplicationInterface));
        tb.addTab("Suite", new PanelExplanationsInterfaceAINext(contentExplicationInterfaceNext));
        tb.addTab("Une IA qui s'adapte à plusieurs paramètres", new MainWindow());
        f.setSize(1200,700);
        f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        f.setVisible(true);
    }
}