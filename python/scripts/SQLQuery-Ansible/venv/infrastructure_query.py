#!/usr/bin/ python

import json
import sys
import argparse
from utility import *
from database import *

try:
    from server import Server
except ImportError:
    print("Are you missing server.py", )
    sys.exit(1)

pyodbc.pooling = False

'''Connect to SQL Database and query Citrix Servers.'''
class Query_Inventory(object):

    def __init__(self):
        self.read_cli_args()
        self.servers = []
        self.inventory = self.build_empty_inventory()

        # Called with `--list`.
        if self.args.list:

            db = connect_to_db('ansibledata.dbo.AnsibleInfrastructure')
            cursor = db[0]
            get_infra_servers_from_db(cursor, self.servers)
            close_db_connection(*db)

            self.inventory = self.load_inventory(self.servers)
        # Called with `--host [hostname]`.
        elif self.args.host:
            # Not implemented, since we return _meta info `--list`.
            self.inventory = self.empty_inventory()
        # If no groups or vars are present, return an empty inventory.
        else:
            self.inventory = self.empty_inventory()

        self.convert_to_json(self.inventory)


    def build_empty_inventory(self):
        '''Build empty inventory dictionary with default structure.
        :return: empty dictionary
        '''
        inventory = dict()
        inventory['_meta'] = {'hostvars': {}}
        inventory['all'] = {'children': []}
        inventory['all']['hosts'] = []

        return inventory

    def load_inventory(self, server_list):
        '''Generate inventory object from list of server objects'''
        inv = self.inventory
        for srv in server_list:

            hostname = srv.hostname

            # Check if server is in correct site
            site = validate_site(srv.hostname, srv.site)

            # Groups consist of the server site and the server role
            key = generate_group_name(site, srv.role)
            # Reboot groups are determined in SQL
            patch_group = 'patch_group_' + srv.patch_group

            dict_keys = [site, key, patch_group]

            # Checking if the server group already exists and if it doesn't
            # The dictionory is created
            # group_vars is a dummy key/value pair for future use
            for dict_key in dict_keys:
                add_dict_key(inv, dict_key)
                add_dict_entry(hostname, inv, dict_key)


            if key not in inv:
                inv[key] = {}
                inv[key]['hosts'] = []
                inv[key]['vars'] = {'group_vars' : False}
                inv['all']['children'].append(key)

            # region all and _meta entries
            add_dict_entry(hostname, inv, 'all')

            # host_specifc_vars is a dummy key/value pair for future use
            add_dict_entry(hostname, inv, "_meta")
            # endregion

        # inv is returning a dictionary that will be converted to JSON
        return inv

    def read_cli_args(self):
        '''Read command line arguments'''
        parser = argparse.ArgumentParser()
        parser.add_argument('--list', action='store_true')
        parser.add_argument('--host', action='store')
        self.args = parser.parse_args()

    def empty_inventory(self):
        '''Return empty dictionary'''
        return {'_meta' : {'hostvars':{}}}

    def convert_to_json(self, dict_to_convert):
        '''Convert the inventory dictionary to JSON object and output to STDOUT'''
        json_dict = json.dumps(dict_to_convert)
        sys.stdout.write(json_dict); sys.stdout.flush()


# Get the inventory
Query_Inventory()