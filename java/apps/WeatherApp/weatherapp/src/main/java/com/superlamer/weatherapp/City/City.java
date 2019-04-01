package com.superlamer.weatherapp.City;

import org.bson.Document;

import com.superlamer.weatherapp.Interface.Documentable;

public class City implements Documentable {
	
	private String name;
	private String country;
	private long id;
	private Coord coord;
	
	public City() {}
	
	public City(String name, String county, long id, Coord coord) {
		this.name = name;
		this.country = county;
		this.id = id;
		this.coord = coord;
	}
	
	public String getName() {
		return name.trim();
	}
	public void setName(String name) {
		this.name = name.trim();
	}
	public String getCountry() {
		return country.trim();
	}
	public void setCountry(String country) {
		this.country = country.trim();
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public Coord getCoord() {
		return coord;
	}
	public void setCoord(Coord coord) {
		this.coord = coord;
	}
	@Override
	public String toString() {
		return "City [getName()=" + getName() + 
				", getCountry=" + getCountry() +
				", getId()=" + getId() + 
				", lon=" + getCoord().getLon() + 
				", lat=" + getCoord().getLat() + "]";
	}	
	
	/**
	 * Method to generate new Document object from City
	 * @param city City object to be added to database
	 * @return City object converted to BSON document
	 */
	@Override
	public Document toDocument() {
		return new Document("city", getName())
					.append("country", getCountry())
					.append("id", getId())
					.append("coord", new Document("lon", getCoord().getLon())
												.append("lat", getCoord().getLat()));
	}


}
