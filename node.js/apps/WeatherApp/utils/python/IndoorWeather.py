from weather import Weather
import json, asyncio, socketio, sys
from py4j.java_gateway import java_gateway
from java_gateway import _JavaGateway

class IndoorWeather(Weather):

    def indoor_to_json(self):
        return json.dumps({temp: self.temperature, humidity: self.humidity})

    # create new socket io client
    # get time by running the py script
    # need to run a script and get output
    # upon data received shoudl emit socket io
    # with temp and humidity
    #
    