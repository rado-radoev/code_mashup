/*jshint esversion: 8 */ 

var express = require('express');
var router = express.Router();
var { getAllChildren, getFirstChild, childExists} = require('../src/db/db_control');
var { calcAge, convertDaysToMonths, convertDaysToYears, toShortFormat } = require('../src/util/utils');

router.use( async (req, res, next) => {
  var firstChildName = await getFirstChild();
  req.child = firstChildName.name;
  next();
});


// var test = function (options) {
//   return function (req, res, next) {
//     console.log(options)
//     next();
//   };
// };

// router.use(test({opt1: '1', opt2: '2'}))

/* GET home page. */
router.get('/', async function(req, res, next) {

  if (!req.childname) {
    var firstChildName = await getFirstChild();
    res.redirect(`/name/${firstChildName.name}`)
  } else {
    res.redirect(`/name/${req.childname.name}`)
  }
});

router.get('/name/:id', async (req, res, next) => {
  // res.send(req.params.id)
  // console.log(req.params.id)
  var name = await childExists(req.params.id);
  let ageTemp = calcAge(name.birthdate);
  var age = ageTemp > 365 ? convertDaysToYears(ageTemp) : convertDaysToMonths(ageTemp);
  let age_t = ['months', 'year(s)'];
  var age_type = ageTemp > 365 ? age_t[1] : age_t[0];

  var g = await getAllChildren();

  res.render('index', { 
    object: g,
    title: 'Baby Monitor',
    DefaultChildName: name.name,
    childName: name.name,
    childBirthDate: toShortFormat(name.birthdate),
    childAge: `${age} ${age_type} old.`,
    currDate: toShortFormat(new Date())
  });
});


module.exports = router;
