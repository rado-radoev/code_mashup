package com.superlamer.taskmanager.playground;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

public class Database {
	
	private static Database instance;
	private Connection myConn;
	
	public Database () {
		String url = "jdbc:mysql://127.0.0.1:3306/taskdb?serverTimezone=UTC";
    	String user = "root";
    	String password = "rado";
    	
    	try {
			myConn = DriverManager.getConnection(url, user, password);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public static Database getInstance() {
		if (instance == null) 
			instance = new Database();
		
		return instance;
	}
	
	public Connection connectToDB() {
		Database.getInstance();
		return myConn;
	}
	
	public void getSingleRecordFromDB() { }
	
	public void addRecordToDB() { }
	
	public void addMultipleRecordsToDB() { }
	
	public void removeRecordFromDB() { }
	
	public void removeMultiplRecordsFromDB() { }
	
	public void disconnectFromDB() { }
	
	public void queryRecordsByID() { }
	
	public void queryRecordsByTaskName() { }
	
	public void queryRecordsByTime() { }
	
	public void queryRecordsByDate() { }
	
	public void queryRecordsByCompletionStatus() { }
	
	public void displayRecordsToConsole() {
		
	} 
	
	public void getAllDataFromDB() {
		String url = "jdbc:mysql://127.0.0.1:3306/taskdb?serverTimezone=UTC";
    	String user = "root";
    	String password = "rado";
        try (Connection myConn = DriverManager.getConnection(url, user, password);) {
        	Statement myStatement = myConn.createStatement();
        	String sql = "SELECT * FROM tasks";
        	
        	ResultSet rs = myStatement.executeQuery(sql);
        	ResultSetMetaData rsmd = rs.getMetaData();
        	int columnCount = rsmd.getColumnCount();
        	ArrayList<String> columnNames = new ArrayList<String>();
        	
        	// Column count starts from 1
        	for (int i = 1; i <= columnCount; i++) {
        		String name = rsmd.getColumnName(i);
        		columnNames.add(name);
        	}
        	
        	while (rs.next()) {
        		for (String column : columnNames) {
					System.out.println(column + ": " + rs.getString(column));
				}
        	}
        	
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
