import socket, sys
from threading import Thread


host = ''
port = 8888

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

print('Socket Created')

try:
    s.bind((host, port))
except:
    print('Binding failed')
    sys.exit()

print('Socket has been bounded')

s.listen(10)

print('Socket is ready')

def clientthread(conn):
    welcome_message = 'Welcome to the server. Type something and hit enter'
    conn.send(welcome_message.encode())

    while True:
        data = conn.recv(1024)
        reply = 'OK.' + data.decode()
        if not data:
            break
        print(reply)
        conn.sendall(data)
    
    conn.close()

while True:
    conn, addr = s.accept()
    print('Connected with ' + addr[0] + ':' + str(addr[1]))
    th = Thread(target = clientthread,  args = (conn,))
    th.start()

s.close(0)