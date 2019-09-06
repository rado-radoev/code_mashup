const mongoose = require('mongoose');
var moment = require('moment');

const temperatureSchema = new mongoose.Schema({
    temp: {
        type: Number,
        required: true
    },
    humidity: {
        type: Number,
        required: true
    },
    time: {
        type: Date,
        default: moment().format()
    },
    dayOfWeek: {
        type: Number,
        default: moment().format('d')
    },
    week: {
        type: Number,
        default: moment().format('W')
    },
    month: {
        type: Number,
        default: moment().format('M')
    },
    year: {
        type: Number,
        default: moment().format('Y')
    }
})

module.exports = mongoose.model('Temperature', temperatureSchema);