package com.KeyboardStats2.stat;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.jnativehook.GlobalScreen;
import org.jnativehook.NativeHookException;
import org.jnativehook.keyboard.NativeKeyEvent;
import org.jnativehook.keyboard.NativeKeyListener;

import buffer.CircularQueue;
import stats.Statistics;

public class KeyListener2 implements NativeKeyListener {
	
	private CircularQueue<String> buffer = new CircularQueue<String>(20);
	
	public void nativeKeyPressed(NativeKeyEvent e) {
		//System.out.println(NativeKeyEvent.getKeyText(e.getKeyCode()));
		buffer.enqueue(NativeKeyEvent.getKeyText(e.getKeyCode()));
		//System.out.println(buffer);
		if (e.getKeyCode() == NativeKeyEvent.VC_ESCAPE) {
			try {
				GlobalScreen.unregisterNativeHook();
			} catch (NativeHookException e1) {
				e1.printStackTrace();
			}
		}
		
		
		if (buffer.getCurrentSize() == buffer.getMaxSize() - 1) {
			
			List<String> drainedBuffer = buffer.drain();
			
			for (String key : drainedBuffer) {
				Statistics.loadOccurances(key);
			}
		Statistics.displayStats();
		}
	}

	public void nativeKeyReleased(NativeKeyEvent e) {
		//System.out.println("Key Released: " + NativeKeyEvent.getKeyText(e.getKeyCode()));
	}

	public void nativeKeyTyped(NativeKeyEvent e) {
		//System.out.println("Key Typed: " + NativeKeyEvent.getKeyText(e.getKeyCode()));
	}

	public static void main(String[] args) {
		try {
			// Get the logger for "org.jnativehook" and set the level to warning.
			Logger logger = Logger.getLogger(GlobalScreen.class.getPackage().getName());
			logger.setLevel(Level.WARNING);

			// Don't forget to disable the parent handlers.
			logger.setUseParentHandlers(false);
			
			GlobalScreen.registerNativeHook();
		}
		catch (NativeHookException ex) {
			System.err.println("There was a problem registering the native hook.");
			System.err.println(ex.getMessage());

			System.exit(1);
		}
		GlobalScreen.addNativeKeyListener(new KeyListener2());
	} 
}