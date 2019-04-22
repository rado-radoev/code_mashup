import configparser

config = configparser.ConfigParser()
config.read("properties.ini")

db = config['DB']['DB'] # cluster address

print(db)