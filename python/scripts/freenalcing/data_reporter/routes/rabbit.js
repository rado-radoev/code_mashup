var express = require('express');
var router = express.Router();
var os = require('os');
var networkInterfaces = os.networkInterfaces();
var amqp = require('amqplib');

var ip = getLocalIP();

/* GET home page. */
router.get('/', async (req, res, next) => {
  var msg = await test();
  res.send(msg);
  next();
});


async function test() {
  var everything = 'everything';
  var results = 'results';

  var conn = await amqp.connect('amqp://localhost');
  var ch = await conn.createChannel();
  ch.assertQueue(everything, {durable: false});
  var ok = ch.sendToQueue(everything, Buffer.from(ip))
  console.log(ok ? 'Message sent' : "Message not sent")
  

  ch.assertQueue(results, {durable: false});
  ch.consume(results, (msg) => {
    if (msg != null) {
      console.log(msg.content.toString())
      ch.ack(msg);
      return msg.content.toJSON();
    }
  });
  }

function getLocalIP() {
  return networkInterfaces['en1'][1].address;
}

module.exports = router;
