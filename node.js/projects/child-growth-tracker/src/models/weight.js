const mongoose = require('mongoose')

const weightSchema = new mongoose.Schema({
    weight: {
        type: Number,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Child'
    }
}, {
    collection: 'weight'
})

const Weight = mongoose.model('Weight', weightSchema)

module.exports = Weight