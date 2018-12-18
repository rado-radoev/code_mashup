package com.superklamer.keyboardstats.buffer;

import com.superklamer.keyboardstats.exceptions.*;

public class CircularBuffer<E> {


	private int capacity;
	private int head;
	private int tail;
	private int size;
	private int data[];
	
	public CircularBuffer(int capacity) throws BufferIOException {
		this.capacity = capacity;
		head = 0;
		tail = 0;
		size = 0;
		data = new int[capacity];
	}
	
	public void write(int value) throws BufferIOException {
		
		if (isBufferFull()) {
			throw new BufferIOException("Tried to write to full buffer");
		}
		
		data[tail] = value;
		tail = (tail + 1) % capacity;
		size++;
	}
	
	public int read() throws BufferIOException {
		
		if (isBufferEmpty())
			throw new BufferIOException("Tried to read from empty buffer");
		

		int value = data[head];
		head = (head + 1) % capacity;
		size--;
		
		return value;
	}
	
	public void overwrite(int value) throws BufferIOException {
		if (size < capacity) write(value);
		else {
			data[head] = value;
			head = (head + 1) % capacity;	
		}
		
		
		
	}
	
	public void clear() {
		head = 0; tail = 0; size = 0;
		
	}
	
	private boolean isBufferFull() {
		return size == capacity;
		
		
	}
	
	private boolean isBufferEmpty() {
		return size == 0;
	}
}
