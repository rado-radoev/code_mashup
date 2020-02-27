var express = require('express');
var router = express.Router();
var db = require('../utils/db/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  let result = db.Query();
  res.send(result.length)
  //res.render('index', { title: 'Express' });
});

module.exports = router;
