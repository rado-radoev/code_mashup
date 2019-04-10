package com.superlamer.weatherapp.DB;

import java.util.ArrayList;
import java.util.Properties;

import org.bson.Document;

import com.mongodb.MongoCommandException;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.CreateCollectionOptions;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.ValidationOptions;

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
			
			MongoCollection<Document> collExits = database.getCollection(mongoCollName);
			if (collExits == null) {
				database.createCollection(mongoCollName, 
						new CreateCollectionOptions().validationOptions(collOptions));
			}
			collExits = null;	
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
		return new DocumentModeler().addNewDBEntry(documentToInsert, mongoCollection);
	}
	
	/**
	 * Find the first element added to the collection
	 * @return last elements as Document, that was added to the collection
	 */
	public Document findFirstDocument() {
		return new DocumentModeler().findFirstDocument(getMongoCollection());
	}
	
	/**
	 * Find the last document added to the collection
	 * @return
	 */
	public Document findLastDocument() {
		return new DocumentModeler().findLastDocument(getMongoCollection());
	}
	
	/**
	 * Convert a <strong>Bson document</strong> to JSON
	 * @param documentToConvert Bson document to convert to JSON String
	 * @return JSON as a string
	 */
	public String convertDocumentToJSON(Document documentToConvert) {
		return new DocumentModeler().convertDocumentToJSON(documentToConvert);
	}
	
	/**
	 * Gets all documents in collection
	 * @return ArrayList containing all documents in the collection
	 */
	public ArrayList<Document> getAllDocuments() {
		return new DocumentModeler().getAllDocuments(getMongoCollection());
	}
}
