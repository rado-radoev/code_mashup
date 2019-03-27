package com.superlamer.weatherapp.weather;

public class Coord {
	
	private long lon;
	private long lat;
	
	public Coord(long lon, long lat) {
		super();
		this.lon = lon;
		this.lat = lat;
	}

	public long getLon() {
		return lon;
	}

	public void setLon(long lon) {
		this.lon = lon;
	}

	public long getLat() {
		return lat;
	}

	public void setLat(long lat) {
		this.lat = lat;
	}
	
	

}
