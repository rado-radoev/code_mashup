from multiprocessing import Process, Pipe
from mp1 import writer
import time

def reader_proc(pipe):
    ## Read from the pipe; this will be spawned as a separate Process
    p_output, p_input = pipe
    p_input.close()    # We are only reading
    while True:
        msg = p_output.recv()    # Read from the output pipe and do nothing
        if msg=='DONE':
            break

if __name__ == '__main__':
    for count in [10**4, 10**5, 10**6]:
        # Pipes are unidirectional with two endpoints:  p_input ------> p_output
        p_output, p_input = Pipe() # writer() writes to p_input from _this_ process
        reader_p = Process(target=reader_proc, args=((p_output, p_input),))
        reader_p.daemon = True
        reader_p.start()

        p_output.close()
        _start = time.time()
        writer(count, p_input)
        p_input.close()
        reader_p.join()
        print("Sending {0} numbers to Pipe() took {1} seconds".format(count,
            (time.time() - _start)))