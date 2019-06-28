const mongoose = require('./mongoose')
const Child = require('../models/child')
const User = require('../models/user')
const Height = require('../models/height')
const Weight = require('../models/weight')
const { calcAge, convertDaysToMonths } = require('../util/utils')
 
async function addChildToDb(childInfo, owner) {
    var newChild = new Child({
        ...childInfo,
        owner
    })

    return newChild.save();
}

async function createNewUser() {
    let fName = 'Radoslav'
    let lName = 'Radoev'
    let uName = 'rradoev'
    let pass = 123456
    let email = 'peshteradko@yahoo.com'
    var user = await new User({
        firstName: fName,
        lastName: lName,
        username: uName,
        password: pass,
        email
    })

    return user.save((err) => {
        if (err) throw err;
    }) 
};

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
    findChildById, 
    createNewUser
}