import configparser

def parse():
    config = configparser.ConfigParser()
    config.read("properties.ini")

    db = config['DB']['DB'] # cluster address
    user = config['DB']['DB_USER'] # db user
    password = config['DB']['DB_PASS'] # db user pass

    return (db, user, password)