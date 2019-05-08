
class Weather:
    
    def __init__(self, temperature, humidity):
        self.humidity = humidity
        self.temperature = temperature

    def __str__(self):
        return f"Temp: {self.temperature}, Humidity: {self.humidity}"
