import socketio
from py4j.java_gateway import JavaGateway

gateway = JavaGateway()
sio = socketio.Client()

weather = gateway.entry_point.getWeather()

@sio.on('connect')
def on_connect():
    print('Connection established')



@sio.on('disconnect')
def on_disconnect():
    print('Session disconnected')

sio.connect('http://localhost:3000')
sio.emit('weather_message', {'Lon' : weather.getCoord().getLon(),
                             'Lat': weather.getCoord().getLat()})
sio.wait()