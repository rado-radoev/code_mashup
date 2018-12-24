import pyodbc
import json
from server import Server

cnxn = pyodbc.connect('Driver={SQL Server};'
                      'Server=PRSMCTXSDK1\SQLEXPRESS;'
                      'Database=ansibledata;'
                      'Trusted_Connection=yes;')


cursor = cnxn.cursor()
cursor.execute('SELECT * FROM ansibledata.dbo.hostdata')

servers = []
inventory = {'all':{'children'}}

for row in cursor:
    hostname = row[0].strip()
    role = row[1].strip()
    site = row[2].strip()
    patch_group = row[3].strip()

    servers.append(Server(hostname=hostname, role=role, site=site, patch_group=patch_group))

cursor.close

def json_list(list):
    lst = []
    for srv in list:
        s = {}
        s['hostname'] = srv.hostname
        s['role'] = srv.role
        s['site'] = srv.site
        s['patch_group'] = srv.patch_group
        lst.append(s)

    return json.dumps(lst)


print(inventory)


