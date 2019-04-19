const spawn = require("child_process").spawn;
const pythonProcess = spawn('python',["/Users/superlamer/GitHub/code_mashup/python/apps/WeatherApp/weather_app/controller2.py"]);

pythonProcess.stdout.on('data', (data) => {
   console.log(data.toString())
});

