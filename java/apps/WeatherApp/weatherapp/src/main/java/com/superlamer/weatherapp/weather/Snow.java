package com.superlamer.weatherapp.weather;

import com.google.gson.annotations.SerializedName;

public class Snow {

	// TO DO: REVISIT THIS
	// THE PROPS SHOULD BE 1H AND 3H
	
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
}
