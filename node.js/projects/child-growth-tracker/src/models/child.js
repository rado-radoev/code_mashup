const mongoose = require('mongoose')

const childSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    birthdate: {
        type: Date,
        required: true
    }, 
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    collection: 'child'
})

childSchema.virtual('weight', {
    ref: 'Weight',
    localField: '_id',
    foreignField: 'owner'
})

childSchema.virtual('height', {
    ref: 'Height',
    localField: '_id',
    foreignField: 'owner'
})

const Child = mongoose.model('Child', childSchema)

module.exports = Child