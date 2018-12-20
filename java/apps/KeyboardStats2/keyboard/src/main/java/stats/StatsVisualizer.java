package stats;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import exceptions.InsufficientResultsList;

public class StatsVisualizer{

	private StatsVisualizer() {
		super();
	}
	
	private static <V, K> List<V> stripValuesFromMap(Map<K, V> inputMap) {
		
		List<V> output = new ArrayList<V>();
		
		Set<Map.Entry<K, V>> entrySet = inputMap.entrySet();
		Iterator<Entry<K, V>> entrySetIterator = entrySet.iterator();
		
		while (entrySetIterator.hasNext()) {
			Entry entry = entrySetIterator.next();
			
			output.add((V) entry.getValue());
		}
		
		return output;
		
	}
	
	public static <T, K, V> List<V> getNTopResults(int numberOfTopResults, Map<K, V> inputMap) {
		List<V> resultValues = stripValuesFromMap(inputMap);
		
		
		if (resultValues.size() < numberOfTopResults) {
			throw new InsufficientResultsList("Result List does not have enough data");
		}
		
		Collections.sort(resultValues, Collections.reverseOrder());
		
		return resultValues.subList(0, numberOfTopResults + 1);
				
	}
	
}
