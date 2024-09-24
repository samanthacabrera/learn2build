const express = require('express');
const router = express.Router();
const { client } = require('../db');


router.get('/', async (req, res) => {
    try {
        const db = client.db('learn2build');
        const logsCollection = db.collection('logs');
        const loggedRuns = await logsCollection.find().toArray();
        res.status(200).json(loggedRuns);
    } catch (error) {
        console.error("Failed to fetch logged runs", error);
        res.status(500).json({ error: 'Failed to fetch logged runs' });
    }
});

router.post('/save-log', async (req, res) => {
    const { totalDistance, totalTime, landmarksVisited } = req.body;

    if (totalDistance == null || totalTime == null || !landmarksVisited) {
        return res.status(400).json({ error: 'Total distance, total time, and landmarks visited are required' });
    }

    try {
        const db = client.db('learn2build');
        const logsCollection = db.collection('logs');
        const result = await logsCollection.insertOne({
            totalDistance,
            totalTime,
            landmarksVisited,
            date: new Date(),
        });

        res.status(201).json({ message: 'Log saved successfully', logId: result.insertedId });
    } catch (error) {
        console.error("Failed to save log", error);
        res.status(500).json({ error: 'Failed to save log' });
    }
});

module.exports = router;
