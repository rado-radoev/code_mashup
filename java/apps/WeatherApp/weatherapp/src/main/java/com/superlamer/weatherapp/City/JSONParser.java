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

public class JSONParser {
	

	public static String findCity(String city, File file) throws IOException {
			try (InputStream stream = new FileInputStream(file);
				 JsonReader reader = new JsonReader(new InputStreamReader(stream, "UTF-8"));
			) {
				Gson gson = new GsonBuilder().create();
				
				// Read file in stream mode
				reader.beginArray();
				
				while (reader.hasNext()) {
					City city1 = gson.fromJson(reader, City.class);
					if (city1.getName().equals(city)) {
						Log.log().info("Found city: " + city1.toString());
						break;
					}
				}
			} catch (Exception e) {
				Log.log().error(e.getMessage());
			}
			
			return city;
	}
}
