from time import sleep
import RPi.GPIO as GPIO
import os

GPIO.setmode(GPIO.BCM)

GPIO.setup(21, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

def motion_sensor(callback):
    if GPIO.input(21):
        global counter
        counter += 1
        print('Motion Detected: {0}'.format(counter))
        os.system('echo 0 > /sys/class/backlight/rpi_backlight/bl_power')
    else:
        os.system('echo 1 > /sys/class/backlight/rpi_backlight/bl_power')

GPIO.add_event_detect(21, GPIO.BOTH, callback=motion_sensor, bouncetime=150)
counter=0

try: 
    while True:
       #sleep(.1)
       pass

finally:
    GPIO.cleanup()
    print('All clear')


