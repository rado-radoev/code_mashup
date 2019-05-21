import pigpio, socket, pickle, json
from time import sleep
from Client_cl import Socket_Client

# this connects to the pigpio daemon which must be started first
pi = pigpio.pi()
# Pigpio DHT22 module should be in same folder as your program
import DHT22 
s = DHT22.sensor(pi, 4, 17)

try:
    while True:
        client = Socket_Client('192.168.86.73', 8888, socket)
        s.trigger()
        sleep(2.03) # Necessary on faster Raspberry Pi's
        temp = (s.temperature() / 1.)
        humidity = (s.humidity() / 1.)

        dic = { 'temp_data': { 'temp': temp, 'humidity': humidity } }
        js = json.dumps(dic)

        print('{:3.2f}'.format(humidity))
        print('{:3.2f}'.format(temp))

        client.send_data(js)
        client = None
finally:
    s.cancel()
    pi.stop()
