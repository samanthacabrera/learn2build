import React from 'react';
import CreateRoute from './CreateRoute';

const LandMarkList = ({ landmarks, selectedLandmarks, setSelectedLandmarks }) => {

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
                checked={selectedLandmarks.includes(landmark)} // controls checkbox state
                onChange={() => handleCheckboxChange(landmark)} // handles checkbox change
              />
              {landmark.name}
            </label>
          </li>
        ))}
      </ul>
      <CreateRoute selectedLandmarks={selectedLandmarks} />
    </div>
  );
};

export default LandMarkList;
