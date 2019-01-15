console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');
const argv = yargs.argv;



var command = argv._[0];
console.log('Command:', command);
console.log('Process:', process.argv);
console.log('Yargs:', argv);

if (command === 'add') {
  var note = notes.addNote(argv.title, argv.body)
  if (typeof note === 'undefined') {
    console.log("Note already exists.");
  } else {
    console.log("Note added.");
    notes.logNote(note);
  }
} else if (command === 'list') {
  var all = notes.getAll();
  console.log(all);
} else if (command === 'read') {
  var note = notes.getNote(argv.title);
  if (note) {
    console.log("Note found");
    notes.logNote(note);
  } else {
    console.log("Note not found");
  }
} else if (command === 'remove') {
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? 'Note was removed' : 'Note was not found';
  console.log(message);
}
else {
  console.log('Command not recognized');
}
