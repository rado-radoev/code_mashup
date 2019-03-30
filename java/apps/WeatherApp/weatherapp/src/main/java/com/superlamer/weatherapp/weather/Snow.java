package com.superlamer.weatherapp.weather;

import org.bson.Document;

import com.google.gson.annotations.SerializedName;

public class Snow implements Documentable {

	
	@SerializedName("1h")
	private double oneHour;
	
	@SerializedName("3h")
	private double threeHours;

	
	public Snow() {}
	
	/**
	 * @param oneHour
	 * @param threeHours
	 */
	public Snow(double oneHour, double threeHours) {
		super();
		this.oneHour = oneHour;
		this.threeHours = threeHours;
	}

	public double getOneHour() {
		return oneHour;
	}

	public void setOneHour(double oneHour) {
		this.oneHour = oneHour;
	}

	public double getThreeHours() {
		return threeHours;
	}

	public void setThreeHours(double threeHours) {
		this.threeHours = threeHours;
	}

	@Override
	public String toString() {
		return "Snow [oneHour=" + oneHour + ", threeHours=" + threeHours + "]";
	}
	
	public Document toDocument() {
		return new Document("oneHour", oneHour)
							.append("threeHours", threeHours);	
	}
	
}
