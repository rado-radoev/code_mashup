package com.superklamer.weather_api;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonTypeInfo.As;
import com.fasterxml.jackson.annotation.JsonTypeInfo.Id;


public class Coord {
	
	@JsonProperty("lon")
	private double lon;
	@JsonProperty("lat")
	private double lat;
	
	
	public double getLon() {
		return lon;
	}
	public void setLon(double lon) {
		this.lon = lon;
	}
	public double getLat() {
		return lat;
	}
	public void setLat(double lat) {
		this.lat = lat;
	}
	
	@Override
	public String toString() {
		return "Coord [getLon()=" + getLon() + ", getLat()=" + getLat() + "]";
	}
}
