package com.superlamer.taskmanager;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

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
//    	db.displayRecordsToConsole(db.getAllDataFromDB());
    	DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
//    	db.displayRecordsToConsole(db.queryRecordsByCompletionStatus(false));
//    	db.displayRecordsToConsole(db.queryRecordsByID("1"));
    	db.displayRecordsToConsole(db.queryRecordsByDate("04/03/2011"));
    }
}