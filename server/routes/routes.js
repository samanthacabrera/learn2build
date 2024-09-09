const express = require('express');
const router = express.Router();
const { client } = require('../db');


router.post('/save-route', async (req, res) => {
    const { route } = req.body;

    if (!route) {
        return res.status(400).json({ error: 'No route provided' });
    }

    try {
        const db = client.db('learn2build');
        const routesCollection = db.collection('routes');
        const result = await routesCollection.insertOne({ route });

        res.status(201).json({ message: 'Route saved successfully', routeId: result.insertedId });
    } catch (error) {
        console.error("Failed to save route", error);
        res.status(500).json({ error: 'Failed to save route' });
    }
});

module.exports = router;
