# This file is executed on every boot (including wake-boot from deepsleep)
try:
  import usocket as socket
except:
  import socket

from machine import Pin
from umqttsample import MQTTClient
import esp
import uos, machine
import gc
import webrepl
import network
import time
import ubinascii
import machine
import micropython

#uos.dupterm(None, 1) # disable REPL on UART(0)

def do_connect():
    sta_if = network.WLAN(network.STA_IF)
    ap_if = network.WLAN(network.AP_IF)
    if ap_if.active():
      ap_if.active(False)

    if not sta_if.isconnected():
        print('connecting to network...')
        sta_if.active(True)
        sta_if.connect('Legolas', '0bi4amPatet0')
        while not sta_if.isconnected():
            pass
    print('network config:', sta_if.ifconfig())

mqtt_server = '192.168.86.71'
client_id = ubinascii.hexlify(machine.unique_id())
topic_sub = b'hello'
topic_pub = b'notification'

last_messsage = 0
message_interval = 5
counter = 0

esp.osdebug(None)
webrepl.start()
gc.collect()

do_connect()

