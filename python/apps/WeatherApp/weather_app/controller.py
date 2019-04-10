from py4j.java_gateway import JavaGateway
import json
import socketio

gateway = JavaGateway()
weather_data = gateway.entry_point.getLastDocument()
json_str = gateway.entry_point.convertDocToJson(weather_data)
print(json_str)

sio = socketio.Client()

@sio.on('connect')
def on_connect():
    print('connection established')

@sio.on('disconnect')
def on_disconnect():
    print('disconnected from server')

def convert_json_to_obj(source_json):
    x = json.loads(source_json)
    print(x["city"]['city'])

@sio.on('weather_data')
def on_weather_data():
    data_obj = convert_json_to_obj(json_str)
    sio.emit('weather_data', json_str)

@sio.on('update_weather')
def on_update_weather(cityName):
    updated_weather = gateway.entry_point.updateWeather(cityName)
    sio.emit('update_weather', updated_weather)


# implement method to query weather from the java server

sio.connect('http://localhost:3000')
on_weather_data()
sio.wait()




    
