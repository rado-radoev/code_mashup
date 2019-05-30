const mongoose = require('mongoose')

const weightSchema = new monogoose.Schema({
    weight: {
        type: Number,
        required: true,
    },
    owner: {
        type: monogoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Child'
    }
})

const Weight = mongoose.model('Weight', weightSchema)

module.exports = Weight