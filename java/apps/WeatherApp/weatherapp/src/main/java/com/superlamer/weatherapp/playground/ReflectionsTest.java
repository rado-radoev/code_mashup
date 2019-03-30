package com.superlamer.weatherapp.playground;

import java.lang.reflect.Field;
import java.lang.reflect.Method;

import com.superlamer.weatherapp.weather.WeatherQuery;

public class ReflectionsTest {
	
	private static WeatherQuery wq = new WeatherQuery();
	
	public static void main(String[] args) throws IllegalAccessException, NoSuchFieldException, ClassNotFoundException, InstantiationException {
		Field[] fields = wq.getClass().getDeclaredFields();
		Method[] methods = wq.getClass().getMethods();

		for (Method method : methods) {
			//System.out.println(method.getName());
		}
		
		

		for (Field field : fields) {
			String cl = field.getGenericType().getTypeName();
			
			Class<?> c = Class.forName(cl);
			Object t = c.newInstance();
			Method[] allMethods = c.getDeclaredMethods();
			for (Method meth : allMethods) {
				String mname = meth.getName();
				System.out.println(mname);
				System.out.println(mname.getClass().getSimpleName());
				System.out.println("------");
//				if (mname.toLowerCase().trim().matches("toDocument")) {
//					meth.getName();
//				}
			}
			
			Field[] objFields = field.getType().getDeclaredFields();
			for (Field objField : objFields) {
				//System.out.println("\t" +objField.getName());
			}
		}
		
	}	
}
