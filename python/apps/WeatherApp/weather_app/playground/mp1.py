from multiprocessing import Process, Pipe

def writer(count, p_input):
    for ii in range(0, count):
        p_input.send(ii)             # Write 'count' numbers into the input pipe
    p_input.send('DONE')