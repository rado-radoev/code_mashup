var bcrypt = require('bcryptjs');

var password = '123!';

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  });
});

var hashedPassword = '$2a$10$.oXOi7u5Kkc2cx5tsHcQZuSgZ2pH3.d5zH6lTivdoQPuo68OHwjn6';

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});
