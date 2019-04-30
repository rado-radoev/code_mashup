from gpiozero import MotionSensor, LED
from signal import pause

pir = MotionSensor(21)
led = LED(1)

def act():
#    print(param)
    led.on
def act_off():
    #print(param)
    led.off

pir.when_motion = act
pir.when_no_motion = act_off

while True:
    pir.wait_for_motion()
    #print("Motion detected!")
    #pir.wait_for_no_motion()
    #print('no motion')

pause()
