package stats;

import java.util.Map;
import java.util.TreeMap;

public class Statistics {


	private final static Map<String, Integer> occurances = new TreeMap<String, Integer>();
	
	
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
		TreeMap<String, Integer> map = StatsVisualizer3.getNTopResults(10, occurances);
		
		for (String key : map.keySet()) {
			System.out.println("Key: " + key + " Value: " + map.get(key));
		}
	}
	
}
