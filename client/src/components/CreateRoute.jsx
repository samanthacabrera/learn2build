import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import RunTracker from './RunTracker'; 

const CreateRoute = ({ selectedLandmarks, mapboxToken }) => {
    const { isSignedIn } = useAuth(); 
    const [route, setRoute] = useState('');
    const [startRun, setStartRun] = useState(false);
    const [currentLocation, setCurrentLocation] = useState(null);

    useEffect(() => {
        if (!selectedLandmarks.length) {
            setRoute("You must select at least one landmark to create a route.");
            return;
        }

        const landmarksRoute = selectedLandmarks.map(l => l.name).join(' to ');
        setRoute(`Customized route from your location to ${landmarksRoute} to your location`);
    }, [selectedLandmarks]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentLocation({ latitude, longitude });
                },
                (error) => {
                    console.error("Error getting location: ", error);
                    alert("Please allow location access to create a route.");
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
            alert("Geolocation is not supported by your browser.");
        }
    }, []);

    if (!isSignedIn) {
        return <div>Please sign in to create a route.</div>;
    }

    const handleClose = () => {
        setStartRun(false); 
    };

    return (
        <div className="flex flex-col items-center my-6 p-4 max-w-md w-full">
            {route && (
                <>
                    <p className="text-gray-800 mb-4">{route}</p>
                    <div className="flex space-x-4">
                        <button 
                            onClick={() => setStartRun(true)} 
                            className={`bg-gray-800 text-white py-2 px-4 rounded-lg transition duration-300 
                                ${!selectedLandmarks.length || !currentLocation ? 'cursor-not-allowed' : 'hover:bg-gray-700'}`} 
                            disabled={!selectedLandmarks.length || !currentLocation}
                        >
                            Start Run 
                        </button>
                    </div>
                    {startRun && (
                        <RunTracker 
                            selectedLandmarks={selectedLandmarks} 
                            userLocation={currentLocation} 
                            onClose={handleClose} 
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default CreateRoute;
