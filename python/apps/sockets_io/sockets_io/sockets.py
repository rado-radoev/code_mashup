import socketio, requests, json, asyncio
sio = socketio.AsyncClient()

#sio = socketio.Client()

def test():
    print('This is the test function')

y = test

async def start_server():
    await sio.connect("http://localhost:3000")
    await sio.wait()

result = start_server()

async def send():
    await sio.emit('createMessage', {"from": "User", "text": "test"}, namespace=None, callback=y)

@sio.on('connect')
async def on_connect():
    print('I\'m connected!')

    await send()



@sio.on('disonnect')
async def on_disconnect():
    print('I\'m disconnected')

async def stop_server():
    await sio.disconnect

#sio.connect("http://localhost:3000")

loop = asyncio.get_event_loop()
future = asyncio.Future()
asyncio.ensure_future(start_server())
loop.run_forever()


# task = loop.create_task(start_server())
# loop.run_until_complete(task)
#
# task = loop.create_task(stop_server())
# loop.run_until_complete(task)


loop.close()





