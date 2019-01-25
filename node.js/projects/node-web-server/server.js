const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unabel to write to server.log');
    }
  });

  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     maintenanceMessage: 'Website is under maintenance'
//   });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('printMessage', (message) => {
  return message;
});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

hbs.registerHelper('list', (items, options) => {
  var out = "<ul>";

  for (var i = 0, l = items.length; i < l; i++) {
    out = out + "<li>" + options.fn(items[i]) + "</li>";
  }
  return out + "</ul>";
});

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  // res.send({
  //   name: Andrew,
  //   likes: [
  //     'Biking',
  //     'Cities'
  //   ]
  // });
  res.render('home.hbs', {
    pageTitle: 'This is home',
    welcomeMessage: 'Well "Hello There!"'
  });
});

app.get('/about', (req, res) => {
  // res.send('About page');
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'You messed up!'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    projectList: ['Project1', 'Project2', 'Project3']
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
