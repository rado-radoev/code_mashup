package com.superlamer.taskmanager;

import com.superlamer.taskmanager.playground.Database;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {
    	Database db = new Database();
    	db.getAllDataFromDB();
    }
}