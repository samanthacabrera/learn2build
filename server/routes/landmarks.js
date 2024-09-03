const express = require('express');
const router = express.Router();
const { client } = require('../db');

// Get landmarks
router.get('/', async (req, res) => {
    try {
        const db = client.db('learn2build');
        const landmarksCollection = db.collection('landmarks');
        const landmarks = await landmarksCollection.find().toArray();

        // Format coordinates
        const formattedLandmarks = landmarks.map(landmark => ({
            _id: landmark._id,
            name: landmark.name,
            coordinates: {
                lat: landmark.coordinates.coordinates[1], // Latitude
                lng: landmark.coordinates.coordinates[0]  // Longitude
            }
        }));

        res.json(formattedLandmarks);
    } catch (error) {
        console.error("Failed to fetch landmarks", error);
        res.status(500).json({ error: 'Failed to fetch landmarks' });
    }
});

module.exports = router;
