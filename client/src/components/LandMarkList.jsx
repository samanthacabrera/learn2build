import React, { useState, useEffect } from 'react';

const LandMarkList = ({ onSelectLandmarks }) => {
    const [landmarks, setLandmarks] = useState([]);
    const [selectedLandmarks, setSelectedLandmarks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5001/api/landmarks')
            .then(response => response.json())
            .then(data => {
                setLandmarks(data);
            })
            .catch(error => console.error('Error fetching landmarks:', error));
    }, []);

    const handleCheckboxChange = (landmark) => {
        setSelectedLandmarks(prev => {
            const isSelected = prev.some(l => l._id === landmark._id);
            if (isSelected) {
                return prev.filter(l => l._id !== landmark._id);
            } else {
                return [...prev, landmark];
            }
        });
    };

    useEffect(() => {
        onSelectLandmarks(selectedLandmarks);
    }, [selectedLandmarks]);

    return (
        <div>
            <h2>Select Landmarks</h2>
            <ul>
                {landmarks.map(landmark => (
                    <li key={landmark._id}>
                        <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange(landmark)}
                        />
                        {landmark.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LandMarkList;
