package com.superlamer.taskmanager.playground;

import java.awt.BorderLayout;
import java.awt.Component;
import java.awt.Container;
import java.awt.Dimension;
import java.awt.FlowLayout;
import java.awt.GridLayout;
import java.awt.Toolkit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.swing.Box;
import javax.swing.GroupLayout;
import javax.swing.JCheckBox;
import javax.swing.JComponent;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JSeparator;
import javax.swing.JTextField;
import javax.swing.SwingConstants;
import javax.swing.SwingUtilities;

public class View extends JFrame {
	
	public View(String name) {
		super(name);
		setResizable(true);
	}
	
	private void addTasksToPane(final Container pane) {
		JPanel taskListPane = new JPanel();
		
		GridLayout gr = new GridLayout();
		taskListPane.setLayout(gr);
		
		Tasks task = new Tasks("Test Task", 86400, new Date(), false);
		
		JCheckBox checkBox = new JCheckBox();
		JTextField taskField = new JTextField(task.getTask());
		JTextField durationField = new JTextField(task.getDuration());
		JTextField dateField = new JTextField(task.getDate().toString());
		JTextField completedField = new JTextField(task.getCompleted().toString());
		
		if (task.getCompleted()) {
			checkBox.setSelected(true);
		}
		
		List<JComponent> taskComponents = new ArrayList<JComponent>();
		taskComponents.add(checkBox);
		taskComponents.add(taskField);
		taskComponents.add(durationField);
		taskComponents.add(dateField);
		taskComponents.add(completedField);
		
		for (JComponent comp : taskComponents) {
			taskListPane.add(comp);
		}
		
		pane.add(taskListPane, BorderLayout.NORTH);
	}
	
	private void addComponentsToPane(final Container pane) {
	
		JPanel headers = new JPanel();
		
		GroupLayout groupLayout = new GroupLayout(headers);
		groupLayout.setAutoCreateContainerGaps(true);
		groupLayout.setAutoCreateGaps(true);
		
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
		
		GridLayout fl = new GridLayout(2, 1);
		frame.setLayout(fl);
		
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		
		frame.setVisible(true);
		
		Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();
		frame.setSize(400, screenSize.height);
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
