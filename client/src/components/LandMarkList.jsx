import React from 'react';
import CreateRoute from './CreateRoute';

const LandMarkList = ({ landmarks, selectedLandmarks, setSelectedLandmarks, selectedCity }) => {
  const handleCheckboxChange = (landmark) => {
    setSelectedLandmarks((selected) => {
      if (selected.includes(landmark)) {
        return selected.filter((l) => l !== landmark);
      } else {
        return [...selected, landmark];
      }
    });
  };

  const filteredLandmarks = landmarks.filter(landmark => landmark.city === selectedCity);

  return (
    <div>
      <h2>Landmarks in {selectedCity}</h2>
      <ul>
        {filteredLandmarks.map((landmark) => (
          <li key={landmark._id}>
            <label>
              <input
                type="checkbox"
                checked={selectedLandmarks.includes(landmark)}
                onChange={() => handleCheckboxChange(landmark)}
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
