package com.superklamer.weather_api;

import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSetter;

public class Weather {

	private double lon;
	private double lat;

	private double temp;
	private double pressure;
	private double humidity;
	private double tempMin;
	private double tempMax;

	private double windSpeed;
	private double windDeg;

	private double cityCode;
	private double cityId;
	private String cityName;
	
	private String weatherDescriptionMain;
	private String weatherDescription;
	private String weatherIcon;
	
	private Map<String, Object> conditions = new HashMap();
	
	
	public double getLon() {
		return lon;
	}
	@JsonProperty("coord")
	public void setLon(double longitude) {
		this.lon = longitude;
	}
	public double getLat() {
		return lat;
	}

	public void setLat(double latitude) {
		this.lat = latitude;
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
	public double getTempMin() {
		return tempMin;
	}
	@JsonSetter("temp_min")
	public void setTempMin(double tempMin) {
		this.tempMin = tempMin;
	}
	public double getTempMax() {
		return tempMax;
	}
	@JsonSetter("temp_max")
	public void setTempMax(double tempMax) {
		this.tempMax = tempMax;
	}
	public double getWindSpeed() {
		return windSpeed;
	}
	@JsonSetter("speed")
	public void setWindSpeed(double windSpeed) {
		this.windSpeed = windSpeed;
	}
	public double getWindDeg() {
		return windDeg;
	}
	@JsonSetter("deg")
	public void setWindDeg(double windDeg) {
		this.windDeg = windDeg;
	}
	public double getCityCode() {
		return cityCode;
	}
	@JsonSetter("cod")
	public void setCityCode(double cityCode) {
		this.cityCode = cityCode;
	}
	public double getCityId() {
		return cityId;
	}
	@JsonSetter("id")
	public void setCityId(double cityId) {
		this.cityId = cityId;
	}
	public String getCityName() {
		return cityName;
	}
	@JsonSetter("name")
	public void setCityName(String cityName) {
		this.cityName = cityName;
	}
	public String getWeatherDescription() {
		return weatherDescription;
	}
	@JsonSetter("description")
	public void setWeatherDescription(String weatherDescription) {
		this.weatherDescription = weatherDescription;
	}
	public String getWeatherIcon() {
		return weatherIcon;
	}
	@JsonSetter("icon")
	public void setWeatherIcon(String weatherIcon) {
		this.weatherIcon = weatherIcon;
	}
	@JsonAnySetter
	public void set(String fieldName, Object value) {
		this.conditions.put(fieldName, value);
	}
	public Object get(String fieldName) {
		return this.conditions.get(fieldName);
	}
	
	@Override
	public String toString() {
		return "Weather [longitude=" + lon + ", latitude=" + lat + ", temp=" + temp + ", pressure="
				+ pressure + ", humidity=" + humidity + ", tempMin=" + tempMin + ", tempMax=" + tempMax + ", windSpeed="
				+ windSpeed + ", windDeg=" + windDeg + ", cityCode=" + cityCode + ", cityId=" + cityId + ", cityName="
				+ cityName + ", weatherDescriptionMain=" + weatherDescriptionMain + ", weatherDescription="
				+ weatherDescription + ", weatherIcon=" + weatherIcon + ", conditions=" + conditions + "]";
	}

}
