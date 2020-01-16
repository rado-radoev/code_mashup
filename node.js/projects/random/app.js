const utils = require('./utils');
const validator = require('validator');
const chalk = require('chalk');
const yargs = require('yargs');

// const name = 'Rado'
// console.log(name)
// console.log(utils.name)
// const sum = utils.add(4,5)
// console.log(sum)



// console.log(validator.isURL('http://google.com'));

// console.log(chalk.blue('Hello'));
// console.log(chalk.bgGreen.bold.blue('Success1'));



// const command = process.argv[2];

// if (command === 'add') {
//     console.log('Adding note');
// } else if (command === 'remove') {
//     console.log('Removing note');
// }


yargs.command({
    command: 'add',
    describe: 'Add new note',
    handler: function() {
        console.log('Adding a new note')
    }
})

yargs.command({
    command: 'remove',
    describe: 'Removing note',
    handler: function () {
        console.log('Removing a note')
    }
})

yargs.command({
    command: 'list',
    describe: 'List notes',
    handler: function () {
        console.log('Listing notes')
    }
})


yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler: function () {
        console.log('read a note')
    }
})

console.log(yargs.argv)