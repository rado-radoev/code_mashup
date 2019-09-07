const express = require('express');
const router = express.Router();
const Temperature = require('../models/temperature');

// Getting all
router.get('/', async (req, res) => {
    try {
        let temp = await Temperature.find();
        res.status(200).json(temp);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Getting one
router.get('/:id', getTemperature , async (req, res) => {
    res.status(200).json(res.temp);
});

// Search
router.get('/temp/search', async (req, res) => {
    try {
        // Parsing the url for search params
        let temp
        let urlParams = req.originalUrl.slice(req.originalUrl.indexOf('?') + 1);
        var searchParams = new URLSearchParams(urlParams);
        // Only allows search params defined in the Mongoose Shcema
        const ALLOWED_QUERY_PARAMS = Object.keys(Temperature.schema.paths);

        let t = {};
        for (let key of searchParams.keys()) {
            if (ALLOWED_QUERY_PARAMS.includes(key)) {
                t[key] = searchParams.get(key);
            }
        }

        // If no search params are provided, all objects are returned
        temp = await Temperature.find(t);
        res.status(200).json(temp);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Getting newest
router.get('/temp/latest', async (req, res) => {
    try {
        let temp = await Temperature.find().sort({'_id':-1}).limit(1);
        res.status(200).json(temp);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
// Creating one
router.post('/newreading', async(req, res) => {
    let temp = new Temperature({
        temp: req.body.temp,
        humidity: req.body.humidity
    })

    try {
        let newTemp = await temp.save();
        res.status(201).json(newTemp);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Updating one
router.patch('/:id', getTemperature , async (req, res) => {
    if (req.body.temp != null) {
        res.temp.temp = req.body.temp;
    }

    if (req.body.humidity != null) {
        res.temp.humidity = req.body.humidity;
    }

    try {
        let updatedTemp = await res.temp.save()
        res.json(updatedTemp);
    } catch (error) {
        res.send(400).json({ message: error.message });
    }
});
// Deleting one
router.delete('/:id', getTemperature, async (req, res) => {
    try {
        await res.temp.remove();
        res.json({ message: 'Deleted temperature data' });
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

async function getTemperature(req, res, next) {
    let temp;
    try {
        temp = await Temperature.findById(req.params.id);
        if (temp == null) {
            return res.status(404).json({ message: 'Cannot find temperature data' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    res.temp = temp;

    next();
}

module.exports = router;