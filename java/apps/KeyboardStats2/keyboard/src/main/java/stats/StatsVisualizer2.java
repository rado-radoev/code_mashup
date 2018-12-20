package stats;

import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.TreeMap;

public class StatsVisualizer2 {
	
	private String key;
	private int timesKeyPressed;
			
	public StatsVisualizer2() {
		super();
	}
	

	public String getKey() {
		return key;
	}
	
	public int getTimesKeyPressed() {
		return timesKeyPressed;
	}
	
	public <K, V> void sortMap(int numberOfTopResults, Map<K, V> occurancesMap) {
		
		Map<K, V> topOccurancesMap = new TreeMap<K, V>();
		
		Set<Map.Entry<K, V>> entrySet = occurancesMap.entrySet();
		Iterator<Entry<K, V>> entrySetIterator = entrySet.iterator();
		
		
		
	}
	
}
