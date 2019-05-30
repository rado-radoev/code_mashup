var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs')

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://rradoev:M34M26kb8b@cluster0-yc4wz.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(err => {
  if (err) {
    return console.log('Unable to connect to DB')
  }

  console.log('Connected to db')
  var db = client.db("child-data")
  var heightCollection = db.collection('height')
  var weightCollection = db.collection('weight')
  var childCollection = db.collection('child')

  childCollection.insertOne({
    name: 'Victor',
    birthdate: new Date('08/17/2017')
  })

  childCollection.find().toArray((err, docs) => {
    if (err) {
      return console.log('Error finding docs')
    }

    // console.log(Date.parse(docs))
    docs.forEach(element => {
      console.log(element)
    });
  })

  // heightCollection.find().toArray((err, docs) => {
  //   if (err) {
  //     return console.log('Error finding docs')
  //   }

  //   console.log(docs)
  //   docs.forEach(element => {
  //     console.log(element)
  //   });
  // })

  // heightCollection.insertOne({
  //   age: 19,
  //   height: 45
  // })

  // weightCollection.insertOne({
  //   age: 19,
  //   weight: 16
  // }, (error, result) => {
  //   if (error) {
  //     return console.log('Error in adding data to weightColl.')
  //   }

  //   console.log(result.ops)
  // })

  client.close();
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var partialsDir = path.join(__dirname, './views/partials')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(partialsDir)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
