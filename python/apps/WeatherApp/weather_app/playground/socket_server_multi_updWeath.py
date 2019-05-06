import socket, sys
from threading import Thread
from time import sleep
import schedule
import json

host = ''
port = 8888

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

print('Socket Created')

try:
    s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    #s.setblocking(0)
    s.bind((host, port))
except:
    print('Binding failed')
    sys.exit()

print('Socket has been bounded')

s.listen(10)

print('Socket is ready')

def pp():
    print('This')

def weather_update_request(conn):
    upd_message = 'UPD'
    print('Sending ' + upd_message)

    conn.send(upd_message.encode())

def clientthread(conn):
    welcome_message = 'Welcome to the server. Update my weather now'
    conn.send(welcome_message.encode())

    while True:
        sleep(2)
        print('Request update')
        weather_update_request(conn)
        #conn.sendall(data)

        data = conn.recv(1024)
        reply = data.decode()
        j = json.dumps(reply)
        if not data:
            break
        o = json.loads(j)
        print(o['temp'])

    conn.close()

def clientthread1(conn):
    welcome_message = 'Welcome to the server. Update my weather now'
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