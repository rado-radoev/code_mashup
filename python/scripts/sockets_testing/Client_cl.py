import socket 
import select 
import sys 

class Socket_Client():
    
    def __init__(self, host, port, sock):
        self.srv = sock.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.host = host
        self.port = port
        self.time_data = None

        self.srv.connect((self.host, self.port))

    def listen(self):
        server = self.srv
        while True:
            socket_list = [server]

            read_sockets, write_socket, error_socket = select.select(socket_list, [], [])

            for socks in read_sockets:
                if socks == server:
                    msg = socks.recv(2048)
                    message = msg.decode()
                    self.time_data = message
        
            if 'temp_data' in self.time_data:
                server.close()
                return
                # return self.get_time_data()


    def get_time_data(self):
        return self.time_data

    def send_data(self, data):
        if data:
            message = data.encode()
            server = self.srv
            server.sendall(message)
            print(f'{data} broadcasted')
        
        # server.close()

if __name__ == '__main__':
    client = Socket_Client('192.168.86.73', 8888, socket)
    client.listen()
    client.send_data('data to be send')