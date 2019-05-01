import threading
import queue

def stringFunc(value, out_queue):
    
    while value <= 20:        
        my_str = f"String no: {value}"
        out_queue.put_nowait(my_str)
        print("size {0}".format(out_queue.qsize()))
        value += 1

my_queue = queue.Queue()
thread1 = threading.Thread(stringFunc(1, my_queue))
thread1.start()
thread1.join()

while not my_queue.empty():
    func_value = my_queue.get()
    print (func_value)