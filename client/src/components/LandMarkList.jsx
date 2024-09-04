import React, { useState, useEffect } from 'react';
import CreateRoute from './CreateRoute';  

const LandMarkList = () => {
    const [landmarks, setLandmarks] = useState([]);
    const [selectedLandmarks, setSelectedLandmarks] = useState([]);

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
            });
    }, []);

    const handleCheckboxChange = (landmark) => {
        setSelectedLandmarks(selected => {
            if (selected.includes(landmark)) {
                return selected.filter(l => l !== landmark);
            } else {
                return [...selected, landmark];
            }
        });
    };

    return (
        <div>
            <h2>Landmarks in Denver</h2>
            <ul>
                {landmarks.map(landmark => (
                    <li key={landmark._id}>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedLandmarks.includes(landmark)}
                                onChange={() => handleCheckboxChange(landmark)}
                            />
                            {landmark.name} <br />
                            Coordinates: Latitude {landmark.coordinates.latitude}, Longitude {landmark.coordinates.longitude}
                        </label>
                    </li>
                ))}
            </ul>
            <CreateRoute selectedLandmarks={selectedLandmarks} />
        </div>
    );
};

export default LandMarkList;
