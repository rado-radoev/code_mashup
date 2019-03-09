package com.superklamer.weather_api;

import com.sun.jersey.api.client.ClientResponse;

import java.io.IOException;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.WebResource;

public class WeatherAPI {

	public static void main(String[] args) throws IOException {
		
		//6a0326b54ac62aae38ee842128683084
		
		
		Client client = Client.create();
		WebResource webResource = client.resource("https://api.openweathermap.org/data/2.5/weather?q=London&appid=6a0326b54ac62aae38ee842128683084");

		ClientResponse response = webResource
									.accept("application/json")
									.get(ClientResponse.class);
		
		if (response.getStatus() != 200) {
			throw new RuntimeException("Failed : HTTP error code: " + response.getStatus());
		}
		
		String output = response.getEntity(String.class);
		
//		System.out.println("Output from server ... \n");
//		System.out.println(output);
		
		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(output); 
		
		Weather weather = objectMapper.readValue(output, Weather.class);
		
		System.out.println(weather);
		
	}

}
