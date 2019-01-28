const express = require('express');

const port = process.env.PORT || 3000;

var app = express();

app.get('/', (req, res) => {
  res.status(404).send({
      error: 'Page not found',
      name: 'Todo App v1.0'
    });
});

app.get('/users', (req, res) => {
  res.send([{
    user: 'vradoev',
    age: 25
  },
   {
     user: 'vr',
     age: 2
   },
   {
    user: 'rradoev',
    age: 45
   }]);
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

module.exports.app = app;
