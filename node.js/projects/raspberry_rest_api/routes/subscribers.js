const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber');

// Getting all
router.get('/', async (req, res) => {
    try {
        const subscriber = await Subscriber.find();
        res.json(subscriber);
    } catch (err) {
        res.status(500).json({message: err.message});

    }
})
// Getting one
router.get('/:id', async (req, res) => {

});
// Creating one
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    });

    try {
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})
// Updating one
router.patch('/:id', (req, res) => {
    
})
// Deleting one
router.delete('/:id', (req, res) => {
    
})

module.exports = router;