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

var argv = yargs
            .usage('Usage: $0 <command> title and/or body')
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

if (typeof command === 'string') {
  command = command.toLowerCase();
}

if (command === 'add') {
  debugger;
  var note = notes.addNote(argv.title, argv.body)
  if (typeof note === 'undefined') {
    console.log('Note already exists');
  } else {
    console.log('Note added.');
    notes.logNote(note);
  }
} else if (command === 'remove') {
  var removedNote = notes.removeNote(argv.title);
  if (removedNote) {
    console.log(`Note "${argv.title}" removed!`);
  } else {
    console.log(`Note with title "${argv.title}" not found!`);
  }
} else if (command === 'list') {
  console.log(notes.getAllNotes());
} else if (command === 'read') {
  var noteRead = notes.readNote(argv.title);
  if (noteRead === 'undefined') {
    console.log('Note not found!');
  } else {
    console.log(notes.logNote(noteRead));
  }
} else {
  console.log('Command not recognized');
}
