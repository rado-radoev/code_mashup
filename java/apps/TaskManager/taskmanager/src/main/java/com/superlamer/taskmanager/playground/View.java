package com.superlamer.taskmanager.playground;

import java.awt.BorderLayout;
import java.awt.Component;
import java.awt.Container;
import java.awt.Dimension;
import java.awt.GridLayout;
import java.awt.Toolkit;

import javax.swing.GroupLayout;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.SwingUtilities;

public class View extends JFrame {
	
	public View(String name) {
		super(name);
		setResizable(true);
	}
	
	private void addComponentsToPane(final Container pane) {
	
		JPanel headers = new JPanel();
//		headers.setLayout(new GridLayout(1, 4, 20, 0));
		
		
		GroupLayout groupLayout = new GroupLayout(headers);
		groupLayout.setAutoCreateContainerGaps(true);
		groupLayout.setAutoCreateGaps(true);
		
		GroupLayout.SequentialGroup hGroup = groupLayout.createSequentialGroup();
		hGroup
			.addComponent(new JLabel("Task"))
			.addComponent(new JLabel("Time"))
			.addComponent(new JLabel("Date"))
			.addComponent(new JLabel("Completed"));
		
		groupLayout.setHorizontalGroup(hGroup);
		
		pane.add(headers, BorderLayout.NORTH);
	}
	

	private static void createAndShowGUI() {
		View frame = new View("Tasks app");
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		
		frame.setVisible(true);
		
		Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();
		frame.setSize(400, screenSize.height);
		frame.addComponentsToPane(frame.getContentPane());
	}
	
	public static void main(String[] args) {
		SwingUtilities.invokeLater(new Runnable() {
			
			@Override
			public void run() {
				createAndShowGUI();
			}
		});
	}

}
