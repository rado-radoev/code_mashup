import os
import pigpio
import time
import DHT22
import socket
import json
import pickle

HOST = '192.168.86.73'
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
    data = sock.recv(1024)
    if data.decode() == 'UPD':
        temp = (s.temperature() / 1.)
        humid = (s.humidity() / 1.)
        dic = { "temp": temp, "humid": humid  }
        pic = pickle.dumps(('indoor_data', dic))
        print(pic)
        sock.sendall(pic)
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
