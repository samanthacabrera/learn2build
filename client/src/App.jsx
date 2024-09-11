import React, { useState, useEffect } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import LandMarkList from './components/LandMarkList';
import Map from './components/Map';
import SavedRoutes from './components/SavedRoutes';
import Profile from './components/Profile';
import Footer from './components/Footer';

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
    <Router>
      <div>
        <header>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </header>

        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <Welcome />
                <LandMarkList 
                  landmarks={landmarks} 
                  selectedLandmarks={selectedLandmarks} 
                  setSelectedLandmarks={setSelectedLandmarks} 
                />
                <Map 
                  landmarks={landmarks} 
                  selectedLandmarks={selectedLandmarks} 
                />
                <SavedRoutes />
              </>
            } 
          />
          <Route path="/profile" element={<Profile />} /> 
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
};

export default App;
