package com.superlamer.weatherapp;

import org.apache.commons.lang3.SystemUtils;

import com.superlamer.weatherapp.Logger.Log;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {
    	
    	Log.log().info(SystemUtils.OS_NAME);
        
    }
}
