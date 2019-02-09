require('./config/config');

var _ = require('lodash');
var express = require('express') ;
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {ObjectID} = require('mongodb');
var {authenticate} = require('./middleware/authenticate');

const port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  // res.send(req.params);

  // Check if id is isValid
  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  }

  // findById
    Todo.findById(id).then((todo) => {
      if (todo) {
        res.send(todo);
      } else {
        res.status(404).send();
      }
    }).catch((e) => {
      res.status(400).send();
    });
});

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send({});
  }

  Todo.findByIdAndDelete(id).then((todo) => {
    if (!todo) {
      return res.status(400).send({});
    }

    res.status(200).send({todo});
  }).catch((e) => {
    res.status(400).send({});
  });
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send({});
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }

      res.send({todo});
    }).catch((e) => res.status(400).send());
});

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    var token = user.generateAuthToken();
    return token;
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.get('/users/me', authenticate ,(req, res) => {
  res.send(req.user);
  // var token = req.header('x-auth');
  //
  // User.findByToken(token).then((user) => {
  //   if (!user) {
  //     return Promise.reject();
  //   }
  //
  //   res.send(user);
  // }).catch((e) => {
  //   res.status(401).send(e);
  // });
});


app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});


module.exports = {app};
