const mongoose = require('mongoose')

const heightSchema = new mongoose.Schema({
    height: {
        type: Number,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Child'
    }
}, {
    collection: 'height'
})

const Height = mongoose.model('Height', heightSchema)

module.exports = Height