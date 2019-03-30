package com.superlamer.weatherapp.weather;

import org.bson.Document;

public class Clouds implements Documentable {

	private double all;
	
	public Clouds() {}
 	public Clouds(double all) {
		this.all = all;
	}
	
	public double getAll() {
		return all;
	}
	public void setAll(double all) {
		this.all = all;
	}
	@Override
	public String toString() {
		return "Clouds [all=" + all + "]";
	}

	public Document toDocument() {
		return new Document("all", all);	
	}
	
	
}
