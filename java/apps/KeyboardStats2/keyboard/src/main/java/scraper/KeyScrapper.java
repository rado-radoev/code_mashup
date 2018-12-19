package scraper;

import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class KeyScrapper {

	public static void main(String[] args) throws IOException {
		
		
		final Document document = Jsoup.connect("https://docs.oracle.com/javase/8/docs/api/constant-values.html#java.awt.event.KeyEvent.KEY_FIRST").get();
		
		StringBuffer sb = new StringBuffer();
		for (Element row : document.select("table.constantsSummary tr")) {
	
			if (row.select("td code a").attr("href").toLowerCase().contains("java/awt/event/keyevent.html")) {
				System.out.println(row.select("td code a").text());	
				System.out.println(row.select(".colLast").text());	
			}
		
//			System.out.println(row.text());
//			if (row.text().toLowerCase().contains("java.awt.event")) {
//				System.out.println(row);
//			}
//			String aHref = row.select("td clone").attr("href"); // the ahref link for a table column
//			Elements e = row.children();
//			for (Element el : e) {
//				System.out.println(e.attr("href"));
//			}
//			System.out.println(aHref);
//			String text = row.select("td clone a").text(); // the text for that column
//			String numVal = row.select(".colLast").text(); // the numeric value for that key
//			
//			System.out.println("Key: " + text + " Num Value: " + numVal + " Link: " + aHref);
//			if (aHref.toLowerCase().contains("keyevent")) {
//				
//			}
			
			
//			sb.append(row.select(".colLast").text());
			
//			if (sb.toString().startsWith("KEY_LOCATION") ||
//					sb.toString().startsWith("VK_")) {
				
//				System.out.println(sb.toString());
//			}
			
//			sb.delete(0, sb.length());
		}
	}
}
