import React, { useState} from 'react';
import CreateRoute from './CreateRoute';  

const LandMarkList = ({landmarks}) => {
    const [selectedLandmarks, setSelectedLandmarks] = useState([]);

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
