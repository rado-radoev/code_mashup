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
    // let counter = getEntryAgeAtIndex(find, 0)

    find.forEach((element) => {
        counter = element.age;
        let temp = [counter, element.height]
        heights.push(temp);
        
    })

    return heights;
 }

 async function getAllWeights(childId) {
    var weights = new Array();

    var find = await Weight.find({owner: new mongoose.mongo.ObjectId(childId)});
    // let counter = getEntryAgeAtIndex(find, 0)

    find.forEach((element) => {
        counter = element.age;
        let temp = [counter, element.weight]
        weights.push(temp);
        
    })

    return weights;
 }

 async function childExists(childName) {
    var child = await Child.findOne({name: childName});
    return child;
  }

  async function findChildByName(childName) {
    var child = await Child.findOne({name: childName});
    return child;
  }

  async function findChildById(childId) {
    var child = await Child.findOne({id: childId});
    return child;
  }

 // Get all child names in the DB and return array
 async function getAllChildren() {
    let children = await Child.find();
    return children;
 }

 async function getFirstChild() {
    let children = await getAllChildren() ;
    return children[0];
 }
 function getEntryAgeAtIndex(entry, index) {
     return entry[index].age;
 }



module.exports = {
    addChildToDb,
    addChildDataToDB,
    getAllHeights,
    getAllWeights,
    getAllChildren,
    childExists,
    getFirstChild,
    findChildByName,
    findChildById
}