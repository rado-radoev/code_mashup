package com.superlamer.weatherapp.weather;

import org.bson.Document;

import com.superlamer.weatherapp.Interface.Documentable;

public class Wind implements Documentable {
	
	private double speed;
	private double deg;
	
	public Wind() {}
	
	 /**
	 * @param speed
	 * @param deg
	 */
	public Wind(double speed, double deg) {
		super();
		this.speed = speed;
		this.deg = deg;
	}
	
	public double getSpeed() {
		return speed;
	}
	public void setSpeed(double speed) {
		this.speed = speed;
	}
	public double getDeg() {
		return deg;
	}
	public void setDeg(double deg) {
		this.deg = deg;
	}

	@Override
	public String toString() {
		return "Wind [speed=" + speed + ", deg=" + deg + "]";
	}

	@Override
	public Document toDocument() {
		return new Document("spped", getSpeed())
				.append("deg", getDeg());	
	}
	


}
