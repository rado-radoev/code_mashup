var express = require('express');
var router = express.Router();

var { createNewUser } = require('../src/db/db_control');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  var u = createNewUser();
  res.send(u);
});

module.exports = router;
