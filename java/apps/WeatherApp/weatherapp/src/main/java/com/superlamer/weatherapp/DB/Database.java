package com.superlamer.weatherapp.DB;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;

import org.bson.Document;

import com.mongodb.MongoCommandException;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.CreateCollectionOptions;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.ValidationOptions;

import static com.mongodb.client.model.Filters.*;

import com.superlamer.weatherapp.City.City;
import com.superlamer.weatherapp.Logger.Log;
import com.superlamer.weatherapp.weather.Rain;
import com.superlamer.weatherapp.weather.Snow;
import com.superlamer.weatherapp.weather.Weather;
import com.superlamer.weatherapp.weather.WeatherQuery;

public class Database {
	
	private MongoClient mongoClient;
	private MongoCollection<Document> mongoCollection;
	private MongoDatabase database;
	
	public Database () {
		if (mongoClient == null) {
			setMongoClient();
			setMongoCollection("Weather", "Cities");
		}
	}
	
	public MongoClient getMongoClient() {
		return this.mongoClient;
	}
	
	private final void setMongoClient() {
		this.mongoClient = connectToDB();
	}
	
	/**
	 * Method to get collection from Mongo DB database
	 * @return MongoCollection object with database collection
	 * @param mongoDatabase Mongo Database and Mongo Collection name 
	 */
	public MongoCollection<Document> getMongoCollection() {
		return mongoCollection;
	}
	
	private final void setMongoCollection(String mongoDBName, String mongoCollName) {
		database = getMongoClient().getDatabase(mongoDBName);		
		
		try {
			ValidationOptions collOptions = new ValidationOptions().validator(
					Filters.and(Filters.type("_id", "long"),
								Filters.type("country", "string"),
								Filters.regex("country", "^[A-Za-z]{2,3}$"),
								Filters.type("coord", "object")));
			
			database.createCollection(mongoCollName, 
				new CreateCollectionOptions().validationOptions(collOptions));
		} catch (MongoCommandException mce) {
			Log.log().error(mce.getMessage());
		}
		
		
		this.mongoCollection = database.getCollection(mongoCollName);
	}
	
	/**
	 * Method to connect to Mongo Atlas DB
	 * @return Mongo client object
	 */
	private final MongoClient connectToDB() {
		Properties dbProps = getDBConnecitonProperties();
		
		MongoClient mongoClient = MongoClients.create(
				"mongodb+srv://" + dbProps.getProperty("user") +
				":" + dbProps.getProperty("pass") + 
				dbProps.getProperty("db"));
		
		return mongoClient;
	}
	

	/**
	 * Method to add new Document object to database
	 * @param documentToInsert BSON document to insert
	 * @return true or false if document has been successfully added or not
	 */
	public boolean addNewDBEntry(Document documentToInsert) {
		boolean addSuccessfull = false;
						
		System.out.println(documentToInsert.getEmbedded(Arrays.asList("citi", "id"), Long.class));
		long dbEntryId = Long.parseLong((documentToInsert.get("citi").toString()));
		
		getMongoCollection().insertOne(documentToInsert);
		
		FindIterable<Document> d = getMongoCollection().find(eq("_id", dbEntryId));
		if (d != null) {
			addSuccessfull = true;
		}
		
		return addSuccessfull;
	}
	
	/**
	 * Method to generate new Document object from City
	 * @param city City object to be added to database
	 * @return City object converted to BSON document
	 */
	public Document toDocument(City city) {
		return new Document("_id", Calendar.getInstance().getTimeInMillis())
					.append("city", city.getName())
					.append("country", city.getCountry())
					.append("id", city.getId())
					.append("coord", new Document("lon", city.getCoord().getLon())
												.append("lat", city.getCoord().getLat()));
	}
	
	public Document toDocument(WeatherQuery weatherQuery) {
		return new Document("clouds", weatherQuery.getClouds().toDocument())
				.append("coord", weatherQuery.getClouds().toDocument())
				.append("main", weatherQuery.getMain().toDocument())
				.append("rain", weatherQuery.getRain() == null ? new Rain() : weatherQuery.getRain().toDocument())
				.append("snow", weatherQuery.getSnow() == null ? new Snow() : weatherQuery.getSnow().toDocument())
				.append("weather", weatherQuery.getWeather().toDocument())
				.append("win", weatherQuery.getWind().toDocument())
				.append("sys", weatherQuery.getSys().toDocument());
	}

	/**
	 * Method to extract connection details
	 * from properties file
	 * @return Properties file with connection data
	 */
	private Properties getDBConnecitonProperties() {
		Properties props = new Properties();
		ClassLoader classLoader = getClass().getClassLoader();
		try (InputStream input = new FileInputStream(new File(classLoader.getResource("Dbconnection.properties").getFile()));) {
		
			props.load(input);

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return props;

	}
}
