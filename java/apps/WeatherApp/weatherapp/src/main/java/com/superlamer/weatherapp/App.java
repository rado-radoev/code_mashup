package com.superlamer.weatherapp;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.concurrent.ExecutionException;


import com.superlamer.weatherapp.City.FileDownloader;
import com.superlamer.weatherapp.python.PythonEntryPoint;

import py4j.GatewayServer;


public class App 
{
    public static void main( String[] args ) throws IOException, InterruptedException, ExecutionException
    {
    	
    	FileDownloader download = new FileDownloader();
    	String url = "https://raw.githubusercontent.com/superklamer/code_mashup/master/java/apps/city.list.json";
    	try {
			download.downloadFile(new URL(url));
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
 	
//    	Long id = 5391811L;
//    	City sd = new CityParser().findCityById(id, new File("/tmp/city.list.json"));
//    	City sd = CityParser.findCityByName("San Diego", new File("/tmp/city.list.json"));
    	
//    	Database monDb = new Database();
    	//Document doc = monDb.toDocument(sd);
    	//boolean added = monDb.addNewDBEntry(doc);
    	//Log.log().info(added);

    	
//    	String weatherJson =  new WeatherQuery().queryWeatherById(id);
//    	System.out.println(weatherJson);
//    	Weather weather = new Gson().fromJson(weatherJson, Weather.class);
//    	System.out.println(weather);
//    	System.out.println(js);
//    	
//    	Document wetDoc = new Document("city", sd.toDocument())
//    							.append("weather", weather.toDocument());
//    	boolean weatherinfoAdded = monDb.addNewDBEntry(wetDoc);
//    	System.out.println(weatherinfoAdded);
    	
//    	Document retrievedDoc = monDb.findFirstDocument();
//    	Log.log().info(monDb.convertDocumentToJSON(retrievedDoc));
    	
    	GatewayServer gatewayServer = new GatewayServer(new PythonEntryPoint());
    	Runnable runnable = () -> { gatewayServer.start();
    								System.out.println("Gateway server started"); };
    	Thread thread = new Thread(runnable);
    	thread.start();
    }
}
