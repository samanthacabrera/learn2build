import React, { useState, useEffect } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import LandmarkSelector from './components/LandmarkSelector';
import Profile from './components/Profile';
import Footer from './components/Footer';
import Community from './components/Community';
import FeaturedRoutes from './components/FeaturedRoutes';

const App = () => {
    const [landmarks, setLandmarks] = useState([]);
    const [selectedLandmarks, setSelectedLandmarks] = useState([]);
    const [selectedCity, setSelectedCity] = useState('Denver');

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
                                <Welcome setSelectedCity={setSelectedCity} /> 
                                <LandmarkSelector 
                                    landmarks={landmarks} 
                                    selectedLandmarks={selectedLandmarks} 
                                    setSelectedLandmarks={setSelectedLandmarks} 
                                    selectedCity={selectedCity}  
                                />
                                <FeaturedRoutes/>
                                <Community />
                            </>
                        } 
                    />
                    <Route path="/profile" element={<Profile />} /> 
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
