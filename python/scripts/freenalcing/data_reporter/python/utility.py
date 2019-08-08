import socket

def getIP():
    hostname = socket.gethostname()
    ip = socket.gethostbyname(hostname)
    return (hostname, ip)

print(getIP()[1])