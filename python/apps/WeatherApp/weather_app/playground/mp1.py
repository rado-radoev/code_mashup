from multiprocessing import Process, Pipe

indoor = 222

def writer(count, p_input):
    for ii in range(0, count):
        p_input.send(ii)             # Write 'count' numbers into the input pipe
    p_input.send('DONE')

def f(conn):
    global indoor
    indoor = 999
    conn.send(indoor)
    conn.close()

def get_indoor(conn):
    global indoor
    conn.send(indoor)
    conn.close()