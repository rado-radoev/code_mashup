const mongoose = require('./mongoose')
const Child = require('../models/child')

function addChildToDb(childInfo,) {
    var newChild = new Child({
        name: childInfo.name,
        birthdate: new Date(childInfo.birthdate)
    })

    return newChild.save();
}

module.exports = {
    addChildToDb
}