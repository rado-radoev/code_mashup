var express = require('express');
var log  = express.Router();

log.use((req, res, next) => {
    logger(req);
    next();
} )

var logger = (req) => {
    console.log(req.method, req.url);
}

module.exports = log;