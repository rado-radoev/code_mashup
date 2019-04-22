import pymongo
from read_props import parse
import urllib

# Get MongoDB Atlas connection data
db_conf = parse()

client = pymongo.MongoClient("mongodb+srv://" + db_conf[1] + ":" + urllib.parse.quote(db_conf[2]) + db_conf[0])

db = client.Weather
print(db)



