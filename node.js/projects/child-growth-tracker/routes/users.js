var express = require('express');
var router = express.Router();
var User = require('../src/models/user')
var auth = require('../src/middleware/auth')

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

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })

    await req.user.save();

    res.send();

  } catch (error) {
    res.sendStatus(500).send();
  }
})

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save();

    res.send();
  } catch (error) {
    res.sendStatus(500).send();
  }
})

router.get('/users/me', auth, async (req, res) => {
  res.send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['firstName', 'lastName', 'username', 'email', 'password'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.sendStatus(400).send({error: 'Invalid updates!'})
  }

  try {
    updates.forEach((update) => req.user[update] = req.body[update])
    await req.user.save()
    res.send(user)
  } catch (error) {
    
  }
})

router.delete('/users/me', auth, async (req, res) => {
  try {
     await req.user.remove();
    res.send(req.user)
  } catch (error) {
    res.sendStatus(500).send()
  }
})

// router.get('/users/:id', async (req, res) => {
//   const _id = req.params.id

//   try {
//     const user = await User.findById(_id)

//     if (!user) {
//       return res.sendStatus(404).send();
//     }

//     res.send(user)
//   } catch (error) {
//     res.sendStatus(500).send()
//   }
// })

// router.get('/users', auth, async (req, res) => {
//   try {
//     const users = await User.find( { } );
//     res.send(users);
//   } catch (error) {
//     res.status(500).send();
//   }
// })

module.exports = router;
