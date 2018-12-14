import java.util.ArrayList;

public class CircularBuffer<Integer> {


	private int capacity;
	private int head;
	private int tail;
	private int data[];
	
	public CircularBuffer(int capacity) throws BufferIOException {
		this.capacity = capacity;
		head = 0;
		tail = 0;
		data = new int[capacity];
	}
	
	public void write(int value) throws BufferIOException {
		
		if (isBufferFull()) {
			throw new ExpectedException("Tried to write to full buffer");
		}
		
		data[tail++] = value;
		
		tail++;
		if (tail == data.length) tail = 0;
	}
	
	public int read() throws BufferIOException {
		
		if (isBufferEmpty())
			throw new ExpectedException("Tried to read from empty buffer");
		

		int value = data[head++];
		
		head++;
		if (head == data.length) head = 0;
		
		return value;
	}
	
	public void overwrite(int value) throws BufferIOException {
		if (tail <= capacity) write(value);
		else data[head] = value;
		
		head++;
		
	}
	
	public void clear() {
		head = 0; tail = 0;
		
	}
	
	private boolean isBufferFull() {
		if (tail + 1 == head) return true;
		if (tail == (data.length - 1) && head == 0) return true;
		
		return false;
	}
	
	private boolean isBufferEmpty() {
		return head == 0 && tail == 0;
	}
}
