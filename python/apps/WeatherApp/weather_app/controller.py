from py4j.java_gateway import JavaGateway
import json

gateway = JavaGateway()
weather_data = gateway.entry_point.getFirstDocument()
json_str = gateway.entry_point.convertDocToJson(weather_data)
print(type(json_str))
