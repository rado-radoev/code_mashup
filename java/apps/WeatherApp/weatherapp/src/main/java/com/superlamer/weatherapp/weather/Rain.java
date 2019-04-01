package com.superlamer.weatherapp.weather;

import org.bson.Document;

import com.google.gson.annotations.SerializedName;
import com.superlamer.weatherapp.Interface.Documentable;

public class Rain implements Documentable {

	@SerializedName("1h")
	private double oneHour;
	
	@SerializedName("3h")
	private double threeHours;

	
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

	@Override
	public Document toDocument() {
		return new Document("oneHour", getOneHour())
				.append("threeHours", getThreeHours());	
	}
	
}
