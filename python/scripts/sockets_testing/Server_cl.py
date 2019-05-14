import socket 
import select 
import sys 
from _thread import *

class Socket_Server():

    def __init__(self, host, port, sock):
        self.host = host
        self.port = port
        self.srv = sock.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.srv.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        
        self.list_of_clients = []
        
        self.srv.bind((self.host, self.port))
        self.srv.listen(2)

    def add_clients(self, client):
        self.list_of_clients.append(client)

    def clientthread(self, conn, addr):
        welcome_message = 'Welcome to this chatroom!'
        conn.sendall(welcome_message.encode())

        while True:
            try:
                msg = conn.recv(2048)
                message = msg.decode()

                if message:
                    print(f'< {addr[0]} > {message}')
                    message_to_send = f'< {addr[0]} > {message}'
                    self.broadcast(message_to_send, conn)
                else:
                    self.remove(conn)
                    break

            except:
                continue
    
    def broadcast(self, message, connection):
        for client in self.list_of_clients:
            if client != connection:
                try:
                    client.sendall(message.encode())
                except:
                    client.close()
                    self.remove(client)

    def remove(self, connection):
        if connection in self.list_of_clients:
            self.list_of_clients.remove(connection)

    def start_server(self):
        while True:
            conn, addr = self.srv.accept()
            self.add_clients(conn)
            print(f'{addr[0]} connected')

            start_new_thread(self.clientthread, (conn, addr))
        
        conn.close()
        self.srv.close()

if __name__ == '__main__':
    server = Socket_Server('192.168.86.73', 8888, socket)
    server.start_server()