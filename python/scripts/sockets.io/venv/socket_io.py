import socketio, requests, json, asyncio
sio = socketio.AsyncClient()

async def start_server():
    await sio.connect("http://localhost:3000")

@sio.on('connect')
def on_connect():
    print('I\'m connected!')


@sio.on('disonnect')
def on_disconnect():
    print('I\'m disconnected')


start_server()

