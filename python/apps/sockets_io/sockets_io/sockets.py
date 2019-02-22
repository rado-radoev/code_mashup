import socketio, requests, json, asyncio
sio = socketio.AsyncClient()

#sio = socketio.Client()

def test():
    print('This is the test function')

y = test

async def start_server():
    await sio.connect("http://localhost:3000")

@sio.on('connect')
def on_connect():
    print('I\'m connected!')

    sio.emit('createMessage', {"from": "User", "text": "test"}, namespace=None, callback=y)



@sio.on('disonnect')
def on_disconnect():
    print('I\'m disconnected')

#sio.connect("http://localhost:3000")

loop = asyncio.get_event_loop()
loop.run_until_complete(start_server())
loop.close()
