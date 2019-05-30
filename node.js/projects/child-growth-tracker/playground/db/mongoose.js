const mongoose = require('mongoose')

const uri = "mongodb+srv://rradoev:M34M26kb8b@cluster0-yc4wz.mongodb.net/test?retryWrites=true";
// const client = new MongoClient(uri, { useNewUrlParser: true });

var client = mongoose.connect(uri, {
    useNewUrlParser: true
})

module.exports = client