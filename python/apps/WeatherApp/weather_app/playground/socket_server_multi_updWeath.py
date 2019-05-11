import socket, sys
from threading import Thread
import threading
from time import sleep
import json
import pickle
import schedule
import functools

class SocketServer():
    host = ''
    port = 8888
    tem_hum = None
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    def __init__(self):
        
        print('Socket Created')
        try:
            self.s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            #s.setblocking(0)
            self.s.bind((self.host, self.port))
        except:
            print('Binding failed')
            sys.exit()

        print('Socket has been bounded')

        self.s.listen(10)

        print('Socket is ready')
    

def pp(self):
    print(tem_hum)  

def weather_update_request(self, conn):
    upd_message = 'UPD'
    print('Sending ' + upd_message)

    conn.sendall(upd_message.encode())

lock = threading.Lock()
def clientthread2(self, conn):
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
                set_temp_data(reply)

    conn.close()

    def set_temp_data(self, temp_data):
        global tem_hum
        tem_hum = temp_data


    def get_temp_data(self):
        global tem_hum
        a = tem_hum
        return a

    def clientthread(self, conn):
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

    def clientthread1(self, conn):
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
    
    def close(self):
        self.s.close()

def main():
    s = SocketServer()
    while True:
        conn, addr = s.accept()
        print('Connected with ' + addr[0] + ':' + str(addr[1]))
        th = Thread(target = clientthread2,  args = (conn,))
        th.daemon = True
        th.start()
        # th.join()
        print(get_temp_data())

    s.close()

main()