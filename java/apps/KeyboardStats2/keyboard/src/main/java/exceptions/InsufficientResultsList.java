package exceptions;

public class InsufficientResultsList extends IndexOutOfBoundsException {

	private static final long serialVersionUID = 1L;
	
	public InsufficientResultsList() {
		super();
	}
	
	public InsufficientResultsList(String message) {
		super(message);
	}
}
