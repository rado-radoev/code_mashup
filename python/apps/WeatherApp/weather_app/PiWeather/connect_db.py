# from mongoengine import *
#
# connect('Posts', host="mongodb+srv://rradoev:M34M26kb8b@cluster0-yc4wz.mongodb.net/Posts?retryWrites=true")
#





# import pymongo, pprint
# from read_props import parse
# import urllib, datetime
#
# # Get MongoDB Atlas connection data
# db_conf = parse()
# db_srv = db_conf[0]
# db_usr = db_conf[1]
# db_pass = urllib.parse.quote_plus(db_conf[2])
#
#
# client = pymongo.MongoClient("mongodb+srv://rradoev:M34M26kb8b@cluster0-yc4wz.mongodb.net/Posts?retryWrites=true")
# db = client.Posts
#
#
#
# post = {"author": "Mike4",
#     "text": "My first blog post!",
#     "tags": ["mongodb", "python", "pymongo"],
#     "date": datetime.datetime.utcnow()}
#
# posts = db.Posts
# post_id = posts.insert_one(post).inserted_id
# # post_id
#
# # pprint.pprint(posts.find_one())
# for post in posts.find().sort("_id", -1).limit(1):
#     pprint.pprint(post)



from mongoengine import connect
from models import Post
from models import Indoor_Weather
import datetime
connect('Weather', host="mongodb+srv://rradoev:M34M26kb8b@cluster0-yc4wz.mongodb.net/Weather?retryWrites=true")

# Post(author="Mike2",text= "Test blog post!",tags= ["mongodb", "python", "pymongo"],date = datetime.datetime.utcnow()).save()
# post = Post.objects.count()
# print(post)

# for post in Post.objects():
#     print(post)
Indoor_Weather(indoor_temp="23.1", indoor_humidity="14.2").save()
indoor = Indoor_Weather.objects.count()
print(indoor)

ind = Indoor_Weather.objects.order_by('-id').first()
print(ind)
