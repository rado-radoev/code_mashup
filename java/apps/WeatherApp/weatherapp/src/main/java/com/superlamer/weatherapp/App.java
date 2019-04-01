package com.superlamer.weatherapp;

import java.io.File;
import java.io.IOException;
import java.util.concurrent.ExecutionException;

import org.bson.Document;

import com.google.gson.Gson;
import com.superlamer.weatherapp.City.City;
import com.superlamer.weatherapp.City.CityParser;
import com.superlamer.weatherapp.DB.Database;
import com.superlamer.weatherapp.weather.Weather;
import com.superlamer.weatherapp.weather.WeatherQuery;




/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args ) throws IOException, InterruptedException, ExecutionException
    {
    	
//    	ListDownloader download = new ListDownloader();
//    	String url = "https://raw.githubusercontent.com/superklamer/code_mashup/master/java/apps/city.list.json";
//    	download.downloadFile(new URL(url));
//        	
    	Long id = 5391811L;
    	City sd = CityParser.findCityById(id, new File("/tmp/city.list.json"));
//    	City sd = CityParser.findCityByName("San Diego", new File("/tmp/city.list.json"));
    	
    	Database monDb = new Database();
    	//Document doc = monDb.toDocument(sd);
    	//boolean added = monDb.addNewDBEntry(doc);
    	//Log.log().info(added);

    	
    	String weatherJson =  WeatherQuery.queryWeatherByCity("San Diego");
    	System.out.println(weatherJson);
    	Weather weather = new Gson().fromJson(weatherJson, Weather.class);
    	System.out.println(weather);
//    	System.out.println(js);
    	
    	Document wetDoc = new Document("city", sd.toDocument())
    							.append("weather", weather.toDocument());
    	boolean weatherinfoAdded = monDb.addNewDBEntry(wetDoc);
    	System.out.println(weatherinfoAdded);
    }
}
