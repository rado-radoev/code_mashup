const moment = require('moment')

const generateMessage = (username, text) => {
    return {
        text,
        username,
        'createdAt': new Date().getTime()
    }
}


const generateLocationMessage = (username, url) => {
    return generateMessage(username, url);
}

module.exports = {
    generateMessage,
    generateLocationMessage
}