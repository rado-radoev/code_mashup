console.log('Starting app.js');

const fs = require('fs');
const os = require('os');
const notes = require('./notes.js');
const _ = require('lodash');

console.log(_.isString(true));
console.log(_.isString('Rado'));
var filteredArray = _.uniq(['Mike', 'Mike'])
console.log(filteredArray);

// var result = notes.addNote();
// var sum = notes.add(5, 10);
// console.log(sum);

// var user = os.userInfo();
//
// fs.appendFileSync('greetings.txt', `Hello ${user.username}!.
//   You are ${notes.age}`);
