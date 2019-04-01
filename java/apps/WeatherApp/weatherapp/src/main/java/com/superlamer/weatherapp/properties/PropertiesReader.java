package com.superlamer.weatherapp.properties;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class PropertiesReader {
	
	/**
	 * Method to extract connection details
	 * from properties file
	 * @return Properties file with connection data
	 */
	public Properties getProperties(String propertiesFileName) {
		Properties props = new Properties();
		ClassLoader classLoader = getClass().getClassLoader();
		try (InputStream input = new FileInputStream(new File(classLoader.getResource(propertiesFileName).getFile()));) {
		
			props.load(input);

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return props;
	}

}
