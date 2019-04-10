package com.superlamer.weatherapp.DB;

import static com.mongodb.client.model.Filters.eq;

import java.util.ArrayList;
import java.util.Calendar;

import org.bson.Document;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;

import static com.mongodb.client.model.Sorts.orderBy;
import static com.mongodb.client.model.Sorts.descending;

public class DocumentModeler {
	
	public DocumentModeler() {}

	/**
	 * Method to add new Document object to database
	 * @param documentToInsert BSON document to insert
	 * @return true or false if document has been successfully added or not
	 */
	public boolean addNewDBEntry(Document documentToInsert, MongoCollection<Document> mongoCollection) {
		boolean addSuccessfull = false;
						
		long currUnixTime = Calendar.getInstance().getTimeInMillis();
		documentToInsert.put("_id", currUnixTime);
		
		//System.out.println(documentToInsert.getEmbedded(Arrays.asList("citi", "_id"), Long.class));
		//long dbEntryId = documentToInsert.getEmbedded(Arrays.asList("citi", "_id"), Long.class);
		
		mongoCollection.insertOne(documentToInsert);
		
		FindIterable<Document> d = mongoCollection.find(eq("_id", currUnixTime));
		if (d != null) {
			addSuccessfull = true;
		}
		
		return addSuccessfull;
	}
	
	/**
	 * Find first document in collection and return it
	 * @param mongoCollection the Mongo collection to search
	 * @return BSON Document containing first element
	 */
	public Document findFirstDocument(MongoCollection<Document> mongoCollection) {
		return mongoCollection.find().first();
	}
	
	/**
	 * Find last document in collection and return it
	 * @param mongoCollection
	 * @return
	 */
	public Document findLastDocument(MongoCollection<Document> mongoCollection) {
		FindIterable<Document> docs = mongoCollection.find().limit(1).sort(orderBy(descending("_id")));
		
		return docs.first();
	}
	
	/**
	 * Convert <strong>BSON Document</strong> to JSON string
	 * @param documentToConvert BSON document to convert
	 * @return JSON as String
	 */
	public String convertDocumentToJSON(Document documentToConvert) {
		GsonBuilder gsonBuilder = new GsonBuilder();  
		gsonBuilder.serializeNulls();  
		Gson gson = gsonBuilder.create();
				
		return gson.toJson(documentToConvert);
	}
	
	/**
	 * Retrieve all documents in collection
	 * @param mongoCollection the collection to search
	 * @return ArrayList of all documents in the collection
	 */
	public ArrayList<Document> getAllDocuments(MongoCollection<Document> mongoCollection) {
		MongoCursor<Document> cursor = mongoCollection.find().iterator();
		ArrayList<Document> documents = new ArrayList<Document>(); 		
		
		try {
			while (cursor.hasNext()) {
				documents.add(cursor.next());
			}
		} finally {
			cursor.close();
		}
		
		return documents;
	}

	// TO DO:
	// 		IN THE FUTURE ADD FUNCTIONALITY TO FILTER SEARCHES
	//		http://mongodb.github.io/mongo-java-driver/3.4/driver/getting-started/quick-start/
	//		SEARCH BY: City, Country, Id, Coords, _id (range)
	
}













