import pigpio
import time
import DHT22
import json


pi = pigpio.pi()
s = DHT22.sensor(pi, 4, 17)
s.trigger()
time.sleep(.5)

try:
  while True:
    s.trigger()
    temp = (s.temperature() / 1.)
    humid = (s.humidity() / 1.)
    dic = { "temp": temp, "humid": humid  }
    js = json.dumps(dic)
    print(js)
    sleep(2)
except:
    print('closing...')
finally:
  s.cancel()
  pi.stop()