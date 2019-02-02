const {User} = require('./../server/models/user');
const {Todo} = require('./../server/models/todo');
const {mongoose} = require('./../server/db/mongoose');
const {ObjectID} = require('mongodb');

var id = '5c52b79f98ba52f820971ab7';

if (ObjectID.isValid(id)) {
  console.log('Id not valid');
}

User.find({
  _id: id
}).then((users) => {
    console.log('Users', users);
});


User.findOne({
  _id: id
}).then((user) => {
  console.log('User', user);
});

User.findById(id).then((user) => {
  if (!user) {
    return console.log('User not found');
  }

  console.log('User by ID', user);
}).catch((e) => console.log(e));

// var id = '6c55509d7582d7130c7629bb';
//
// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }
//
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });
//
// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found');
//   }
//
//   console.log('Todo by Id', todo);
// }).catch((e) => {console.log(e)});
