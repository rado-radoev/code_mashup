var express = require('express');
var router = express.Router();
var os = require('os');
var networkInterfaces = os.networkInterfaces();
var amqp = require('amqplib');

var ip = getLocalIP();

/* GET home page. */
router.get('/', test);

function test(req, res, next) {
  amqp.connect('amqp://localhost', (err, conn) => {
    if (err != null) bail (err);

    var everything = 'everything';
    var results = 'resutls';

    publisher(conn, everything);
    consumer(conn, results);

    next();
  })
}

function publisher(conn, queue) {
  conn.createChannel(on_open);

  function on_open(err, ch) {
    if (err != null) bail (err);
    ch.assertQueue(queue)
    ch.sendToQueue(queue, Buffer.from(ip))
  }
}

function consumer(conn, queue) {
  conn.createChannel(on_open);
  
  function on_open(err, ch) {
    if (err != null) bail (err);

    ch.assertQueue(queue);
    ch.consume(queue, (msg) => {
      if (msg != null) {
        console.log(msg.content.toString());
        ch.ack(msg);
      }
    })
  }
}

function getLocalIP() {
  return networkInterfaces['en1'][1].address;
}

function bail(err) {
  console.error(err);
  process.exit(1);
}

module.exports = router;
