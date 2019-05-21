from time import sleep
from datetime import datetime
import RPi.GPIO as GPIO
import os

GPIO.setmode(GPIO.BCM)

GPIO.setup(21, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

def brightness_controll(brightness):
    if brightness not in range(1,256):
        raise Exception('Value in range 1 - 255 expected. {} provided'.format(brightness))
    os.system('echo {} > /sys/class/backlight/rpi_backlight/brightness'.format(brightness))

def turn_screen_onoff(flip):
    if flip not in (0,1):
        raise Exception('Expected values are 1 or 0. {} provided'.format(flip))

    os.system('echo {} > /sys/class/backlight/rpi_backlight/bl_power'.format(flip))


def keep_screen_on(time_in_seconds):
    print(time_in_seconds)
    while time_in_seconds != 0:
        sleep(1)
        time_in_seconds -= 1
        print(time_in_seconds)

def get_hour():
    return datetime.now().hour

def motion_sensor(callback):
    if GPIO.input(21):
        global counter
        counter += 1
        print('Motion Detected: {0}'.format(counter))
        if get_hour() < 10:
            brightness_controll(30)
        else:
            brightness_controll(255)
        
        turn_screen_onoff(0)
        keep_screen_on(30)
#        os.system('echo 0 > /sys/class/backlight/rpi_backlight/bl_power')
    else:
        turn_screen_onoff(1)
#        os.system('echo 1 > /sys/class/backlight/rpi_backlight/bl_power')

GPIO.add_event_detect(21, GPIO.BOTH, callback=motion_sensor, bouncetime=150)
counter=0

try: 
    while True:
       #sleep(.1)
       pass

finally:
    GPIO.cleanup()
    print('All clear')


