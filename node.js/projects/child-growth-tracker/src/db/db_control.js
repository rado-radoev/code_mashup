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
    var saved = false;
    
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

    if (heightSaved && weightSaved) {
        saved = true;
    }

    return saved;
}

async function getAllHeights(childId) {
    var heights = new Array();

    var find = await Height.find({owner: new mongoose.mongo.ObjectId(childId)});
    let counter = 0
    find.forEach((element) => {
        let temp = [counter, element.height]
        heights.push(temp);
        counter++;
    })

    return heights;
 }

 async function getAllWeights(childId) {
    var weights = new Array();

    var find = await Weight.find({owner: new mongoose.mongo.ObjectId(childId)});
    let counter = 0
    find.forEach((element) => {
        let temp = [counter, element.weight]
        weights.push(temp);
        counter++;
    })

    return weights;
 }

module.exports = {
    addChildToDb,
    addChildDataToDB,
    getAllHeights,
    getAllWeights
}