const fs = require('fs');

const dataBuffer = fs.readFileSync('1-json.json');
const dataStr = dataBuffer.toString();
const data = JSON.parse(dataStr);

data.name = 'Rado'
data.age = 35

const userJson = JSON.stringify(data);
fs.writeFileSync('1-json.json', userJson);
console.log(userJson);