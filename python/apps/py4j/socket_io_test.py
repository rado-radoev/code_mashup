import socketio

sio = socketio.Client()

@sio.on('connect')
def on_connect():
    print('Connection established')

@sio.on('my message')
def on_message(data):
    print('message received with ', data)

@sio.on('disconnect')
def on_disconnect():
    print('Disconnected from server')

sio.connect('http://localhost:3000')
sio.wait