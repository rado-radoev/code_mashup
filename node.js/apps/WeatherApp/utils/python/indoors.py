from Weather import Weather
from threading import Thread
from controller3 import update_indoor_data, on_new_indoor_data
from time import sleep
import pickle, socket, json, socketio
import schedule

class Indoors(Weather):
    pass

HOST = '0.0.0.0'
PORT = 8888

srv = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

try:
    srv.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    srv.bind((HOST, PORT))
except Exception as e:
    print('Binding failed')
    print(e)


srv.listen(0)

def weather_update_request(conn):
    upd_message = 'UPD'
    conn.sendall(upd_message.encode())

def client_thread(conn):
    #schedule.every(1).seconds.do(weather_update_request, conn)
    
    while True:
        #schedule.run_pending()
        sleep(2)
        weather_update_request(conn)
        data = conn.recv(1024)
        if not data:
            break
        else:
            reply = pickle.loads(data)
            print('sending data to contorller')
            update_indoor_data(reply)
            # print(f"Temp: {(reply['temp']): .2f}")
            # print(f"Humidity: {(reply['humid']): .2f}")
            #conn.sendall(data)
    
    conn.close()

if __name__ == '__main__':
    while True:
        conn, addr = srv.accept()
        print(f'Connected with {addr[0]} : {str(addr[1])}')
        th = Thread(target=client_thread, args=(conn,))
        th.start()

    srv.close()