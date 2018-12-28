
class Server:

    location = {'phx', 'rsm', 'soc'}

    def __init__(self, hostname, role, site, patch_group):
        self.hostname = hostname
        self.role = role
        self.site = site
        self.patch_group = patch_group

    def __str__(self):
        return ('Hostname: {}\tRole: {}\tSite: {}\tPatch Group: {}'.format(self.hostname,self.role,self.site,self.patch_group))
