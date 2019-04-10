package com.superlamer.weatherapp.python;

import org.bson.Document;

import com.superlamer.weatherapp.DB.Database;
import com.superlamer.weatherapp.weather.WeatherQuery;

public class PythonEntryPoint  {

	private Document weatherDocument;
	Database monDb = new Database();
	
	public PythonEntryPoint( ) {	
		//weatherDocument = monDb.findLastDocument();	
	}

	public Document getFirstDocument() {
		return weatherDocument = monDb.findFirstDocument();
	}
	
	public Document getLastDocument() {
		return weatherDocument = monDb.findLastDocument();
	}
	
	public String convertDocToJson(Document doc ) {
		return monDb.convertDocumentToJSON(doc);
	}
	
	public String updateWeather(String cityName) {
		return new WeatherQuery().queryWeatherByCity(cityName);
	}
}
	
