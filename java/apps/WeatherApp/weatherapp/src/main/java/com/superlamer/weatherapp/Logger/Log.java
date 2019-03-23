package com.superlamer.weatherapp.Logger;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

public class Log {
	
	private static Logger logger = null;
	private Log() {}
	
	public static Logger log() {
		if (logger == null) {
			logger = LogManager.getLogger();
		}
		return logger;
	}
 	
}
