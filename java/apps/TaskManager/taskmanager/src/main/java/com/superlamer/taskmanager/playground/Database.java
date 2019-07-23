package com.superlamer.taskmanager.playground;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Database {
	
	private static Database instance;
	private Connection myConn;
	private String url = "jdbc:mysql://127.0.0.1:3306/taskdb?serverTimezone=UTC";
	private String user = "root";
	private String password = "rado";
	
	public Database () { 	
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
	
	private static List<Tasks> convertResultSetToList(ResultSet rs) {
		List<Tasks> tasks = new ArrayList<Tasks>();

		try {
			while (rs.next()) {
				tasks.add(new Tasks(rs.getString("tasks"),
									rs.getInt("time"),
									rs.getDate("date"),
									rs.getBoolean("completed")
						));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return tasks;
	}
	
	
	public void addRecordToDB(Tasks task) {
		Statement statement = null;
		
		try {
			statement = myConn.createStatement();
			String sqlUpdate = String.format("INSERT INTO task " +  
			"VALUES (%s, %s, %t, %b)", 
			task.getTask(),
			task.getDuration(),
			task.getDate(),
			task.getCompleted());
			
			statement.executeUpdate(sqlUpdate);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public void removeRecordFromDB(Tasks task) {
		Statement statement = null;
		
		try {
			statement = myConn.createStatement();
			String sqlUpdate = String.format("DELETE FROM task where task = VALUES (%s, %s, %t, %b)",
					task.getTask(),
					task.getDuration(),
					task.getDate(),
					task.getCompleted());
			
			statement.executeUpdate(sqlUpdate);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
		
	public void disconnectFromDB() {
		if (myConn != null) {
			try {
				myConn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
	
	public List<Tasks> queryRecordsByID(String id) { 
		List<Tasks> tasks = convertResultSetToList(runQuery("SELECT * FROM task WHERE id = " + id));
		
		return tasks;
	} 
	
	public List<Tasks> queryRecordsByTaskName(String taskName) {
		List<Tasks> tasks = convertResultSetToList(runQuery("SELECT * FROM task WHERE tasks = " + taskName));
		
		return tasks;
	}
	
	public List<Tasks> queryRecordsByTime(int time, int minTime, int maxTime) { 
		List<Tasks> tasks = convertResultSetToList(runQuery("SELECT * FROM task WHERE time <= " + maxTime + " AND time => " + minTime));
		
		return tasks;
	}
	
	public List<Tasks> queryRecordsByDate(Date date) { 
		List<Tasks> tasks = convertResultSetToList(runQuery("SELECT * FROM task WHERE (cast [date] as date) = " + date));
		
		return tasks;
	}
	
	public List<Tasks> queryRecordsByCompletionStatus(boolean completionStatus) {
		List<Tasks> tasks = convertResultSetToList(runQuery("SELECT * FROM task WHERE completed = " + completionStatus));
		
		return tasks;
	}
	
	public void displayRecordsToConsole(ResultSet rs) { 
		try {
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
		} catch (SQLException sqle) {
			sqle.printStackTrace();
		}
	}
	
	public ResultSet runQuery(String query) {
		
		Statement statement = null;
		ResultSet rs = null;
		try {
			statement = myConn.createStatement();
			rs = statement.executeQuery(query);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		 
		return rs;
	}
	
	public void getAllDataFromDB() {
        

		ResultSet rs = runQuery("SELECT * FROM tasks");
		displayRecordsToConsole(rs);
 
	}
	
	
	
//	public void getAllDataFromDB() {
//		String url = "jdbc:mysql://127.0.0.1:3306/taskdb?serverTimezone=UTC";
//    	String user = "root";
//    	String password = "rado";
//        try (Connection myConn = DriverManager.getConnection(url, user, password);) {
//        	Statement myStatement = myConn.createStatement();
//        	String sql = "SELECT * FROM tasks";
//        	
//        	ResultSet rs = myStatement.executeQuery(sql);
//        	ResultSetMetaData rsmd = rs.getMetaData();
//        	int columnCount = rsmd.getColumnCount();
//        	ArrayList<String> columnNames = new ArrayList<String>();
//        	
//        	// Column count starts from 1
//        	for (int i = 1; i <= columnCount; i++) {
//        		String name = rsmd.getColumnName(i);
//        		columnNames.add(name);
//        	}
//        	
//        	while (rs.next()) {
//        		for (String column : columnNames) {
//					System.out.println(column + ": " + rs.getString(column));
//				}
//        	}
//        	
//		} catch (SQLException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//	}


}
