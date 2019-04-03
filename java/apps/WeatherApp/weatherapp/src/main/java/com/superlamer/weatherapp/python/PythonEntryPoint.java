package com.superlamer.weatherapp.python;

import org.bson.Document;

import com.superlamer.weatherapp.DB.Database;

public class PythonEntryPoint  {

	private Document firstDocument;
	Database monDb = new Database();
	
	public PythonEntryPoint( ) {	
		firstDocument = monDb.findFirstDocument();
	}

	public Document getFirstDocument() {
		return firstDocument;
	}
	
	public String convertDocToJson(Document doc ) {
		return monDb.convertDocumentToJSON(doc);
	}
	
}