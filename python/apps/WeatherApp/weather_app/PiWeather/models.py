import mongoengine, json

class Post(mongoengine.Document):
    author = mongoengine.StringField()
    text = mongoengine.StringField()
    tags = mongoengine.ListField()
    date = mongoengine.DateTimeField()

    def __str__(self):
        return "author=" + self.author + " text=" + self.text + " tags=" + ', '.join(self.tags) + " date=" + str(self.date)



class Indoor_Weather(mongoengine.Document):
    indoor_temp = mongoengine.DecimalField()
    indoor_humidity = mongoengine.DecimalField()

    def __str__(self):
        return f"Indoor Temp: {self.indoor_temp}. Indoor Humidity: {self.indoor_humidity}"

    def convert_to_json(self):
        indoor = {
            "temp" : self.indoor_temp,
            "humidity" : self.indoor_humidity
        }

        return json.dumps(indoor)