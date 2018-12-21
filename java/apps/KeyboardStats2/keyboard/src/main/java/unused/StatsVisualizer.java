package unused;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.TreeMap;

import exceptions.InsufficientResultsList;

public class StatsVisualizer{

	private StatsVisualizer() {
		super();
	}
	
	private static <V, K> List[] stripMap(Map<K, V> inputMap) {
		
		List<V> occurancesOutput = new ArrayList<V>();
		List<V> keysOutput = new ArrayList<V>();
		
		List[] output = {occurancesOutput, keysOutput}; 
		
		Set<Map.Entry<K, V>> entrySet = inputMap.entrySet();
		Iterator<Entry<K, V>> entrySetIterator = entrySet.iterator();
		
		while (entrySetIterator.hasNext()) {
			Entry entry = entrySetIterator.next();
			
			occurancesOutput.add((V) entry.getValue());
			keysOutput.add((V) entry.getKey());
		}
		
		return output;
		
	}
	
	public static <T, K, V> Map<K, V> getNTopResults(int numberOfTopResults, Map<K, V> inputMap) {
		Map<K, V> output = new TreeMap<K, V>();
		
		List[] strippedMap = stripMap(inputMap);
		
		List<V> resultValues = strippedMap[0];
		List<V> resultKeys = strippedMap[1];
		
		
		if (resultValues.size() < numberOfTopResults) {
			throw new InsufficientResultsList("Result List does not have enough data");
		}
		
		
		

		return output;
				
	}
	
	
}
