from weather import Weather
import json, asyncio, socketio, sys
from py4j.java_gateway import java_gateway
from java_gateway import _JavaGateway

class IndoorWeather(Weather):

    def indoor_to_json(self):
        return json.dumps({temp: self.temperature, humidity: self.humidity})


'''
Java 
    Execute code on raspberry pi
    wait for inpput
    pass output to python controller
    python controller send output to node
'''