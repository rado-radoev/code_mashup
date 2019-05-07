from Weather import Weather
from threading import Thread
from time import sleep
import pickle, socket, json

class Indoors(Weather):
    pass


HOST = '0.0.0.0'
PORT = 8888

srv = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

try:
    srv.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    srv.bind((host, port))
except Exception as e:
    print('Binding failed')
    print(e)


srv.listen(0)

def weather_update_request(conn):
    upd_message = 'UPD'
    conn.sendall(upd_message.encode())

