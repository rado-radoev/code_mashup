package com.superlamer.weatherapp.weather;

import org.bson.Document;

import com.google.gson.annotations.SerializedName;

public class Rain implements Documentable {

	@SerializedName("1h")
	private double oneHour = .0;
	
	@SerializedName("3h")
	private double threeHours = .0;

	
	public Rain() {}
  	
	/**
	 * @param oneHour
	 * @param threeHours
	 */
	public Rain(double oneHour, double threeHours) {
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
		return "Rain [oneHour=" + oneHour + ", threeHours=" + threeHours + "]";
	}

	public Document toDocument() {
		return new Document("oneHour", oneHour)
				.append("threeHours", threeHours);	
	}
	
}
