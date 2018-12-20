package stats;

import java.util.Comparator;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.SortedSet;
import java.util.TreeMap;
import java.util.TreeSet;


public class StatsVisualizer3 {
	
	private StatsVisualizer3() {
		super();
	}

	
	public static <K,V extends Comparable<? super V>>
	SortedSet<Map.Entry<K,V>> entriesSortedByValues(Map<K,V> map) {
	    SortedSet<Map.Entry<K,V>> sortedEntries = new TreeSet<Map.Entry<K,V>>(
	        new Comparator<Map.Entry<K,V>>() {
	            @Override public int compare(Map.Entry<K,V> e1, Map.Entry<K,V> e2) {
	                int res = e1.getValue().compareTo(e2.getValue());
	                return res != 0 ? res : 1;
	            }
	        }
	    );
	    sortedEntries.addAll(map.entrySet());
	    return sortedEntries;
	}
	
	
	public static <K, V extends Comparable<? super V>> TreeMap<K, V> getNTopResults(int topResultsToReturn, Map<K, V> inputMap) {
			
		TreeMap<K, V> output = new TreeMap<K, V>();
		
		Iterator<Entry<K, V>> entrySetIterator = entriesSortedByValues(inputMap).iterator();
		
		int count = 0;
		while (count <= topResultsToReturn) {
			if (entrySetIterator.hasNext()) {
				Entry entry = entrySetIterator.next();
				output.put((K)entry.getKey(),(V)entry.getValue());
			} else {
				break;
			}
			
			count++;
		}
		
		return output;
	}
}
