package com.superlamer.weatherapp.weather;

public class Weather {

	public Weather() {
		getWeather();
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
	
	private void getWeather() {
//https://api.openweathermap.org/data/2.5/weather?q=London&appid=6a0326b54ac62aae38ee842128683084"		
		String webURI = "https://api.openweathermap.org/data/2.5/weather";
		
		Client client = ClientBuilder.newClient();
		client.target(webURI)
				 .queryParam("id", 5391811)
				 .queryParam("appid", "6a0326b54ac62aae38ee842128683084")
				 .queryParam("mode", "json")
				 .queryParam("units", "metric")
				 .request(MediaType.APPLICATION_JSON)
				 .buildGet();

		System.out.println(client);

	}
}
