import mongoengine, json

class Indoor_Weather(mongoengine.Document):
    indoor_temp = mongoengine.DecimalField()
    indoor_humidity = mongoengine.IntField()

    def __str__(self):
        return "Indoor Temp: %s. Indoor Humidity: %s", self.indoor_temp, self.indoor_humidity

    def convert_to_json(self):
        indoor = {
            "temp" : self.indoor_temp,
            "humidity" : self.indoor_humidity
        }

        return json.dumps(indoor)