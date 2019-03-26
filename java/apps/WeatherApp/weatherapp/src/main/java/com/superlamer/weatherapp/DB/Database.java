package com.superlamer.weatherapp.DB;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.bson.Document;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

public class Database {
	
	private MongoClient mongoClient;
	
	public Database () {
		if (mongoClient == null) {
			setMongoClient();	
		}
	}
	
	public MongoClient getMongoClient() {
		return this.mongoClient;
	}
	
	private final void setMongoClient() {
		this.mongoClient = connectToDB();
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
	 * Method to get collection from Mongo DB database
	 * @return MongoCollection object with database collection
	 * @param mongoDatabase Mongo Database and Mongo Collection name 
	 */
	public MongoCollection getCollection(String mongoDatabase) {
		MongoDatabase database = getMongoClient().getDatabase(mongoDatabase);
		MongoCollection<Document> collection = database.getCollection(mongoDatabase);
		
		return collection;
	}
	
	/**
	 * Method to extract connection details
	 * from properties file
	 * @return Properties file with connection data
	 */
	private Properties getDBConnecitonProperties() {
		Properties props = new Properties();
		
		try (InputStream input = new FileInputStream("Dbconnection.properties");) {
		
			props.load(input);

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return props;

	}
}
