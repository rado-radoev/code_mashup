import os
import pigpio
import time

pi = pigpio.pi()
import DHT22
s = DHT22.sensor(pi, 4, 17)
s.trigger()
time.sleep(.5)

try:
  while (True): 
    s.trigger()
    print('Humidity: {:3.2f}'.format(s.humidity() / 1.))
    print('Temp {:3.2f}'.format(s.temperature() / 1.))
    time.sleep(2)
except:
    print('closing...')
finally:
  s.cancel()
  pi.stop()
