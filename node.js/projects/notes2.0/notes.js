const fs = require('fs');

var addNote = (title, body) => {
  var notes = fetchNotes();
  var note = {
    title,
    body
  };

  var duplicateNotes = notes.filter((note) => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }

};

var removeNote = (title) => {
  var notes = fetchNotes();
  var otherNotes = notes.filter((note) => note.title !== title);

  saveNotes(otherNotes);

  return notes.length !== otherNotes.length;
};

var getAllNotes = () => {
  var notes = fetchNotes();
  notes.forEach((note) => {logNote(note)});
};

var readNote = (title) => {
  var notes = fetchNotes();
  var note = notes.filter((note) => note.title === title);
  if (note.length > 0) {
    return note[0];
  } else {
    return undefined;
  }

};

var fetchNotes = () => {
  try {
    return JSON.parse(fs.readFileSync('./notes-data.json'));
  } catch (e) {
    return [];
  }
};

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json',
    JSON.stringify(notes),
    (err) => {
      if (err) throw err;
      console.log('Data has been saved to file');
    });
};

var logNote = (note) => {
  console.log("---");
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};

module.exports = {
  addNote,
  removeNote,
  getAllNotes,
  readNote,
  logNote
};
