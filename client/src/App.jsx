import React, { useState, useEffect } from 'react';
import LandMarkList from './components/LandMarkList';
import Map from './components/Map';

const App = () => {
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

  return (
    <div>
      <h1 className="text-9xl font-semibold"><span className="line-through pr-1">See </span>Run The City</h1>
      <LandMarkList landmarks={landmarks} selectedLandmarks={selectedLandmarks} setSelectedLandmarks={setSelectedLandmarks}/>
      <Map landmarks={landmarks} selectedLandmarks={selectedLandmarks}  />
    </div>
  );
};

export default App;
