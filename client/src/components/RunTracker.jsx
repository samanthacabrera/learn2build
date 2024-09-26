import React, { useState, useEffect } from 'react';

const RunTracker = ({ selectedLandmarks, onClose }) => {
    const [isRunning, setIsRunning] = useState(true);
    const [elapsedTime, setElapsedTime] = useState(0); // in seconds
    const [totalDistance, setTotalDistance] = useState(0); // in meters
    const [currentLocation, setCurrentLocation] = useState(null);
    const [distanceToNextLandmark, setDistanceToNextLandmark] = useState(0);
    const [nextLandmarkName, setNextLandmarkName] = useState('');
    const [modalOpen, setModalOpen] = useState(true);

    const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

    useEffect(() => {
        const askForLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setCurrentLocation({ latitude, longitude });
                    },
                    (error) => {
                        console.error("Error getting location: ", error);
                        alert("Please allow location access to track your run.");
                        setModalOpen(false); 
                    }
                );
            } else {
                console.error("Geolocation is not supported by this browser.");
                alert("Geolocation is not supported by your browser.");
                setModalOpen(false); 
            }
        };

        if (modalOpen) {
            askForLocation();
        }
    }, [modalOpen]);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setElapsedTime(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    useEffect(() => {
        if (isRunning && currentLocation) {
            const closestLandmark = findClosestLandmark(currentLocation.latitude, currentLocation.longitude);
            if (closestLandmark) {
                setNextLandmarkName(closestLandmark.name);
                calculateDistanceToNextLandmark(currentLocation.latitude, currentLocation.longitude, closestLandmark);
            }
        }
    }, [isRunning, currentLocation]);

    const findClosestLandmark = (latitude, longitude) => {
        if (!selectedLandmarks.length) return null;

        return selectedLandmarks.reduce((closest, landmark) => {
            const landmarkDistance = getDistance(latitude, longitude, landmark.coordinates.latitude, landmark.coordinates.longitude);
            if (!closest || landmarkDistance < closest.distance) {
                return { landmark, distance: landmarkDistance };
            }
            return closest;
        }, null)?.landmark;
    };

    const getDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371000; // Radius of the Earth in meters
        const φ1 = (lat1 * Math.PI) / 180;
        const φ2 = (lat2 * Math.PI) / 180;
        const Δφ = ((lat2 - lat1) * Math.PI) / 180;
        const Δλ = ((lon2 - lon1) * Math.PI) / 180;

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                  Math.cos(φ1) * Math.cos(φ2) *
                  Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    };

    const calculateDistanceToNextLandmark = async (latitude, longitude, landmark) => {
        const waypoints = `${longitude},${latitude};${landmark.coordinates.longitude},${landmark.coordinates.latitude}`;
        
        try {
            const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/walking/${waypoints}?geometries=geojson&access_token=${mapboxToken}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            if (data.routes.length > 0) {
                const distance = data.routes[0].distance; 
                setDistanceToNextLandmark(distance);
                setTotalDistance(prev => prev + distance); 
                console.log(`Distance to ${landmark.name}: ${distance} meters`); 
            } else {
                console.error('No routes found.');
            }
        } catch (error) {
            console.error('Error fetching distance:', error);
        }
    };

    const handleTogglePauseResume = () => {
        setIsRunning(prev => !prev);
    };

    const handleFinishRun = () => {
        setIsRunning(false);
        alert(`Run finished! Total time: ${elapsedTime} seconds, Total distance: ${(totalDistance / 1000).toFixed(2)} km.`);
        onClose(); 
    };

    return (
        <>
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-bold">Run Tracker</h3>
                        <div>Total Time: {elapsedTime} seconds</div>
                        <div>Total Distance: {(totalDistance / 1000).toFixed(2)} km</div>
                        <div>Distance to {nextLandmarkName}: {(distanceToNextLandmark / 1000).toFixed(2)} km</div>
                        <div className="flex space-x-4 mt-4">
                            <button 
                                onClick={handleTogglePauseResume} 
                                className={`py-2 px-4 rounded-lg transition duration-300 ${isRunning ? 'bg-yellow-500 text-white hover:bg-yellow-400' : 'bg-blue-500 text-white hover:bg-blue-400'}`}
                            >
                                {isRunning ? 'Pause Run' : 'Resume Run'}
                            </button>
                            <button 
                                onClick={handleFinishRun} 
                                disabled={!isRunning} 
                                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-400 transition duration-300"
                            >
                                Finish Run
                            </button>
                        </div>
                        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900">
                            &times; Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default RunTracker;
