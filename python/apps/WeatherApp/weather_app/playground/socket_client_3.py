import os
import pigpio
import time

import socket
import json
import pickle

HOST = '0.0.0.0'
PORT = 8888

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.connect((HOST, PORT))

pi = pigpio.pi()

s = DHT22.sensor(pi, 4, 17)
s.trigger()
time.sleep(.5)



try:
  while (True): 
    s.trigger()
    temp = (s.temperature() / 1.)
    humid = (s.humidity() / 1.)
    dic = { "temp": temp, "humid": humid  }
    pic = pickle.dumps(dic)
    print(pic)
    sock.sendall(pic)
except:
    print('closing...')
finally:
  s.cancel()
  pi.stop()