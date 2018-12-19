package buffer;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import exceptions.QueueFullException;
import exceptions.QueueEmptyException;

public class CircularQueue<E> {

	private int currentSize; // Queue size
	private E[] circularQueueElements; 
	private int maxSize; // Queue max size
	
	private int rear;
	private int front;
	
	
	public CircularQueue(int maxSize) {
		this.maxSize = maxSize;
		circularQueueElements = (E[]) new Object[this.maxSize];
		currentSize = 0;
		front = -1;
		rear = -1;
	}
	
	
	public int getCurrentSize() {
		return currentSize;
	}


	public int getMaxSize() {
		return maxSize;
	}


	public void enqueue (E item) throws QueueFullException {
		if (isFull()) {
			throw new QueueFullException("CircularQueue if full. Cannot add element.");
		}
		
		rear = (rear + 1) % circularQueueElements.length;
		circularQueueElements[rear] = item;
		currentSize++;
		
		if (front == -1) front = rear;
	}
	
	
	public E dequeue() throws QueueEmptyException {
		E dequeueElement;
		
		if (isEmpty()) {
			throw new QueueEmptyException("CircularQueue is empty. Element cannot be retrieved.");
		}
		
		dequeueElement = circularQueueElements[front];
		circularQueueElements[front] = null;
		front = (front + 1) % circularQueueElements.length;
		currentSize--;
		
		return dequeueElement;
	}
	
	public List<E> drain() {
		List<E> drainage = new ArrayList<E>();
		for (int i = 0; i <= currentSize; i++) {
			drainage.add(dequeue());
		}
		
		return drainage;
	}
	
	
	public boolean isFull() {
		return currentSize == circularQueueElements.length;
	}
	
	public boolean isEmpty() {
		return currentSize == 0;
	}
	
	
	@Override
	public String toString() {
		return "Circular Queue [" + Arrays.toString(circularQueueElements) + "]";
	}
 }

































