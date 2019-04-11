import asyncio, socketio, json
from py4j.java_gateway import JavaGateway

# https://github.com/miguelgrinberg/python-socketio/blob/master/examples/client/asyncio/latency_client.py
loop = asyncio.get_event_loop()
sio = socketio.AsyncClient()


def connect_gateway():
    gateway = JavaGateway()
    return gateway

def get_weather():
    print('in get_weather')
    gateway = connect_gateway()
    weather_data = gateway.entry_point.getLastDocument()
    weather_data_json = gateway.entry_point.convertDocToJson(weather_data)
    return weather_data_json


@sio.on('connect')
async def on_connect():
    print('Connected to server')

@sio.on('disconnect')
async def on_disconnect():
    print('Disconnected from server')

@sio.on('weather_data')
async def on_weather_data():
    print('in weather_data')
    weather = get_weather()
    await sio.emit('weather', weather)

@sio.on('update_weather')
async def on_update_weather():
    print('in update_weather')
    await on_weather_data()

async def start_server():
    await sio.connect('http://localhost:3000')
    await sio.wait()


if __name__ == '__main__':
    loop.run_until_complete(start_server())





