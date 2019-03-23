package com.superklamer.weather_api;

import java.io.IOException;
import java.net.UnknownHostException;
import java.util.Arrays;
import java.util.List;

import org.bson.Document;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import static com.mongodb.client.model.Filters.eq;

public class MongoTest {

	public static void main(String[] args) throws IOException {
		
		
		MongoClient mongoClient = MongoClients.create(
				"mongodb+srv://rradoev:<password>@cluster0-yc4wz.mongodb.net/test?retryWrites=true");
		MongoDatabase database = mongoClient.getDatabase("Test");
		MongoCollection<Document> collection = database.getCollection("Test");

		
		System.out.println(collection);
		
		// Create a document and save it to DB
		List<Integer> books = Arrays.asList(27464, 747854);
		Document person = new Document("_id", "jo")
								.append("name", "Jo Bloggs")
								.append("address", new Document("street", "123 Fake str")
																.append("city", "Faketown")
																.append("state", "FK")
																.append("zip", 007))
								.append("books", books);
				
		
		//collection.insertOne(person);
		//Document doc = collection.find(eq("name", "Jo Bloggs")).first();
		//System.out.println(doc.toJson());
		
		Weather weather = new WeatherAPI().getWeather();
		collection.insertOne(toDocument(weather));

		
		mongoClient.close();

	}
	
	public static final Document toDocument(Weather weather) {
		return new Document("_id", weather.getCityId())
							.append("lon", weather.getCoord().getLon())
							.append("lat", weather.getCoord().getLat())
							.append("temp", weather.getTemp());
							
	}

}

