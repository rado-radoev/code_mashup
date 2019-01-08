import json

def is_host_match_site(server, site):
    '''Funciton will check if the server is in the right location.
    It will extract the site location from the server name and match it
    to the site location in the db. If they do not match, the server name
    will be used as correct location'''
    if server.startswith('soc'):
        server_name_prefix = server[:3]
    else:
        server_name_prefix = server[1:4]

    if server_name_prefix not in ('soc', 'phx', 'rsm'):
        server_name_prefix = site

    return (server_name_prefix == site, server_name_prefix)


def validate_site(server, site):
    s = None
    srv_site = is_host_match_site(server, site)
    if not srv_site[0]:
        s = srv_site[1]
    else:
        s = site

    return s

def generate_key(*args):
    key = ''
    for group in args:
        key += '_' + group

    return str(key[1:])

def add_dict_entry(hostname, dictionary, dict_key):
    if dict_key == '_meta':
        # host_specifc_vars is a dummy key/value pair for future use
        if hostname not in dictionary[dict_key]['hostvars']:
            dictionary[dict_key]['hostvars'][hostname] = {'host_specific_vars': False}
    elif hostname not in dictionary[dict_key]['hosts']:
        dictionary[dict_key]['hosts'].append(hostname)

def add_dict_key(dictionary, key):
    if key not in dictionary:
        dictionary[key] = {}
        dictionary[key]['hosts'] = []
        dictionary[key]['vars'] = { 'group_vars' : False }
        dictionary['all']['children'].append(key)

def generate_group_name(site, role):
    '''Generate server group off site and role'''
    return '{}_{}'.format(site, role)

def convert_dict_to_json(dict_to_convert):
    '''Convert the inventory dictionary to JSON object and output to STDOUT'''
    json_dict = json.dumps(dict_to_convert)
    sys.stdout.write(json_dict);
    sys.stdout.flush()