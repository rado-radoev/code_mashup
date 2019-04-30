from gpiozero import PWMLED
from signal import pause
from time import sleep
import random

led_blue = PWMLED(5)
led_yellow = PWMLED(6)
led_red = PWMLED(13)
led_white = PWMLED(19)
led_green = PWMLED(26)

  

led_blue.pulse()
sleep(random.uniform(.1, 1.))
led_yellow.pulse()
sleep(random.uniform(0.1, 1.0))
led_red.pulse()
sleep(random.uniform(0.1, 1.0))
led_white.pulse()
sleep(random.uniform(0.1, 1.0))
led_green.pulse()
sleep(random.uniform(0.1, 1.0))

pause()
