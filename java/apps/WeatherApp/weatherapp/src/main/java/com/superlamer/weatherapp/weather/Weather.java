package com.superlamer.weatherapp.weather;

public class Weather {
	
	private int id;
	private String main;
	private String description;
	private String icon;
	
	public Weather() {}
	/**
	 * @param id Weather condition id
	 * @param main Group of weather parameters (Rain, Snow, Extreme etc.)
	 * @param description Weather condition within the group
	 * @param icon Weather icon id
	 */
	public Weather(int id, String main, String description, String icon) {
		super();
		this.id = id;
		this.main = main;
		this.description = description;
		this.icon = icon;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getMain() {
		return main;
	}

	public void setMain(String main) {
		this.main = main;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}
	
	@Override
	public String toString() {
		return "Weather [id=" + id + ", main=" + main + ", description=" + description + ", icon=" + icon + "]";
	}	

}
