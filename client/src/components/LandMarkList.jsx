import React, { useState, useEffect } from 'react';

const LandMarkList = () => {
    const [landmarks, setLandmarks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5001/api/landmarks')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); 
            })
            .then(data => {
                setLandmarks(data); 
            })
            .catch(error => {
                console.error('Error fetching landmarks:', error);
                setError('Failed to fetch landmarks');
            });
    }, []);

    if (error) {
        return <div>Error: {error}</div>; 
    }

    return (
        <div>
            <h2>Landmarks in Denver</h2>
            <ul>
                {landmarks.map(landmark => (
                    <li key={landmark._id}>
                        <span>{landmark.name}</span><br/>
                        Coordinates: Latitude {landmark.coordinates.latitude}, Longitude {landmark.coordinates.longitude}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LandMarkList;
