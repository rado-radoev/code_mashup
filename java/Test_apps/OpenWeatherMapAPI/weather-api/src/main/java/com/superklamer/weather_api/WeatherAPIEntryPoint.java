package com.superklamer.weather_api;

import java.io.IOException;

import py4j.GatewayServer;

public class WeatherAPIEntryPoint {

	
	private Weather weather;
	
	public WeatherAPIEntryPoint() throws IOException {
		this.weather = WeatherAPI.getWeather();
	}
	
	public Weather getWeather() {
		return weather;
	}
  	
	public static void main(String[] args) throws IOException {
		GatewayServer gatewayServer = new GatewayServer(new WeatherAPIEntryPoint());
		gatewayServer.start();
		System.out.println("Gateway server started");
	}

}
