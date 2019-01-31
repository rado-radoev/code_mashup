const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
});

var newUser = new User({
  email: '  rradoev@yahoo.com  '
});

newUser.save().then((doc) => {
  console.log(JSON.stringify(doc, undefined, 2));
}, (e) => {
  console.log('Cannot save user');
});

// var Todo = mongoose.model('Todos', {
//   text: {
//     type: String,
//     required: true,
//     minlength: 1,
//     trim: true
//   },
//   completed: {
//     type: Boolean,
//     default: true
//   },
//   completedAt: {
//     type: Number,
//     default: null
//   }
// });


// var newTodo = new Todo({
//   text: 'Cook dinner'
// });
//
// newTodo.save().then((doc) => {
//   console.log('Saved todo', doc);
// }, (e) => {
//   console.log('Unable to save Todo')
// });


// var secondTodo = new Todo({
//   text: 'Cook breakfast',
//   completed: false,
//   completedAt: 0
// });
//
// secondTodo.save().then((doc) => {
//   console.log('Successfully saved todo', JSON.stringify(doc, undefined, 2));
// }, (e) => {
//   console.log('Unable to save todo');
// });
