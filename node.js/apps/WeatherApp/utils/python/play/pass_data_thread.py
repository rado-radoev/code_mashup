import threading
import queue

def stringFunc(value, out_queue):
    
    while value <= 20:        
        my_str = f"String no: {value}"
        out_queue.put(my_str)
        value += 1

my_queue = queue.Queue()
thread1 = threading.Thread(stringFunc(1, my_queue))
thread1.start()
thread1.join()

func_value = my_queue.get()
print (func_value)