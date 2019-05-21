#import os
import pigpio
import time
import DHT22
import socket
import json
import pickle
from Client_cl import Socket_Client

pi = pigpio.pi()

s = DHT22.sensor(pi, 4, 17)
s.trigger()
time.sleep(.5)

try:
  while True:
    client = Socket_Client('192.168.86.73', 8888, socket)  
    s.trigger()
    temp = (s.temperature() / 1.)
    humid = (s.humidity() / 1.)
    dic = { "temp": temp, "humid": humid  }
    js = json.dumps(dic)
    pic = pickle.dumps(dic)
    print(js)
    client.send_data('temp_data: {}'.format(js))
    sleep(2)
    #print('Humidity: {:3.2f}'.format(s.humidity() / 1.))
    #print('Temp {:3.2f}'.format(s.temperature() / 1.))
    #data = sock.recv(1024)
    #print('Server said: ' + data.decode())
    #if data.decode() == 'UPD':
    #    temp = '{:3.2f}'.format(s.temperature() / 1.)
    #    print(temp)
    #    humid = '{:3.2f}'.format(s.humidity() / 1.)
    #    print(humid)
    #    j = '"Temp":0'

    #   print(j)

    #    sock.sendall(str.encode(j))
        #sock.sendall(str.encode('Humidity {:3.2f}'.format(s.humidity() / 1.)))
        #sock.sendall(str.encode('Temp {:3.2f}'.format(s.temperature() / 1.)))
        #print(repr(data))
    #time.sleep(2)
except:
    print('closing...')
finally:
  s.cancel()
  pi.stop()
  #socket_client.send_socket_data('EXIT')
