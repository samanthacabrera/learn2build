import React, { useState, useEffect } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import LandMarkList from './components/LandMarkList';
import Map from './components/Map';
import SavedRoutes from './components/SavedRoutes';

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
      <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      <h1 className="text-9xl font-semibold"><span className="line-through pr-1">See </span>Run The City</h1>
      <LandMarkList landmarks={landmarks} selectedLandmarks={selectedLandmarks} setSelectedLandmarks={setSelectedLandmarks}/>
      <Map landmarks={landmarks} selectedLandmarks={selectedLandmarks} />
      <SavedRoutes />
    </div>
  );
};

export default App;
