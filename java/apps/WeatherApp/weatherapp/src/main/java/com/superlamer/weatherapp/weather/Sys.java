package com.superlamer.weatherapp.weather;

public class Sys {

	private long sunrise;
	private long sunset;
	
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
}
