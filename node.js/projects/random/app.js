const utils = require('./utils');
const validator = require('validator');
const chalk = require('chalk');

// const name = 'Rado'
// console.log(name)
// console.log(utils.name)
// const sum = utils.add(4,5)
// console.log(sum)



// console.log(validator.isURL('http://google.com'));

// console.log(chalk.blue('Hello'));
// console.log(chalk.bgGreen.bold.blue('Success1'));

console.log(process.argv)
const command = process.argv[2];

if (command === 'add') {
    console.log('Adding note');
} else if (command === 'remove') {
    console.log('Removing note');
}