import React, { useState, useEffect } from 'react';
import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/clerk-react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import LandmarkSelector from './components/LandmarkSelector';
import FeaturedRoutes from './components/FeaturedRoutes';
import RunTracker from './components/RunTracker'; 
// import Profile from './components/Profile';
import Footer from './components/Footer';

const App = () => {
    const [landmarks, setLandmarks] = useState([]);
    const [selectedLandmarks, setSelectedLandmarks] = useState([]);
    const [selectedCity, setSelectedCity] = useState('Denver');
    const [startRun, setStartRun] = useState(false); 

    useEffect(() => {
        fetch('http://localhost:5001/api/landmarks')
            .then(response => response.json())
            .then(data => setLandmarks(data))
            .catch(error => console.error('Error fetching landmarks:', error));
    }, []);

    const handleCloseRunTracker = () => {
        setStartRun(false); 
    };

    return (
        <Router>
            <div>
                <header className="p-2">
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                    <SignedIn>
                        <SignOutButton />
                    </SignedIn>
                </header>
          
                <Routes>
                    <Route 
                        path="/" 
                        element={
                            <>
                                <Welcome setSelectedCity={setSelectedCity} /> 
                                <LandmarkSelector 
                                    landmarks={landmarks} 
                                    selectedLandmarks={selectedLandmarks} 
                                    setSelectedLandmarks={setSelectedLandmarks} 
                                    selectedCity={selectedCity}  
                                />
                                <FeaturedRoutes
                                    selectedCity={selectedCity}
                                /> 
                    
                                {startRun && (
                                    <RunTracker 
                                        selectedLandmarks={selectedLandmarks} 
                                        onClose={handleCloseRunTracker} 
                                    />
                                )}
                            </>
                        } 
                    />
                    {/* <Route path="/profile" element={<Profile />} />  */}
                </Routes>
            <Footer/>
            </div>
        </Router>
    );
};

export default App;
