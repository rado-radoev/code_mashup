// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }

  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  // deleteMany
  // db.collection('Todos').deleteMany({task: 'Walk the dog'}).then((res) => {
  //   console.log(res);
  // });

  // deleteOne
  // db.collection('Todos').deleteOne({task: 'Eat lunch'}).then((res) => {
  //   console.log(res);
  // });

  // findOneAndDelete
  // db.collection('Users').findOneAndDelete({location: 'San Diego'}).then((res) => {
  //   console.log(res);
  // });

  // db.collection('Users').deleteMany({location: 'San Diego'});

  db.collection('Todos').findOneAndDelete(new ObjectID('5c514fd34ee2374220453126'));

  // client.close();

});
