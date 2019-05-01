from gpiozero.pins.pigpio import PiGPIOFactory
from time import sleep
import pigpio
import DHT22

factory = PiGPIOFactory(host='192.168.86.71')

pi = pigpio.pi(pin_factory=factory)
s = DHT22.sensor(pi, 4, 17)
s.trigger()
sleep(.5)

try:
    while True:
        s.trigger()
        print('Humidity: {:3.2f}'.format(s.humidity() / 1.))
        print('Temp {:3.2f}'.format(s.temperature() / 1.))
        sleep(2)
except:
    print('closing...')
finally:
    s.cancel()
    pi.stop()