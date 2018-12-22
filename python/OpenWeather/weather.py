import requests, json


api_key = '6a0326b54ac62aae38ee842128683084'

# base url to get the weather in the city
# if the city name has space it will be truncated
base_url = 'http://api.openweathermap.org/data/2.5/weather?q={city}'.format(city='San Diego'.replace(" ", "+"))

complete_url = base_url + '&appid=' + api_key

response = requests.get(complete_url)

response_json = response.json()


if response_json['cod'] != 404:
   
    city_weather = response_json['main']

    curr_temp = city_weather['temp']
    curr_pressure = city_weather['pressure']
    curr_humidity = city_weather['humidity']
    curr_weather = response_json['weather']
    weather_description = curr_weather[0]['description']
    print(f'Temp: {curr_temp}\n'
          f'Pressure: {curr_pressure}\n'
          f'Humidity: {curr_humidity}\n'
          f'Weather: {weather_description}\n')