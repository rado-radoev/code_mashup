package com.superlamer.weatherapp.weather;


import org.bson.Document;
import com.superlamer.weatherapp.Interface.Documentable;

public class IndoorWeather implements Documentable {

	private double temperature;
	private double humidity;
	
	
	/**
	 * @param temperature
	 * @param humidity
	 */
	public IndoorWeather(double temperature, double humidity) {
		super();
		this.temperature = temperature;
		this.humidity = humidity;
	}


	public double getTemperature() {
		return temperature;
	}


	public void setTemperature(double temperature) {
		this.temperature = temperature;
	}


	public double getHumidity() {
		return humidity;
	}


	public void setHumidity(double humidity) {
		this.humidity = humidity;
	}


	@Override
	public String toString() {
		return "IndoorWeather [getTemperature()=" + getTemperature() + ", getHumidity()=" + getHumidity() + "]";
	}
	
	@Override
	public Document toDocument() {
		return new Document("indoor_temperature", getTemperature())
				.append("indoor_humidity", getHumidity());
	}

	
}
