var express = require('express');
var router = express.Router();
module.exports = function (io) {
    /* GET users listing. */
    router.get('/', function(req, res, next) {
      res.render('users')
    });

    return router;
}



