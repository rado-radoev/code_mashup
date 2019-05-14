from Client_cl import Socket_Client
import socket
from time import sleep

while True:
    cl = Socket_Client('127.0.0.1', 8888, socket)
    cl.send_data('daaaaattaaaaaaa')
    sleep(2)