package com.superlamer.weatherapp.python;

import java.io.File;

import org.bson.Document;

import com.superlamer.weatherapp.DB.Database;
import com.superlamer.weatherapp.weather.IndoorWeather;
import com.superlamer.weatherapp.weather.Weather;
import com.superlamer.weatherapp.weather.WeatherQuery;
import com.google.gson.Gson;
import com.superlamer.weatherapp.City.City;
import com.superlamer.weatherapp.City.CityParser;

public class PythonEntryPoint  {

	private Document weatherDocument;
	Database monDb = new Database();
	private long id;
	private City city;
	
	public PythonEntryPoint( ) {	
		//weatherDocument = monDb.findLastDocument();
		//monDb.setMongoCollection("Weather", "Cities");
	}

	/**
	 * Get the first document ever added to the DB
	 * @return a BSON Document
	 */
	public Document getFirstDocument() {
		return weatherDocument = monDb.findFirstDocument();
	}
	
	/**
	 * Get the very last document added to the DB
	 * @return
	 */
	public Document getLastDocument() {
		return weatherDocument = monDb.findLastDocument();
	}
	
	/**
	 * Convert BSON document to JSON String
	 * @param doc BSON document
	 * @return JSON representation of the document
	 */
	public String convertDocToJson(Document doc ) {
		return monDb.convertDocumentToJSON(doc);
	}
	
	/**
	 * Get new weather data from the internet
	 * @param cityName City to pull data for
	 * @return Weather data as String
	 */
	public String updateWeather(String cityName) {
		return new WeatherQuery().queryWeatherByCity(cityName);
	}
	
	/**
	 * Get city ID
	 * @return city ID
	 */
	public long getId() {
		return id;
	}
	
	/**
	 * Set city ID
	 * @param id city ID
	 */
	public void setId(long id) {
		this.id = id;
	}
	
	/**
	 * Find city information in city.list.json by ID
	 * @param id id of the city to search for
	 * @return City details
	 */
	public City getCity(long id) {
		return new CityParser().findCityById(id, new File("/tmp/city.list.json"));
	}
	
	public Database getMonDb() {
		return monDb;
	}

	/**
	 * Get latest date form Open Weather
	 * @return BSON with latest weather data
	 */
	public Document getUpdatedWeather() {
		System.out.println("java updating weather");
    	City sd = getCity(id);
    	String weatherJson =  new WeatherQuery().queryWeatherById(id);
    	System.out.println(weatherJson);
    	Weather weather = new Gson().fromJson(weatherJson, Weather.class);
    	System.out.println(weather);
    	
    	Document wetDoc = new Document("city", sd.toDocument())
    							.append("weather", weather.toDocument());
    	boolean weatherinfoAdded = monDb.addNewDBEntry(wetDoc);
    	System.out.println(weatherinfoAdded);
    	
    	return getLastDocument();
	}
	
	public Document getUpdatedIndoorIndexes() {
		System.out.println("Java requesting indoor index");
		return new Document();
		
	}
	
	public boolean setIndoorIndexes(String indoorIndexes) {
		System.out.println(indoorIndexes);
		return true;
	}
	
}
	
