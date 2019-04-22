import configparser

config = configparser.ConfigParser()
config.read("properties.ini")

db = config['DB']['DB'] # cluster address
user = config['DB']['DB_USER'] # db user
pass

print(db)