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
// console.log(chalk.bgGreen .bold.blue('Success1'));



// const command = process.argv[2];

// if (command === 'add') {
//     console.log('Adding note');
// } else if (command === 'remove') {
//     console.log('Removing note');
// }


yargs.command({
    command: 'add',
    describe: 'Add new note',
    builder:{
        title: {
            describe: 'Add title',
            demandOption: true,
            type: 'string'

        },
        body: {
            describe: 'Note',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        console.log('Title: ' + argv.title)
        console.log('Note body: ' + argv.body )
    }
})

yargs.command({
    command: 'remove',
    describe: 'Removing note',
    handler: function () {
        console.log('Removing a note')
    }
})

syargs.command({
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

yargs.parse();
//console.log(yargs.argv)