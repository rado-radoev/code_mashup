import asyncio, socketio, socket, json, sys
from py4j.java_gateway import JavaGateway
from java_gateway import _JavaGateway
from Client_cl import Socket_Client
from time import sleep
from threading import Thread

# https://github.com/miguelgrinberg/python-socketio/blob/master/examples/client/asyncio/latency_client.py
loop = asyncio.get_event_loop()
sio = socketio.AsyncClient()

class Indoor():
        def __init__(self):
            self.temp_data = None

tempObj = Indoor()

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


def start_socket_client():
    while True:
        client = Socket_Client('192.168.86.73', 8888, socket)
        client.listen()
        tempObj.temp_data = client.get_time_data()
        sleep(2)
        print('received temp data: ', tempObj.temp_data)
     

# async def update_indoor_data(data):
#     print('data received from raspberry: ', data)
#     if data:
#         data_to_str = json.dumps(data)
#         data_to_json = json.loads(data_to_str)
#         indoor = data_to_json
#         #print('json converted data: ', indoor)
#         print('indoor is now', indoor)
#         await sio.emit('update_indoor', data)


@sio.on('connect')
async def on_connect():
    print('Connected to server')

@sio.on('disconnect')
async def on_disconnect():
    print('Disconnected from server')

@sio.on('new_indoor_data')
async def on_new_indoor_data():
    print('test data requested from node')
    print('seding temp data: ', tempObj.temp_data)
    await sio.emit('update_indoor', tempObj.temp_data)

@sio.on('weather_data')
async def on_weather_data():
    print('in weather_data')
    weather = get_weather()
    sio.emit('weather', weather)

@sio.on('update_weather')
async def on_update_weather():
    print('in update_weather')
    await on_weather_data()

@sio.on('pull_new_weather')
async def on_pull_new_weather(id):
    weather = request_updated_weather(id)
    await sio.emit('weather', weather)

# @sio.on('new_indoor_data')
# async def on_new_indoor_data(data):
#     print('Indoor data requested')
#     await sio.emit('update_indoor', data)

async def start_server():
    await sio.connect('http://localhost:3000')
    await sio.wait()


if __name__ == '__main__':
    print('socket client')
    clientThread = Thread(target=start_socket_client, args=())
    clientThread.daemon
    clientThread.start()
    print('socket.io client')
    loop.run_until_complete(start_server())
    sys.stdout.flush()





