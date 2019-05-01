import asyncio, socketio, json, sys
from py4j.java_gateway import JavaGateway
from java_gateway import _JavaGateway

# https://github.com/miguelgrinberg/python-socketio/blob/master/examples/client/asyncio/latency_client.py
loop = asyncio.get_event_loop()
sio = socketio.AsyncClient()

def connect_gateway():
    gateway = _JavaGateway()
    gateway.entry_point.getMonDb().setMongoCollection("Weather", "indoor__weather")
    return gateway

def get_weather():
    print('getting indoor weather')
    gateway = connect_gateway()
    weather_data = gateway.entry_point.setIndoorIndexes("{temp: 25, humidity: 45.2}")


if __name__ == "__main__":
    get_weather()