#!/usr/bin/env python

import pyodbc
import json
import sys
import argparse

try:
    from server import Server
except ImportError:
    print("Are you missing server.py", )
    sys.exit(1)

'''Connect to SQL Database and query Citrix Servers.'''
class Query_Inventory(object):

    def __init__(self):
        self.read_cli_args()
        self.servers = []
        self.inventory = self.build_empty_inventory()

        # Called with `--list`.
        if self.args.list:
            self.get_data_from_db()
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
        inventory['ungrouped'] = {}

        return inventory

    def get_data_from_db(self):
        '''Connects to SQL DB and grabs all columns.
        Constructs server object from query
        '''
        cnxn = pyodbc.connect('Driver={SQL Server};'
                              'Server=PRSMCTXSDK1\SQLEXPRESS;'
                              'Database=ansibledata;'
                              'Trusted_Connection=yes;')

        cursor = cnxn.cursor()
        cursor.execute('SELECT * FROM ansibledata.dbo.hostdata')

        for row in cursor:
            hostname = row[0].strip().lower()
            role = row[1].strip().lower()
            site = row[2].strip().lower()
            patch_group = row[3].strip().lower()

            self.servers.append(Server(hostname=hostname, role=role, site=site, patch_group=patch_group))

        cursor.close

    def generate_group_name(self, site, role):
        '''Generate server group off site and role'''
        return '{}_{}'.format(site, role)

    def load_inventory(self, server_list):
        '''Generate inventory object from list of server objects'''
        inv = self.inventory
        for srv in server_list:

            key = self.generate_group_name(srv.site, srv.role)

            if key not in inv:
                inv[key] = {}
                inv[key]['hosts'] = []
                inv[key]['vars'] = {'group_vars' : None}
                inv['all']['children'].append(key)

            if srv.hostname not in inv[key]['hosts']:
                inv[key]['hosts'].append(srv.hostname)

            if srv.hostname not in inv['all']['hosts']:
                inv['all']['hosts'].append(srv.hostname)

            if srv.hostname not in inv['_meta']['hostvars']:
                inv['_meta']['hostvars'][srv.hostname] = {}

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