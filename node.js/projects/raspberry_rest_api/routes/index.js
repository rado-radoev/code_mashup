module.exports = function(io) {

  var express = require('express');
  var router = express.Router();
  
  /* GET home page. */
  router.get('/', function(req, res, next) {
      console.log(io.sockets.connected)
      io.emit('cipher', 'text');

    
    
    res.render('index', { title: 'Express' });
  });
  
  return router;


}



