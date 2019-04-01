package com.superlamer.weatherapp.City;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Map;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.SystemUtils;

import com.superlamer.weatherapp.Logger.Log;

public class FileDownloader {
	
	/**
	 * Gets the system temporary folder location
	 * @param osName OS Name
	 * @return string representing the temp folder location
	 */
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
	
	/**
	 * Gets the full name of the downloaded file
	 * @param url URL to file to be downloaded
	 * @return Name of downloaded file
	 */
	private String getDownloadedFileName(String url) {
		return url.substring(url.lastIndexOf('/') + 1);
	}
	
	
	/**
	 * Goes to the interent and downloads a file to the OS temporary folder
	 * @param url URL to file to be downloaded
	 * @return True or False if file was successfully downloaded or not
	 */
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
