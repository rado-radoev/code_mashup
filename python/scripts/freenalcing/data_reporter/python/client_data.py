
'''
This is the client object
it will have the following properties:

self_ip
user (will get those from server)
password  (will get those from server)
url (will get those form server)
update frequencey if not set from sys.argv use the one from the server (defualt 5 min)
'''

class ClientData:
    def __init__(self, ip, user, password, url, upd_frequency):
        self.ip, self.user, self.password, self.url, self.upd_frequency = ip, user, password, url, upd_frequency

    @property
    def ip_address(self):
        return self.ip

    @property
    def update_frequency(self):
        return self.upd_frequency

    def __repr__(self):
        message = f"""
            Client Data: ip:{self.ip_address},
            user: {self.user},
            password: {self.password},
            url: {self.url},
            update_frequency: {self.update_frequency}
        """
        return message

