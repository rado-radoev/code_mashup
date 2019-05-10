import asyncio, socketio, json, sys, socket
from py4j.java_gateway import JavaGateway
from java_gateway import _JavaGateway
from threading import Thread
import socket, pickle

# https://github.com/miguelgrinberg/python-socketio/blob/master/examples/client/asyncio/latency_client.py
loop = asyncio.get_event_loop()
sio = socketio.Client()
global indoor

def connect_gateway():
    gateway = _JavaGateway()
    gateway.entry_point.getMonDb().setMongoCollection("Weather", "Cities")
    return gateway

def get_weather():
    print('in get_weather')
    gateway = connect_gateway()
    weather_data = gateway.entry_point.getLastDocument()
    weather_data_json = gateway.entry_point.convertDocToJson(weather_data)
    print(weather_data_json)
    return weather_data_json

def request_updated_weather(id):
    gateway = connect_gateway()
    gateway.entry_point.setId(id)
    weather_data = gateway.entry_point.getUpdatedWeather()
    weather_data_json = gateway.entry_point.convertDocToJson(weather_data)
    return weather_data_json


def update_indoor_data(data):
    if data:
        data_to_str = json.dumps(data)
        data_to_json = json.loads(data_to_str)
        indoor = data_to_json
       

@sio.on('connect')
def on_connect():
    print('Connected to server')

@sio.on('disconnect')
def on_disconnect():
    print('Disconnected from server')

@sio.on('weather_data')
def on_weather_data():
    print('in weather_data')
    weather = get_weather()
    sio.emit('weather', weather)

@sio.on('update_weather')
def on_update_weather():
    print('in update_weather')
    on_weather_data()

@sio.on('pull_new_weather')
def on_pull_new_weather(id):
    weather = request_updated_weather(id)
    sio.emit('weather', weather)

@sio.on('update_indoor_data')
def on_update_indoor_data():
    print('Indoor data requested')
    if not indoor:
        indoor = -999
    sio.emit('update_indoor', indoor)
    

def start_server():
    print('Started socket io client')
    sio.connect('http://localhost:3000')
    sio.wait()

def socket_client():
    HOST = '0.0.0.0'
    PORT = 8888

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.connect((HOST, PORT))
        s.send('req'.encode())
        data = s.recv(1024)
        print(pickle.loads(data))


if __name__ == '__main__':
    threads = [Thread(target=start_server), Thread(target=socket_client)]
    for t in threads:
        t.daemon = True
        t.start()
    for t in threads:
        t.join()
   
    
    # loop.run_until_complete(start_server())
    sys.stdout.flush()





