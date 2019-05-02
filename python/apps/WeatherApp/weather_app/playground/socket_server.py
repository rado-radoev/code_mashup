import socket
import selectors

HOST = ''
PORT = 65432

# sel = selectors.DefaultSelector()

# lscok = socket.sokcet(socket.AF_INET, socket.SOCK_STREAM)
# lsock.bind((HOST, PORT))
# lsock.listen()
# print ('listening on', (HOST, PORT))
# lsock.setblocking(False)
# sel.register(lsock, selectors.EVENT_READ, data)

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOST, PORT))
    s.listen()
    conn, addr = s.accept()

    with conn:
        print('Connected by', addr)
        while True:
            data = conn.recv(1024)
            
            if data:
                print(repr(data))
                if data.decode('ascii') == 'EXIT':
                    break
            conn.sendall(data)