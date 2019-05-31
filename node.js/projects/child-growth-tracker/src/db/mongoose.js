const mongoose = require('mongoose')

const uri = "mongodb+srv://rradoev:M34M26kb8b@cluster0-yc4wz.mongodb.net/child-data?retryWrites=true";

mongoose.connect(uri ,{
    useNewUrlParser: true,
    useCreateIndex: true
})

module.exports = mongoose