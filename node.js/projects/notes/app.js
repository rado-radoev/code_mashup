const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
  describe:'Title of note',
  demand: true,
  alias: 't'
};

const bodyOptions = {
  describe: "Body of Note",
  demand: true,
  alias: 'b'
};
const argv = yargs
      .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
      })
      .command('list', 'List all notes')
      .command('read', 'Read a note', {
        title: titleOptions
      })
      .command('remove', 'Remove a note', {
        title: titleOptions
      })
      .help()
      .argv;

var command = argv._[0];

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
  console.log(`Printing ${all.length} note(s).`);
  all.forEach((note) => notes.logNote(note));
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
