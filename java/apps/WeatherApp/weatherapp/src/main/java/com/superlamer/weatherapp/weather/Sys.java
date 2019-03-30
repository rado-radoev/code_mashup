package com.superlamer.weatherapp.weather;

import org.bson.Document;

public class Sys implements Documentable {

	private long sunrise;
	private long sunset;
	
	
	public Sys() {}
	public Sys(long sunrise, long sunset) {
		super();
		this.sunrise = sunrise;
		this.sunset = sunset;
	}
	
	public long getSunset() {
		return sunset;
	}
	
	public void setSunset(long sunset) {
		this.sunset = sunset;
	}
	
	public long getSunrise() {
		return sunrise;
	}
	
	public void setSunrise(long sunrise) {
		this.sunrise = sunrise;
	}
	
	@Override
	public String toString() {
		return "Sys [sunrise=" + sunrise + ", sunset=" + sunset + "]";
	}

	
	public Document toDocument() {
		return new Document("sunrise", sunrise)
				.append("sunset", sunset);	
	}
	
}
