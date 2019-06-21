var socket_io = require('socket.io')
var io = socket_io();
var socket_api = {};

var { addChildToDb, addChildDataToDB, getAllHeights,  getAllWeights,
        getFirstChild, findChildByName } = require('../db/db_control');
var { calcAge, toShortFormat } = require('../util/utils');


socket_api.io = io;

io.on('connection', (socket) => {

    socket.on('join', (name) => {
        socket.join(name)
        io.to(name).emit('childName', name);
    })

    socket.on('request_child_object', async (child) => {
      if (!child) {
        first_child = await getFirstChild();
      }
      socket.emit('requsted_child_name', (first_child))
    })

    socket.on('new-child', async (childData) => {
      var added = await addChildToDb(childData);
      if (added) {
        socket.emit('child-added-to-db-notify', (added.name));
      }
    });

    socket.on('height-weight', async (size) => {
      var added = await addChildDataToDB(size, id);
      if (added) {
        socket.emit('child-data-added-to-db-notify',(name));
      }
    });

    socket.on('request_height', async (childId) => {
      if (!childId) {
        let c = await getFirstChild();
        childId = c._id
      }
      var heights = await getAllHeights(childId);
      socket.emit('update_height', heights);
    });

    socket.on('request_weight', async (childId) => {
      if (!childId) {
        let c = await getFirstChild();
        childId = c._id
      }
      var weights = await getAllWeights(childId);
      socket.emit('update_weight', weights);
    });

    socket.on('newDefaultChildName', async (newChildName) => {
    //   console.log('THis is the new child obj', newChildName)
      let child = await findChildByName(newChildName)
      socket.emit('newChildSelected', (child));
    });
});

module.exports = socket_api;