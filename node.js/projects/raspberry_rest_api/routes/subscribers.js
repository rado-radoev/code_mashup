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
router.get('/:id', getSubscriber, async (req, res, next) => {
    // res.json(res.subscriber);
    res.render('subscribers', { subscriber: res.subscriber });
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
router.patch('/:id', getSubscriber, async (req, res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name;
    }

    if (req.body.subscribedToChannel != null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
    }

    try {
       const updatedSubscriber = await res.subscriber.save();
       res.json(updatedSubscriber)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})
// Deleting one
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subsiber.remove();
        res.json({ message: 'Deleted subscriber' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

async function getSubscriber(req, res, next) {
    let subscriber;
    try {
        subscriber = await Subscriber.findById(req.params.id);
        if (subscriber == null) {
            return res.status(404).json({ message: 'Cannot find subscriber' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    res.subscriber = subscriber;
    next();
}

module.exports = router;