package com.superlamer.weatherapp.City;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.file.Files;

import org.apache.commons.io.FileUtils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.stream.JsonReader;
import com.superlamer.weatherapp.Logger.Log;

public class JSONParser {
	
	// Check if the file exists
	// if the file exists
	// parse it and search for first occurance of the city name

	public static String findCity(String city, File file) throws IOException {
			InputStream stream = FileUtils.openInputStream(file);
			JsonReader reader = new JsonReader(new InputStreamReader(stream, "UTF-8"));
			Gson gson = new GsonBuilder().create();
			
			// Read file in stream mode
			reader.beginArray();
			while (reader.hasNext()) {
				City city1 = gson.fromJson(reader, City.class);
				if (city1.getName().equals(city)) {
					Log.log().info("Found city: " + city);
				}
				break;
			}
			
			return city;
	}
	

}
