var express = require('express');
var router = express.Router();
var User = require('../src/models/user')

var { createNewUser } = require('../src/db/db_control');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  next();
});

router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    let token = await user.generateAuthToken()
    res.status(201).send( { user, token } );
  } catch (error) {
    res.status(400).send(error);
  }
})


router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken()

    res.send({ user, token })
  } catch (error) {
    res.status(400).send();
  }
})

module.exports = router;
