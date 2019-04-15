var express = require('express');
var mainRoute = express.Router();

mainRoute.get('/', (req, res) => {
    res.redner('index', {});
})

module.exports = mainRouter;