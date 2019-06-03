# This file is executed on every boot (including wake-boot from deepsleep)
try:
  import usocket as socket
except:
  import socket

import esp

esp.osdebug(None)

import uos, machine
from machine import Pin

#uos.dupterm(None, 1) # disable REPL on UART(0)

import gc

import webrepl

webrepl.start()

gc.collect()

def do_connect():
    import network
    sta_if = network.WLAN(network.STA_IF)
    if not sta_if.isconnected():
        print('connecting to network...')
        sta_if.active(True)
        sta_if.connect('Legolas', '0bi4amPatet0')
        while not sta_if.isconnected():
            pass
    print('network config:', sta_if.ifconfig())

do_connect()

led = Pin(2, Pin.OUT)