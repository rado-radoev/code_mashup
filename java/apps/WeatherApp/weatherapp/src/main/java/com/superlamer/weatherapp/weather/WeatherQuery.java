package com.superlamer.weatherapp.weather;

import java.util.Optional;
import java.util.Properties;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

import javax.ws.rs.client.AsyncInvoker;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Invocation;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.superlamer.weatherapp.properties.PropertiesReader;

public class WeatherQuery {
	
	private static final String webURI = "https://api.openweathermap.org/data/2.5/weather";
	
	private WeatherQuery() {}
	
	private static String queryWeather(String cityName, String country, Long id, Coord coord) {
		
		Optional<String> _cityName = Optional.ofNullable(cityName);
		Optional<String> _country = Optional.ofNullable(country);
		Optional<Long> _id = Optional.ofNullable(id);
		Optional<Coord> _coord = Optional.ofNullable(coord);
		
		GsonBuilder gsonBuilder = new GsonBuilder();  
		gsonBuilder.serializeNulls();  
		Gson gson = gsonBuilder.create();
		
		PropertiesReader propertiesReader = new PropertiesReader();
		Properties props = propertiesReader.getProperties("OpenWeatherAPI.properties");
		
		Response response = null;
		
		Client client = ClientBuilder.newClient();
		
		WebTarget target = client.target(webURI);
		target.queryParam("q", _cityName.get());
		
		if (_cityName.isPresent() && _country.isPresent()) {
			target.queryParam("q", String.format("%s,%s", _cityName.get(), _country.get()));
		}
		else if (_cityName.isPresent()) {
			target.queryParam("q", _cityName.get());
		}
		else if (_id.isPresent()) {
			target.queryParam("id", _id.get());
		}
		else if (_coord.isPresent()) {
			target.queryParam("lat", _coord.get().getLat());
			target.queryParam("lon", _coord.get().getLon());
		}
		
		target.queryParam("appid", props.getProperty("appid"))
			  .queryParam("mode", "json")
			  .queryParam("units", "metric");
		

		Invocation.Builder reqBuilder = target.request();
		
		AsyncInvoker asyncInvoker = reqBuilder.async();
		Future<Response> futureResp = asyncInvoker.get();
		
		try {
			response = futureResp.get();
		} catch (InterruptedException | ExecutionException e) {
			e.printStackTrace();
		}

		Weather wQuery = response.readEntity(Weather.class);

		client.close();
		
		return gson.toJson(wQuery);
	}
	
	public static String queryWeatherByCity(String cityName) {
		return queryWeather(cityName, null, null, null);
	}
	
	public static String queryWeatherByCityAndCountry(String cityName, String country) {
		return queryWeather(cityName, country, null, null);
	}
	
	public static String queryWeatherById(long id) {
		return queryWeather(null, null, id, null);
	}
	
	public static String queryWeatherByCoord(Coord coord) {
		return queryWeather(null, null, null, coord);
	}
}
