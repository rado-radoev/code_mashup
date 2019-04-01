package com.superlamer.weatherapp.weather;

import org.bson.Document;

import com.superlamer.weatherapp.Interface.Documentable;

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

	@Override
	public Document toDocument() {
		return new Document("all", getAll());	
	}
	
	
}
