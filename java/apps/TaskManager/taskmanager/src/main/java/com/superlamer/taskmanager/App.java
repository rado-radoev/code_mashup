package com.superlamer.taskmanager;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {
    	String url = "jdbc:mysql://127.0.0.1:3306/taskdb?serverTimezone=UTC";
    	String user = "root";
    	String password = "rado";
        try (Connection myConn = DriverManager.getConnection(url, user, password);) {
        	Statement myStatement = myConn.createStatement();
        	String sql = "SELECT * FROM tasks";
        	
        	ResultSet rs = myStatement.executeQuery(sql);
        	while (rs.next()) {
        		System.out.println(rs.getString("id"));
        		System.out.println(rs.getString("tasks"));
        		System.out.println(rs.getString("time"));
        		System.out.println(rs.getString("date"));
        		
        	}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }
}