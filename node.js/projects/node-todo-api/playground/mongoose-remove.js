const {User} = require('./../server/models/user');
const {Todo} = require('./../server/models/todo');
const {mongoose} = require('./../server/db/mongoose');
const {ObjectID} = require('mongodb');


// Remove all todos
Todo.remove({}).then((result) => {
  console.log(result);
});

Todo.findOneAndRemove({_id: '3423ddw32rfeffr32e32rerwerecfc'}).then((todo) => {
  console.log(todo);
});

Todo.findByIdAndRemove('23423rfdg34t34r5ef324r').then((todo) => {
  console.log(todo);
});
