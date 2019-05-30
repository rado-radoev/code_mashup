const mongoose = require('mongoose')

const childSchema = new monogoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    birthdate: {
        type: Date,
        required: true
    }
})

userSchema.virtual('weight', {
    ref: 'Weight',
    localField: '_id',
    foreighField: 'owner'
})

userSchema.virtual('height', {
    ref: 'Height',
    localField: '_id',
    foreighField: 'owner'
})

const Child = mongoose.model('Child', childSchema)

module.exports = Child