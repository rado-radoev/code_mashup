package com.superlamer.weatherapp;

import java.io.File;
import java.io.IOException;

import com.superlamer.weatherapp.City.JSONParser;
import com.superlamer.weatherapp.City.ListDownloader;


/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args ) throws IOException
    {
    	
    	ListDownloader download = new ListDownloader();
    	String url = "https://raw.githubusercontent.com/superklamer/code_mashup/master/java/apps/city.list.json";
    	//download.downloadFile(new URL(url));
        
    	JSONParser jp = new JSONParser();
    	jp.findCity("Murava", new File("/tmp/city.list.json"));
    }
}
