import pyodbc
from server import Server
# ansibledata.dbo.AnsibleNonInfrastructure
def connect_to_db(dbo, query=""):
    '''Connects to SQL DB and grabs all columns.
    Returns cursor object
    '''
    # Connect to SQL Express from Windows
    cnxn = pyodbc.connect(
        'Driver={SQL Server};Server=PRSMCTXSDK1\SQLEXPRESS;Database=ansibledata;Trusted_Connection=yes;')

    # Connect to SQL Express from Linux
    # cnxn = pyodbc.connect('DSN=ansibledata')

    cursor = cnxn.cursor()
    if query == "":
        query = "SELECT * FROM {}".format(dbo)

    cursor.execute(query)

    return (cursor, cnxn)

def get_column_names(cursor):
    colum_names = []

    for row in cursor.description:
        colum_names.append(row[0].strip().lower())

    return colum_names

def get_db_data(cursor):
    columns = get_column_names(cursor)
    server_list = []

    if "patchgroup" in columns:
        server_list = get_infra_servers_from_db(cursor)
    elif "builddesc" in columns:
        server_list = get_non_infra_servers_from_db(cursor)

    return server_list

def get_infra_servers_from_db(cursor):

    server_list = []

    # Sanitize all the data
    for row in cursor:
        hostname = row[0].strip().lower()
        site = row[1].strip().lower()
        role = row[2].strip().lower()
        patch_group = row[3].strip()

        server_list.append(Server(hostname=hostname, role=role, site=site, patch_group=patch_group))

    return server_list

def get_non_infra_servers_from_db(cursor):
    server_list = []

    # Sanitize all the data
    for row in cursor:
        hostname = row[0].strip().lower()
        site = row[1].strip().lower()
        build_desc = row[2].strip().lower()
        td_type = row[3].strip()

        server_list.append(Server(hostname=hostname, build_desc=build_desc, site=site, td_type=td_type))

    return server_list

def close_db_connection(cursor, cnxn):
    cursor.close()
    cnxn.close()