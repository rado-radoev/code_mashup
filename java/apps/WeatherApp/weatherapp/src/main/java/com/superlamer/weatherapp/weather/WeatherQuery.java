package com.superlamer.weatherapp.weather;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Invocation;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

public class WeatherQuery { 
	
	private Clouds clouds;
	private Coord coord;
	private Weather weather;
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
	public WeatherQuery(Clouds clouds, Coord coord, Weather weather, Main main, Rain rain, Snow snow, Wind wind,
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

	public WeatherQuery() {
	}
	
//	public String getWeather(int id) {
//		
//	}
//	
//	public String getWeather(String cityName) {
//		
//	}
//	
//	public String getWeather(Coord coord) {
//		
//	}
	
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
	
	public Weather getWeather() {
		return weather;
	}

	public void setWeather(Weather weather) {
		this.weather = weather;
	}
	
	

	@Override
	public String toString() {
		return "WeatherQuery [getClouds()=" + getClouds() + ", getCoord()=" + getCoord() + ", getMain()=" + getMain()
				+ ", getRain()=" + getRain() + ", getSnow()=" + getSnow() + ", getWind()=" + getWind() + ", getSys()="
				+ getSys() + ", getWeather()=" + getWeather() + "]";
	}

	public void queryWeather() {
		String webURI = "https://api.openweathermap.org/data/2.5/weather";
		
		Client client = ClientBuilder.newClient();
		WebTarget target = client.target(webURI)
				 .queryParam("id", 5391811)
				 .queryParam("appid", "6a0326b54ac62aae38ee842128683084")
				 .queryParam("mode", "json")
				 .queryParam("units", "metric");
		
		WeatherQuery wQuery = target.request(MediaType.APPLICATION_JSON)
			 					 .get(WeatherQuery.class);

		System.out.println(target.getUri().toString());
		System.out.println(wQuery.toString());

	}
}
