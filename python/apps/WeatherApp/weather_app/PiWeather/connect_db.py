import pymongo


client = pymongo.MongoClient("mongodb+srv://rradoev:<password>@cluster0-yc4wz.mongodb.net/test?retryWrites=true")
db = client.test
