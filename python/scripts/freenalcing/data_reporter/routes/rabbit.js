var express = require('express');
var router = express.Router();
var os = require('os');
var networkInterfaces = os.networkInterfaces();
var amqp = require('amqplib');

var ip = getLocalIP();
const UPDATE_INTERVAL = 5;

/* GET home page. */
router.get('/', async (req, res, next) => {
    test(req, res);
  })

async function test(req, res) {
  var everything = 'everything';
  var results = 'results';

  var conn = await amqp.connect('amqp://localhost');
  var ch = await conn.createChannel();
  ch.assertQueue(everything, {durable: false});
  var objToSend = {
    'ip': ip,
    'update_interval': UPDATE_INTERVAL,
    'user': 'superlamer',
    'pass': 'randomPass123',
    'url': req.get('host')
  }
  var ok = ch.sendToQueue(everything, Buffer.from(JSON.stringify(objToSend)))
  console.log(ok ? 'Message sent' : "Message not sent")
  

  ch.assertQueue(results, {durable: false});
  ch.consume(results, (msg) => {
    if (msg != null) {
      console.log(msg.content.toString())
      ch.ack(msg);
      res.send(JSON.parse(msg.content.toString()));
    }
  });
  }

function getLocalIP() {
  return networkInterfaces['en1'][1].address;
}

module.exports = router;
