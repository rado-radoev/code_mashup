package unused;

import java.nio.ByteBuffer;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.jnativehook.GlobalScreen;
import org.jnativehook.NativeHookException;
import org.jnativehook.keyboard.NativeKeyEvent;
import org.jnativehook.keyboard.NativeKeyListener;

import buffer.CircularQueue;

public class KeyListener implements NativeKeyListener {
	
	private CircularQueue buffer = new CircularQueue<String>(3);
	private static Map<String, Integer> occurances = new HashMap<String, Integer>();
	
	public void nativeKeyPressed(NativeKeyEvent e) {
		String keyPressed = NativeKeyEvent.getKeyText(e.getKeyCode());
		System.out.println("Key Pressed: " + keyPressed);
		buffer.enqueue(keyPressed);
		System.out.println(buffer);
		
		if (e.getKeyCode() == NativeKeyEvent.VC_ESCAPE) {
			try {
				GlobalScreen.unregisterNativeHook();
			} catch (NativeHookException e1) {
				e1.printStackTrace();
			}
		}
		
		
		if (buffer.getCurrentSize() == buffer.getMaxSize() -1) {
			StringBuffer sb = new StringBuffer();
			
			for (int i = 0; i <= buffer.getCurrentSize(); i++) {
				sb.append(buffer.dequeue());
				if (occurances.containsKey(sb.toString())) {
					occurances.put(sb.toString(), occurances.get(sb.toString()) + 1);
				}
				else {
					occurances.put(sb.toString(), 1);
				}

				sb.delete(0, sb.length());
			}
			
			
			for (String key : occurances.keySet()) {
				System.out.println("Key: " + key + " Value: " + occurances.get(key));
			}
			
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

		GlobalScreen.addNativeKeyListener(new KeyListener());
		
	}
}