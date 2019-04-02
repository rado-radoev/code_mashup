package com.superlamer.weatherapp.DB;

import static com.mongodb.client.model.Filters.eq;

import java.util.Calendar;

import org.bson.Document;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;

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

}
