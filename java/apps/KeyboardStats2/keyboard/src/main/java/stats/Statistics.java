package stats;

import java.util.HashMap;
import java.util.Map;

public class Statistics {


	private final static Map<String, Integer> occurances = new HashMap<String, Integer>();
	
	
	private Statistics() {
		super();
	}	
	public static Map<String, Integer> getOccurances() {
		return occurances;
	}
	
	public static void loadOccurances(String key) {
		if (occurances.containsKey(key)) {
			occurances.put(key, occurances.get(key) + 1);
		}
		else {
			occurances.put(key, 1);	
		}
	}
	
	
	public static void displayStats() {
		for (String key : occurances.keySet()) {
			System.out.println("Key: " + key + " Value: " + occurances.get(key));
		}
	}
	
}
