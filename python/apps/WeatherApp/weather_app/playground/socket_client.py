import socket
HOST = '192.168.86.73'
PORT = 65432

def send_socket_data(data_to_send):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.connect((HOST, PORT))
        s.sendall(str.encode(data_to_send))
        data = s.recv(1024)
        return data

data = send_socket_data('this is a test')
print ('Received', repr(data))