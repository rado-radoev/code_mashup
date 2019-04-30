from gpiozero import MotionSensor
from signal import pause

pir = MotionSensor(21)

pir.when_no_motion()
print('no motion')

pir.when_motion()
print('motion')

pause()

