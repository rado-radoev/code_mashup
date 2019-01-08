
class Server:

    location = {'phx', 'rsm', 'soc'}

    def __init__(self, hostname, site, patch_group=None, role=None, build_desc=None, td_type=None):
        self.hostname = hostname
        self.role = role
        self.site = site
        self.patch_group = patch_group
        self.build_desc = build_desc
        self.td_type = td_type

    def __str__(self):
        return ('Hostname: {}\tRole: {}\tSite: {}\tPatch Group: {}\tBuild Des: {}\tTD Type: {}'.format(self.hostname,self.role,self.site,self.patch_group, self.build_desc, self.td_type))
