package com.superlamer.taskmanager.playground;

import java.awt.BorderLayout;
import java.awt.Component;
import java.awt.Container;
import java.awt.Dimension;
import java.awt.FlowLayout;
import java.awt.GridLayout;
import java.awt.TextField;
import java.awt.Toolkit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.swing.Box;
import javax.swing.BoxLayout;
import javax.swing.GroupLayout;
import javax.swing.JCheckBox;
import javax.swing.JComboBox;
import javax.swing.JComponent;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JScrollBar;
import javax.swing.JScrollPane;
import javax.swing.JSeparator;
import javax.swing.JTextArea;
import javax.swing.JTextField;
import javax.swing.SpringLayout;
import javax.swing.SwingConstants;
import javax.swing.SwingUtilities;

public class View extends JFrame {
	
	public View(String name) {
		super(name);
		setResizable(true);
	}
	
	private void addTasksToPane(final Container pane) {
		JPanel taskListPane = new JPanel();
		
		GridLayout spr = new GridLayout(0, 4);
		taskListPane.setLayout(spr);
			
		JScrollPane panel = new JScrollPane(taskListPane);
		String[] comboBoxValues = { "yes", "no"};
		
		for (int i = 0; i <= 100; i++) {
			Tasks task = new Tasks("Test Task " + i, i, new Date(), true);
				
			JTextField taskField = new JTextField();
			JTextField durationField = new JTextField();
			JTextField dateField = new JTextField();
			JComboBox completedBox = new JComboBox(comboBoxValues);

			taskField.setText(task.getTask());
			durationField.setText(Integer.toString(task.getDuration()));
			dateField.setText(task.getDate().toString());
			completedBox.setSelectedIndex(task.getCompleted() ? 0 : 1);

			taskListPane.add(taskField);
			taskListPane.add(durationField);
			taskListPane.add(dateField);
			taskListPane.add(completedBox);
		}


		pane.add(panel, BorderLayout.CENTER);
	}
	
	private void addComponentsToPane(final Container pane) {
	
		JPanel headers = new JPanel();
				
//		GroupLayout groupLayout = new GroupLayout(headers);
//		groupLayout.setAutoCreateContainerGaps(true);
//		groupLayout.setAutoCreateGaps(true);
		
		JLabel taskLabel = new JLabel("Task");
		JLabel timeLabel = new JLabel("Time");
		JLabel dateLabel = new JLabel("Date");
		JLabel completedLabel = new JLabel("Completed");
		
		taskLabel.setHorizontalAlignment(SwingConstants.CENTER);
		timeLabel.setHorizontalAlignment(SwingConstants.CENTER);
		dateLabel.setHorizontalAlignment(SwingConstants.CENTER);
		completedLabel.setHorizontalAlignment(SwingConstants.CENTER);
		
		headers.setLayout(new GridLayout(1, 4, 20, 0));
		headers.add(taskLabel);
		headers.add(timeLabel);
		headers.add(dateLabel);
		headers.add(completedLabel);
				
		pane.add(headers, BorderLayout.NORTH);
		pane.add(new JSeparator(SwingConstants.HORIZONTAL));
	}
	

	private static void createAndShowGUI() {
		View frame = new View("Tasks app");
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		
		frame.setVisible(true);
		
		Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();
		frame.setSize(430, screenSize.height);
		frame.addComponentsToPane(frame.getContentPane());
		frame.addTasksToPane(frame.getContentPane());
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
