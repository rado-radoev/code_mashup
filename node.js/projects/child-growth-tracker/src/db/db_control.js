const mongoose = require('./mongoose')
const Child = require('../models/child')
const Height = require('../models/height')
const Weight = require('../models/weight')

function addChildToDb(childInfo) {
    var newChild = new Child({
        name: childInfo.name,
        birthdate: new Date(childInfo.birthdate)
    })

    return newChild.save();
}

async function addChildDataToDB(childData, childId) {
    var height = new Height({
        height: childData.height,
        owner: childId
    });

    var weight = new Weight({
        weight: childData.weight,
        owner: childId
    });

    var heightSaved = await height.save();
    var weightSaved = await weight.save();
    
    const hId = await Height.findById(heightSaved._id)
    const wId = await Weight.findById(weightSaved._id)
    await hId.populate('owner').execPopulate()
    await wId.populate('owner').execPopulate()

    console.log(hId)
    console.log(wId)
}

module.exports = {
    addChildToDb,
    addChildDataToDB
}