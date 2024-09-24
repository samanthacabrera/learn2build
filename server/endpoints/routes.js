const express = require('express');
const router = express.Router();
const { client } = require('../db');

router.get('/', async (req, res) => {
    // console.log('GET routes request received');
    try {
        const db = client.db('learn2build');
        const routesCollection = db.collection('routes');
        const savedRoutes = await routesCollection.find().toArray();
        res.status(200).json(savedRoutes);
    } catch (error) {
        console.error("Failed to fetch saved routes", error);
        res.status(500).json({ error: 'Failed to fetch saved routes' });
    }
});


router.post('/save-route', async (req, res) => {
    const { name, route } = req.body;

    if (!name || !route) {
        return res.status(400).json({ error: 'Name and route are required' });
    }

    try {
        const db = client.db('learn2build');
        const routesCollection = db.collection('routes');
        const result = await routesCollection.insertOne({ name, route });

        res.status(201).json({ message: 'Route saved successfully', routeId: result.insertedId });
    } catch (error) {
        console.error("Failed to save route", error);
        res.status(500).json({ error: 'Failed to save route' });
    }
});

module.exports = router;

