const mongoose = require('mongoose')

const heightSchema = new monogoose.Schema({
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

const Height = mongoose.model('Height', heightSchema)

module.exports = Height