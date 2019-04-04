from py4j.java_gateway import JavaGateway
import json
from collections import namedtuple

gateway = JavaGateway()
weather_data = gateway.entry_point.getFirstDocument()
json_str = gateway.entry_point.convertDocToJson(weather_data)
print(json_str)



def convert_json_to_obj(source_json):
    x = json.loads(source_json)
    print(x["city"]['city'])

    
convert_json_to_obj(json_str)