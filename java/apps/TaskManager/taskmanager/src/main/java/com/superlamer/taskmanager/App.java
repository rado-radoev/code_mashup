package com.superlamer.taskmanager;

import java.sql.Connection;
import java.sql.DriverManager;
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
    	String url = "jdbc:mysql://localhost:3306/taskdb?autoReconnect=true&useSSL=false";
    	String user = "root";
    	String password = "rado";
        try (Connection myConn = DriverManager.getConnection(url, user, password);) {
        	Statement myStatement = myConn.createStatement();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }
}
