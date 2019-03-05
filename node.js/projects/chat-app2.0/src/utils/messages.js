const moment = require('moment')

const generateMessage = (text) => {
    return {
        text,
        'createdAt': new Date().getTime()
    }
}

module.exports = {
    generateMessage
}