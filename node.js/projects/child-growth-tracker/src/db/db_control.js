const mongoose = require('./mongoose')
const Child = require('../models/child')

function addChildToDb(childInfo) {
    var newChild = new Child({
        name: childInfo.name,
        birthdate: new Date(childInfo.birthdate)
    })

    newChild.save((err, child) => {
        if (err) {
            return console.log(err)
        } else {
            console.log(`${child.name} added to db.`)

        }
    })
}

module.exports = function(io) {
    io.sockets.on("connection", function(socket){
          // Broadcasts a message
          socket.on("send message", function(data){
             io.sockets.emit("new message", {msg: data, user: socket.username});
          });

        // other listeners will go here.
    });
};

module.exports = {
    addChildToDb
}