package appli_subtract_reinforce;

import javax.swing.*;
import java.nio.file.*;
import java.io.*;

public class PanelExplications extends JPanel {

    public PanelExplications(){
        JLabel lbl = new JLabel("<html><head><style type=text/css>table, th, td {border:1px solid black;}</style><body>" +
                "<font size=+7><font color=red> Règles du jeu de Nim utilisé</font></font>" +
                "<p><font size=+1>Au début, un certain nombre d'allumettes, noté n, est disponible.</font>" +
                "<p><font size=+1>Les joueurs retirent tour à tour des allumettes.</font>" +
                "<p><font size=+1>Le nombre d'allumettes qu'un joueur peut retirer à la fois doit etre compris entre 1 et d (d inférieur a n),<br>d étant la valeur maximale fixée pour le jeu en cours.</font>" +
                "<p><font size=+1>Le gagnant est le joueur ayant retiré la derniere allumette.</font>" +
                "<br><br><p><font size=+1>Illustrons à travers un exemple</font>" +
                "<p><font size=+1>Au debut 5 allumettes sont disponibles.</font>" +
                "<p><font size=+1>A chaque tour, chaque joueur peut retirer soit 1 soit 2 allumettes.</font>" +
                "<p><table style=width:100%><font size=+1><tr><th>5 allumetes disponibles.<br>n = 5</th><th>Le joueur 1 retire 1 allumette.<br>Il reste 4 allumettes.</th><th>Le joueur 2 retire 2 allumettes.<br>Il reste 2 allumettes.</th><th>Le joueur 1 retire 1 allumette.<br>Il reste 1 allumette.</th><th>Le joueur 2 retire 1 allumette.<br>Il reste 0 allumette.</th></tr></font>" +
                "<tr><th><img src=\"" + PanelExplications.class.getResource("images/allu.png") + "\"><img src=\"" + PanelExplications.class.getResource("images/allu.png") + "\"><img src=\"" + PanelExplications.class.getResource("images/allu.png") + "\"><img src=\"" + PanelExplications.class.getResource("images/allu.png") + "\"><img src=\"" + PanelExplications.class.getResource("images/allu.png") + "\"></th>" +
                "<th><img src=\"" + PanelExplications.class.getResource("images/allu.png") + "\"><img src=\"" + PanelExplications.class.getResource("images/allu.png") + "\"><img src=\"" + PanelExplications.class.getResource("images/allu.png") + "\"><img src=\"" + PanelExplications.class.getResource("images/allu.png") + "\"></th><th>" +
                "<img src=\"" + PanelExplications.class.getResource("images/allu.png") + "\"><img src=\"" + PanelExplications.class.getResource("images/allu.png") + "\"></th>" +
                "<th><img src=\"" + PanelExplications.class.getResource("images/allu.png") + "\"></th></tr></table>" +
                "<p><font size=+1>Le joueur 2 a gagné.</font><html>"
        );
        add(lbl);
    }
}