package com.superlamer.weatherapp;

import java.io.File;
import java.io.IOException;

import org.bson.Document;

import com.superlamer.weatherapp.City.City;
import com.superlamer.weatherapp.City.JSONParser;
import com.superlamer.weatherapp.City.ListDownloader;
import com.superlamer.weatherapp.DB.Database;
import com.superlamer.weatherapp.Logger.Log;
import com.superlamer.weatherapp.weather.WeatherQuery;


/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args ) throws IOException
    {
    	
//    	ListDownloader download = new ListDownloader();
//    	String url = "https://raw.githubusercontent.com/superklamer/code_mashup/master/java/apps/city.list.json";
//    	//download.downloadFile(new URL(url));
//        
//    	JSONParser jp = new JSONParser();
//    	City sd = jp.findCity("Murava", new File("/tmp/city.list.json"));
//    	
//    	Database monDb = new Database();
//    	Document doc = monDb.toDocument(sd);
//    	boolean added = monDb.addNewDBEntry(doc);
//    	Log.log().info(added);

    	WeatherQuery w = new WeatherQuery();
    	w.queryWeather();
    	
    }
}
