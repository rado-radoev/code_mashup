from Client_cl import Socket_Client
import socket
from time import sleep

indoor = None

while 1:
    cl = Socket_Client('127.0.0.1', 8888, socket)
    # cl.send_data('daaaaattaaaaaaa')
    # indoor = cl.listen()
    # print(indoor)
    # sleep(2)
    cl.listen()
    indoor = cl.get_time_data()
    print(indoor)
    sleep(2)