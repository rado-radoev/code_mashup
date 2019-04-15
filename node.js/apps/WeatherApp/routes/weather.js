const express = require('express')
const router = new express.Router()
const { queryWeather } = require('../middleware/queryWeather')

router.get('/', queryWeather, async (req, res) => {
    await console.log(req.method)
    res.send(200)
})

module.exports = router