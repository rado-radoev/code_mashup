package com.superlamer.taskmanager.playground;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.sql.Date;
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
				tasks.add(new Tasks(rs.getString("Tasks"),
									rs.getLong("Duration"),
									rs.getLong("Date"),
									rs.getBoolean("Completed")
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
		List<Tasks> tasks = convertResultSetToList(runQuery("SELECT * FROM tasks WHERE id = " + id));
		
		return tasks;
	} 
	
	public List<Tasks> queryRecordsByTaskName(String taskName) {
		List<Tasks> tasks = convertResultSetToList(runQuery("SELECT * FROM tasks WHERE tasks = " + taskName));
		
		return tasks;
	}
	
	public List<Tasks> queryRecordsByTime(int minTime, int maxTime) { 
		List<Tasks> tasks = convertResultSetToList(runQuery("SELECT * FROM tasks WHERE time BETWEEN " + minTime + " AND " + maxTime));
		
		return tasks;
	}
	
	public List<Tasks> queryRecordsByDate(String date) { 
		SimpleDateFormat df = new SimpleDateFormat("MM-dd-yyyy");
		Date d = null;
		try {
			d = df.parse(date);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		long dLong = d.getTime();
		java.sql.Date sqlDate = new java.sql.Date(dLong);
		
		List<Tasks> tasks = convertResultSetToList(runQuery("SELECT * FROM tasks WHERE date = " + sqlDate));
		
		return tasks;
	}
	
	public List<Tasks> queryRecordsByCompletionStatus(boolean completionStatus) {
		List<Tasks> tasks = convertResultSetToList(runQuery("SELECT * FROM tasks WHERE completed = " + String.valueOf(completionStatus)));
		
		return tasks;
	}
	
	public void displayRecordsToConsole(List<Tasks> tasks) { 
		for (Tasks task : tasks) {
			System.out.println(task);
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
	
	public List<Tasks> getAllDataFromDB() {
		List<Tasks> tasks = convertResultSetToList(runQuery("SELECT * FROM tasks"));
		return tasks;
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
