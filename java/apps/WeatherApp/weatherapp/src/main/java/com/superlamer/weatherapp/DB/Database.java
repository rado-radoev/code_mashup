package com.superlamer.weatherapp.DB;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;
import java.util.Calendar;

import org.bson.Document;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.superlamer.weatherapp.City.City;

public class Database {
	
	private MongoClient mongoClient;
	private MongoCollection<Document> mongoCollection;
	
	public Database () {
		if (mongoClient == null) {
			setMongoClient();
			setMongoCollection("Cities");
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
	
	private final void setMongoCollection(String mongoDatabase) {
		MongoDatabase database = getMongoClient().getDatabase(mongoDatabase);		
		MongoCollection<Document> collection = database.getCollection(mongoDatabase);
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
	

	public boolean addNewDBEntry(Document documentToInsert) {
		boolean addedSuccesfully = false;
		
		getMongoCollection().insertOne(documentToInsert);
		
		return addedSuccesfully;
	}
	
	/**
	 * Method to generate new Document object from City
	 * @param city City object to be added to database
	 * @return City object coverted to BSON document
	 */
	public Document toDocument(City city) {
		return new Document("_id", Calendar.getInstance())
					.append("city", city.getName())
					.append("contry", city.getCountry())
					.append("id", city.getId())
					.append("coord", new Document("lon", city.getCoord().getLon())
												.append("lat", city.getCoord().getLat()));
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
