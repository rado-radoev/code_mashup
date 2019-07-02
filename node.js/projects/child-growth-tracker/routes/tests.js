var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  res.render('login');
});

router.get('/test', async function(req, res, next) {
  const jwt = require('jsonwebtoken')

  const myFunc = async () => {
    const token = jwt.sign({ _id: 'abc123'}, 'thisismynewcourse', {expiresIn: '7 days'})
    console.log(token)

    const data = jwt.verify(token, 'thisismynewcourse')
    console.log(data)
  }

  myFunc();
});


module.exports = router;
