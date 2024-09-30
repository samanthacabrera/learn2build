import React, { useState, useEffect } from 'react';

const RunTracker = ({ selectedLandmarks, directions, onClose }) => {
    const [isRunning, setIsRunning] = useState(true);
    const [elapsedTime, setElapsedTime] = useState(0); // in seconds
    const [totalDistance, setTotalDistance] = useState(0); // in meters
    const [currentLocation, setCurrentLocation] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true); 

    const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

    useEffect(() => {
        const askForLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setCurrentLocation({ latitude, longitude });
                        setIsLoading(false); 
                        setModalOpen(true); 
                    },
                    (error) => {
                        console.error("Error getting location: ", error);
                        alert("Please allow location access to track your run.");
                    }
                );
            } else {
                console.error("Geolocation is not supported by this browser.");
                alert("Geolocation is not supported by your browser.");
            }
        };

        askForLocation(); 
    }, []);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setElapsedTime(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

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
            {isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-bold">Loading your location...</h3>
                    </div>
                </div>
            )}
            {modalOpen && !isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-bold">Run Tracker</h3>
                        <div>Total Time: {elapsedTime} seconds</div>
                        <div>Total Distance: {(totalDistance / 1000).toFixed(2)} km</div>

                        {/* Directions Section */}
                        <div className="mt-4">
                            <h3 className="text-gray-800 mb-2">Directions:</h3>
                            <ul className="list-disc list-inside">
                                {directions.map((direction, index) => (
                                    <li key={index}>
                                        {direction.instruction} - {(direction.distance / 1609.34).toFixed(2)} miles
                                    </li>
                                ))}
                            </ul>
                        </div>

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
