var express = require('express');
var router = express.Router();

Date.prototype.toShortFormat = function() {

  var month_names =["Jan","Feb","Mar",
                    "Apr","May","Jun",
                    "Jul","Aug","Sep",
                    "Oct","Nov","Dec"];
  
  var day = this.getDate();
  var month_index = this.getMonth();
  var year = this.getFullYear();
  
  return "" + day + "-" + month_names[month_index] + "-" + year;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Baby Monitor',
    currDate: (new Date()).toShortFormat()
  });
});

module.exports = router;
