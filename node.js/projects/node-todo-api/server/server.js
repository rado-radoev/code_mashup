const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todos', {
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
});


// var newTodo = new Todo({
//   text: 'Cook dinner'
// });
//
// newTodo.save().then((doc) => {
//   console.log('Saved todo', doc);
// }, (e) => {
//   console.log('Unable to save Todo')
// });


var secondTodo = new Todo({
  text: 'Cook breakfast',
  completed: false,
  completedAt: 0
});

secondTodo.save().then((doc) => {
  console.log('Successfully saved todo', JSON.stringify(doc, undefined, 2));
}, (e) => {
  console.log('Unable to save todo');
});
