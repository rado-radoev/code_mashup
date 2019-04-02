package com.superlamer.weatherapp.City;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Optional;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonIOException;
import com.google.gson.JsonSyntaxException;
import com.google.gson.stream.JsonReader;
import com.superlamer.weatherapp.Logger.Log;

public class CityParser {
		
	/**
	 * Query the city list and return the city if found. If only City name is provided and
	 * multiple cities with the same name exist, only the first occurance will be returned.
	 * @param cityName The city name to search for
	 * @param country The country name to search for
	 * @param id The City Id as it appears in the list
	 * @param file The city list file location
	 * @return a City object
	 * @throws IOException
	 */
	private City findCity(String cityName, String country, Long id, File file) {
			City tempCity = null;

		    Optional<String> _cityName = Optional.ofNullable(cityName);
		    Optional<String> _country = Optional.ofNullable(country);
		    Optional<Long> _id = Optional.ofNullable(id);
			
			try (InputStream stream = new FileInputStream(file);
				 JsonReader reader = new JsonReader(new InputStreamReader(stream, "UTF-8"));) {
				
				Gson gson = new GsonBuilder().create();
				
				// Read file in stream mode
				reader.beginArray();
				
				while (reader.hasNext()) {
					tempCity = gson.fromJson(reader, City.class);
					
					// Check by city name only
					if (_cityName.isPresent() && _country.isPresent()) {
						if (tempCity.getName().equals(_cityName.get()) &&
								tempCity.getCountry().equals(_country.get())) {
							Log.log().info(String.format("Found city: " + tempCity.toString()));
							return tempCity;
						}
					}
					 // check by city name and county
					 else if (_cityName.isPresent()) {
							if (tempCity.getName().equals(_cityName.get())) {
								Log.log().info(String.format("Found city: " + tempCity.toString()));
								return tempCity;
							}
						}
					// check by id
					else if (_id.isPresent()) {
						if (tempCity.getId() == _id.get()) {
							Log.log().info(String.format("Found city: " + tempCity.toString()));
							return tempCity;
						}
					}
					else {
						Log.log().error("Wrong parameters provided");
					}
					
				}
			} catch (Exception e) {
				Log.log().error(e.getMessage());
			}
			
			return tempCity;
	}
	
	public City findCityById(Long id, File file) {
		return findCity(null, null, id, file);
	}
	
	public City findCityByName(String cityName, File file) { 
		return findCity(cityName, null, null, file);
	}
	
	public City findCityByNameAndCountry(String cityName, String country, File file) { 
		return findCity(cityName, country, null, file);
	}
}
