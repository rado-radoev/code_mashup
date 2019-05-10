import socket, sys
from threading import Thread
import threading
from time import sleep
import json
import pickle
import schedule
import functools

host = ''
port = 8888
tem_hum = -999

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

def pp(conn):
    print('in pp func')
    while True:
        sleep(1)
        data = conn.recv(1024)
        if data:
            print('data received')
            msg = pickle.loads(data)
            print('unpacked')
            if data == 'req':
                print('data is reqeusted')
                conn.sendall(pickle.dumps(tem_hum))
    

def weather_update_request(conn):
    upd_message = 'UPD'
    print('Sending ' + upd_message)

    conn.sendall(upd_message.encode())

lock = threading.Lock()
def clientthread2(conn):
    schedule.every(1).seconds.do(weather_update_request, conn)
            
    global tem_hum
    while True:
        sleep(3)
        schedule.run_pending()

        data = conn.recv(1024)
        if not data:
            break
        else:
            reply = pickle.loads(data)
            # print(f"Temp: {(reply['temp']): .2f}")
            # print(f"Humidity: {(reply['humid']): .2f}")      
            with lock:
                tem_hum = reply

    conn.close()

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
        if not data:
            break
        print (reply)

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

def main():
    global s
    while True:
        conn, addr = s.accept()
        print('Connected with ' + addr[0] + ':' + str(addr[1]))
        th = Thread(target = clientthread2,  args = (conn,))
        th2 = Thread(target=pp, args=conn)
        th.start()
        th2.start()
        # th.join()
        # print(pp())

    s.close()

# main()