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

module.exports = {
    addChildToDb
}