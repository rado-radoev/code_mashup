package com.superlamer.weatherapp.python;

import org.bson.Document;

import com.superlamer.weatherapp.DB.Database;

public class PythonEntryPoint  {

	private Document firstDocument;
	
	public PythonEntryPoint( ) {
		Database monDb = new Database();
		firstDocument = monDb.findFirstDocument();
	}

	public Document getFirstDocument() {
		return firstDocument;
	}
	
}