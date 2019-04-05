package com.superlamer.weatherapp.weather;

import org.bson.Document;

import com.superlamer.weatherapp.Interface.Documentable;

public class Weather implements Documentable { 
	
	private Clouds clouds;
	private Coord coord;
	private WeatherMain weather;
	private Main main;
	private Rain rain;
	private Snow snow;
	private Wind wind;
	private Sys sys;
	
	/**
	 * @param clouds
	 * @param coord
	 * @param weather
	 * @param main
	 * @param rain
	 * @param snow
	 * @param wind
	 * @param sys
	 */
	public Weather(Clouds clouds, Coord coord, WeatherMain weather, Main main, Rain rain, Snow snow, Wind wind,
			Sys sys) {
		super();
		this.clouds = clouds;
		this.coord = coord;
		this.weather = weather;
		this.main = main;
		this.rain = rain;
		this.snow = snow;
		this.wind = wind;
		this.sys = sys;
	}

	public Weather() {
	}
	
	public Clouds getClouds() {
		return clouds;
	}

	public void setClouds(Clouds clouds) {
		this.clouds = clouds;
	}

	public Coord getCoord() {
		return coord;
	}

	public void setCoord(Coord coord) {
		this.coord = coord;
	}

	public Main getMain() {
		return main;
	}

	public void setMain(Main main) {
		this.main = main;
	}

	public Rain getRain() {
		return rain;
	}

	public void setRain(Rain rain) {
		this.rain = rain;
	}

	public Snow getSnow() {
		return snow;
	}

	public void setSnow(Snow snow) {
		this.snow = snow;
	}

	public Wind getWind() {
		return wind;
	}

	public void setWind(Wind wind) {
		this.wind = wind;
	}

	public Sys getSys() {
		return sys;
	}

	public void setSys(Sys sys) {
		this.sys = sys;
	}
	
	public WeatherMain getWeather() {
		return weather;
	}

	public void setWeather(WeatherMain weather) {
		this.weather = weather;
	}
	
	@Override
	public String toString() {
		return "WeatherQuery [getClouds()=" + getClouds() + ", getCoord()=" + getCoord() + ", getMain()=" + getMain()
				+ ", getRain()=" + getRain() + ", getSnow()=" + getSnow() + ", getWind()=" + getWind() + ", getSys()="
				+ getSys() + ", getWeather()=" + getWeather() + "]";
	}

	@Override
	public Document toDocument() {
		return new Document("clouds", getClouds().toDocument())
				.append("coord", getClouds().toDocument())
				.append("main", getMain().toDocument())
				.append("rain", getRain() == null ? new Rain().toDocument() : getRain().toDocument())
				.append("snow", getSnow() == null ? new Snow().toDocument() : getSnow().toDocument())
				.append("weather", getWeather().toDocument())
				.append("wind", getWind().toDocument())
				.append("sys", getSys().toDocument());
	}
}
