package com.superlamer.weatherapp.City;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.stream.JsonReader;
import com.superlamer.weatherapp.Logger.Log;

public class CityParser {
	

	/**
	 * Finds a city in file containing a list of cities
	 * @param cityName The City to search for
	 * @param file The file location
	 * @return City object
	 * @throws IOException
	 */
	public static City findCity(String cityName, File file) throws IOException {
			City tempCity = null;
			
			try (InputStream stream = new FileInputStream(file);
				 JsonReader reader = new JsonReader(new InputStreamReader(stream, "UTF-8"));) {
				
				Gson gson = new GsonBuilder().create();
				
				// Read file in stream mode
				reader.beginArray();
				
				while (reader.hasNext()) {
					tempCity = gson.fromJson(reader, City.class);
					
					if (tempCity.getName().equals(cityName)) {
						Log.log().info("Found city: " + tempCity.toString());
						return tempCity;
					}
				}
				
			} catch (Exception e) {
				Log.log().error(e.getMessage());
			}
			
			return tempCity;
	}
}
