package com.superlamer.weatherapp;

import java.io.File;
import java.io.IOException;
import java.util.concurrent.ExecutionException;

import org.bson.Document;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.stream.JsonReader;
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
    public static void main( String[] args ) throws IOException, InterruptedException, ExecutionException
    {
    	
    	//ListDownloader download = new ListDownloader();
    	//String url = "https://raw.githubusercontent.com/superklamer/code_mashup/master/java/apps/city.list.json";
    	//download.downloadFile(new URL(url));
        
    	JSONParser jp = new JSONParser();
    	City sd = jp.findCity("Murava", new File("/tmp/city.list.json"));
    	
    	Database monDb = new Database();
    	//Document doc = monDb.toDocument(sd);
    	//boolean added = monDb.addNewDBEntry(doc);
    	//Log.log().info(added);

    	WeatherQuery w = new WeatherQuery();
    	String js =  w.queryWeather();
    	System.out.println(js);
    	WeatherQuery wet = new Gson().fromJson(js, WeatherQuery.class);
    	System.out.println(wet);
//    	System.out.println(js);
    	
    	Document wetDoc = new Document("citi", monDb.toDocument(sd))
    							.append("weter", monDb.toDocument(wet));
    	boolean weatherinfoAdded = monDb.addNewDBEntry(wetDoc);
    	System.out.println(weatherinfoAdded);
    	
    	
    }
}
