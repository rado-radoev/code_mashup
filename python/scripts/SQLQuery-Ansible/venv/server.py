
class Server:

    location = {'phx', 'rsm', 'soc'}

    def __init__(self, hostname, role, site, patch_group):
        self.hostname = hostname
        self.role = role
        self.site = site
        self.patch_group = patch_group

    def __str__(self):
        return (f'Hostname: {self.hostname}\t'
                f'Role: {self.role}\t'
                f'Site: {self.site}\t'
                f'Patch Group: {self.patch_group}')
