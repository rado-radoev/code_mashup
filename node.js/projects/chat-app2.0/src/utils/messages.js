const moment = require('moment')

const generateMessage = (text) => {
    return {
        text,
        'createdAt': new Date().getTime()
    }
}


const generateLocationMessage = (url) => {
    return generateMessage(url);
}

module.exports = {
    generateMessage,
    generateLocationMessage
}