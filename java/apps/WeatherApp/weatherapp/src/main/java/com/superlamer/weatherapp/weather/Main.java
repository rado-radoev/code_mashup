package com.superlamer.weatherapp.weather;

import org.bson.Document;

public class Main implements Documentable {

	private double temp;
	private double pressure;
	private double humidity;
	private double temp_min;
	private double temp_max;
	private double sea_level;
	private double grnd_level;

	public Main () {}
	

	/**
	 * @param temp
	 * @param pressure
	 * @param humidity
	 * @param min_temp
	 * @param max_temp
	 * @param sea_level
	 * @param grnd_level
	 */
	public Main(double temp, double pressure, double humidity, double min_temp, double max_temp, double sea_level,
			double grnd_level) {
		super();
		this.temp = temp;
		this.pressure = pressure;
		this.humidity = humidity;
		this.temp_min = min_temp;
		this.temp_max = max_temp;
		this.sea_level = sea_level;
		this.grnd_level = grnd_level;
	}


	public double getTemp() {
		return temp;
	}

	public void setTemp(double temp) {
		this.temp = temp;
	}

	public double getPressure() {
		return pressure;
	}

	public void setPressure(double pressure) {
		this.pressure = pressure;
	}

	public double getHumidity() {
		return humidity;
	}

	public void setHumidity(double humidity) {
		this.humidity = humidity;
	}

	public double getTemp_min() {
		return temp_min;
	}

	public void setTemp_min(double temp_min) {
		this.temp_min = temp_min;
	}

	public double getTemp_max() {
		return temp_max;
	}

	public void setTemp_max(double temp_max) {
		this.temp_max = temp_max;
	}

	public double getSea_level() {
		return sea_level;
	}

	public void setSea_level(double sea_level) {
		this.sea_level = sea_level;
	}

	public double getGrnd_level() {
		return grnd_level;
	}

	public void setGrnd_level(double grnd_level) {
		this.grnd_level = grnd_level;
	}


	@Override
	public String toString() {
		return "Main [temp=" + temp + ", pressure=" + pressure + ", humidity=" + humidity + ", min_temp=" + temp_min
				+ ", max_temp=" + temp_max + ", sea_level=" + sea_level + ", grnd_level=" + grnd_level + "]";
	}
	
	public Document toDocument() {
		return new Document("temp", temp)
				.append("pressure", pressure)
				.append("humidity", humidity)
				.append("main_temp", temp_min)
				.append("max_temp", temp_max)
				.append("sea_level", sea_level)
				.append("grnd_level", grnd_level);	
	}
}
