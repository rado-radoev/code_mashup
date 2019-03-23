package com.superklamer.weather_api;

import com.sun.jersey.api.client.ClientResponse;

import java.io.IOException;
import java.io.StringReader;
import java.util.List;
import java.util.Map;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.json.JsonValue;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.google.gson.JsonArray;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.WebResource;


import javassist.expr.Instanceof;

import com.fasterxml.jackson.databind.node.ArrayNode;

public class WeatherAPI {

	public static Weather getWeather() throws IOException {
		
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
//		System.out.println(jsonNode);
//		System.out.println(jsonNode.get("weather").get(0).get("main"));
//		
//		JsonReader reader = Json.createReader(new StringReader(output));
//		JsonObject obj = reader.readObject();
//		
//		reader.close();
//		
//		System.out.println(obj.getJsonArray("weather").get(0));
//		
//		ArrayNode arr = (ArrayNode) jsonNode.get("weather"); 
//		System.out.println(arr.get(0).get("id"));
		
		Weather weather = objectMapper.readValue(output, Weather.class);
		
		System.out.println(weather.getCoord().getLon());

//		Map<String, Object> jsonMap = objectMapper.readValue(output,
//			    new TypeReference<Map<String,Object>>(){});
		
//		System.out.println( ((Map) jsonMap.get("coord")).get("lon") ) ;
//		System.out.println(jsonMap.get("weather"));
		
		
		return weather;
		
	}

}
;