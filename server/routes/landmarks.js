const express = require('express');
const router = express.Router();
const { client } = require('../db');


router.get('/', async (req, res) => {
    try {
        const db = client.db('learn2build');
        const landmarksCollection = db.collection('landmarks');
        const landmarks = await landmarksCollection.find().toArray();
        console.log(landmarks)
        res.json(landmarks);
    } catch (error) {
        console.error("Failed to fetch landmarks", error);
        res.status(500).json({ error: 'Failed to fetch landmarks' });
    }
});

module.exports = router;
