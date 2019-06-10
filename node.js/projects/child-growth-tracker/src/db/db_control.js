const mongoose = require('./mongoose')
const Child = require('../models/child')
const Height = require('../models/height')
const Weight = require('../models/weight')
const { calcAge, convertDaysToMonths } = require('../util/utils')
 
function addChildToDb(childInfo) {
    var newChild = new Child({
        name: childInfo.name,
        birthdate: new Date(childInfo.birthdate)
    })

    return newChild.save();
}

async function addChildDataToDB(childData, childId) {
    let saved = false;

    let child = await Child.findById(childId)
    let childBday = calcAge(child.birthdate)
    let childAgeMonths = convertDaysToMonths(childBday)

    let height = new Height({
        height: childData.height,
        age: childAgeMonths,
        owner: childId
    });

    let weight = new Weight({
        weight: childData.weight,
        age: childAgeMonths,
        owner: childId
    });

    let heightSaved = await height.save();
    let weightSaved = await weight.save();
    
    var hId = await Height.findById(heightSaved._id)
    var wId = await Weight.findById(weightSaved._id)
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
    let counter = calcAgeFirstEntry(find)
    
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
    let counter = calcAgeFirstEntry(find)

    find.forEach((element) => {
        let temp = [counter, element.weight]
        weights.push(temp);
        counter++;
    })

    return weights;
 }

 function calcAgeFirstEntry(entry) {
     return entry[0].age;
 }

module.exports = {
    addChildToDb,
    addChildDataToDB,
    getAllHeights,
    getAllWeights
}