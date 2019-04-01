package com.superlamer.weatherapp.DB;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;
import java.util.Calendar;

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

import com.superlamer.weatherapp.Logger.Log;
import com.superlamer.weatherapp.properties.PropertiesReader;

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
								Filters.type("citi", "object"),
								Filters.exists("temp_max"),
								Filters.regex("country", "^[A-Za-z]{2,3}$"),
								Filters.type("weter", "object")));
			
//			collOptions.validationAction(ValidationAction.WARN);
//			collOptions.validationLevel(ValidationLevel.OFF);
			
			database.createCollection(mongoCollName, 
				new CreateCollectionOptions().validationOptions(collOptions));
			
			database.createCollection(mongoCollName);
			
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
		PropertiesReader propertiesReader = new PropertiesReader();
		Properties dbProps = propertiesReader.getProperties("Dbconnection.properties");
		
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
						
		long currUnixTime = Calendar.getInstance().getTimeInMillis();
		documentToInsert.put("_id", currUnixTime);
		
		//System.out.println(documentToInsert.getEmbedded(Arrays.asList("citi", "_id"), Long.class));
		//long dbEntryId = documentToInsert.getEmbedded(Arrays.asList("citi", "_id"), Long.class);
		
		getMongoCollection().insertOne(documentToInsert);
		
		FindIterable<Document> d = getMongoCollection().find(eq("_id", currUnixTime));
		if (d != null) {
			addSuccessfull = true;
		}
		
		return addSuccessfull;
	}
}
