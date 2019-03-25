package com.superlamer.weatherapp;

import java.net.MalformedURLException;
import java.net.URL;

import com.superlamer.weatherapp.City.ListDownloader;


/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args ) throws MalformedURLException
    {
    	
    	ListDownloader download = new ListDownloader();
    	String url = "https://raw.githubusercontent.com/superklamer/code_mashup/master/java/apps/city.list.json";
    	download.downloadFile(new URL(url));
        
    }
}
