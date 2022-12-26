package appli_subtract_reinforce;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class PanelInteractif extends JPanel {

    private int rest=8;

    public int id;

    public PanelInteractif(){
        JLabel label1 = new JLabel("Interactions avec une IA ayant appris via un apprentissage renforce le jeu de Nim");
        JLabel label2 = new JLabel("Choisissez de prendre soit 1 baton soit 2 batons");

        JButton btn1 = new JButton("1");
        JButton btn2 = new JButton("2");

        label1.setFont(new Font("Serif", Font.PLAIN, 24));
        label2.setFont(new Font("Serif", Font.PLAIN, 14));

        setLayout(new GridBagLayout());
        GridBagConstraints cont = new GridBagConstraints();
        cont.fill = GridBagConstraints.BOTH;
        cont.gridx = 0;
        cont.gridy = 0;
        cont.gridheight = 1;
        add(label1, cont);

        cont.gridx = 0;
        cont.gridy = 2;
        cont.gridheight = 1;
        add(label2, cont);

        cont.gridx = 0;
        cont.gridy = 4;
        cont.gridheight = 1;
        add(btn1, cont);

        cont.gridx = 1;
        cont.gridy = 4;
        cont.gridheight = 1;
        add(btn2, cont);

        id = rest;

        btn1.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                id = restants(1);
            }
        });

        btn2.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                id = restants(2);
            }
        });

        JLabel label5 = new JLabel("Il reste " + Integer.toString(rest) + " batons");

        cont.gridx = 5;
        cont.gridy = 0;
        cont.gridheight = 1;
        add(label5, cont);
    }



    public int restants(int i){
        if (rest -i >=0)
            rest = rest - i;
        return rest;
    }
}
