import React, { useState, useEffect } from 'react';

const RunTracker = ({ selectedLandmarks, mapboxToken }) => {
    const [isRunning, setIsRunning] = useState(true); 
    const [elapsedTime, setElapsedTime] = useState(0); 
    const [totalDistance, setTotalDistance] = useState(0); 
    const [currentLocation, setCurrentLocation] = useState(null);
    const [distanceToNextLandmark, setDistanceToNextLandmark] = useState(0);
    const [modalOpen, setModalOpen] = useState(true); 

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
        if (isRunning) {
            const watchId = navigator.geolocation.watchPosition((position) => {
                const { latitude, longitude } = position.coords;
                setCurrentLocation({ latitude, longitude });
                calculateDistanceToNextLandmark(latitude, longitude);
            }, (error) => {
                console.error("Error getting location: ", error);
            });
            return () => navigator.geolocation.clearWatch(watchId);
        }
    }, [isRunning]);

    const calculateDistanceToNextLandmark = async (latitude, longitude) => {
        if (selectedLandmarks.length > 0) {
            const nextLandmark = selectedLandmarks[0]; // Get the next landmark
            const waypoints = `${longitude},${latitude};${nextLandmark.coordinates.longitude},${nextLandmark.coordinates.latitude}`;
            try {
                const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/walking/${waypoints}?geometries=geojson&access_token=${mapboxToken}`);
                const data = await response.json();
                const distance = data.routes[0].distance; 
                setDistanceToNextLandmark(distance);
                setTotalDistance(prev => prev + distance); 
            } catch (error) {
                console.error('Error fetching distance:', error);
            }
        }
    };

    const handleTogglePauseResume = () => {
        setIsRunning(prev => !prev);
    };

    const handleFinishRun = () => {
        setIsRunning(false);
        alert(`Run finished! Total time: ${elapsedTime} seconds, Total distance: ${(totalDistance / 1000).toFixed(2)} km.`);
        setModalOpen(false); 
    };

    return (
        <>
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-bold">Run Tracker</h3>
                        <div>Total Time: {elapsedTime} seconds</div>
                        <div>Total Distance: {(totalDistance / 1000).toFixed(2)} km</div>
                        <div>Distance to Next Landmark: {(distanceToNextLandmark / 1000).toFixed(2)} km</div>
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
                        <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900">
                            &times; Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default RunTracker;
