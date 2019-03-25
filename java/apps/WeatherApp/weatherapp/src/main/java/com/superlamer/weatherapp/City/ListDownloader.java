package com.superlamer.weatherapp.City;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Map;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.SystemUtils;

import com.superlamer.weatherapp.Logger.Log;

public class ListDownloader {
	
	private String getTempFolder(String osName) {
			
		// By default will be returning UNIX os temp folder
		String tempFolder = "/tmp";
		
		// This is only if user is using Windows
		if (osName.toLowerCase().contains("win")) {
			// Get env variables for Windows
			Map<String, String> env = System.getenv();
			
			tempFolder = env.get("Temp");	
		}

		return tempFolder;
	}
	
	private String getDownloadedFileName(String url) {
		return url.substring(url.lastIndexOf('/') + 1);
	}
	
	
//	https://raw.githubusercontent.com/superklamer/code_mashup/master/java/apps/city.list.json
	public boolean downloadFile(URL url) {
		
		boolean fileDownlaoded = false;
		String osName = SystemUtils.OS_NAME;
		String tempFolder = getTempFolder(osName);
		String fileName = getDownloadedFileName(url.toString());
		File destination = new File(String.format("%s/%s", tempFolder, fileName));
		
		try {
			Log.log().info("Copying file now.");
			FileUtils.copyURLToFile(url, destination, 5000, 10000);
			fileDownlaoded = true;
			return fileDownlaoded;
		} catch (IOException ioe) {
			Log.log().error("Could not copy JSON file");
			Log.log().error(ioe.getMessage());
			return fileDownlaoded;
		}
	}
	
	
}
