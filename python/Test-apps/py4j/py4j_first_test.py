from py4j.java_gateway import JavaGateway


gateway = JavaGateway()

weather = gateway.entry_point.getWeather()
print(weather)
print(weather.getCityName())