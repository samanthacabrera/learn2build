import React, { useState, useEffect } from 'react';

const RunTracker = ({ selectedLandmarks, directions, onClose }) => {
    const [isRunning, setIsRunning] = useState(true);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [totalDistance, setTotalDistance] = useState(0);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showDirections, setShowDirections] = useState(false);

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
        alert(`Congrats! Run finished!\nTotal time: ${elapsedTime} seconds\nTotal distance: ${(totalDistance / 1609.34).toFixed(2)} miles.`);
        onClose();
    };

    const toggleDirections = () => {
        setShowDirections(prev => !prev);
    };

    const nextDirection = directions.length > 0 ? directions[0] : null; 
    const nextDirectionText = nextDirection ? nextDirection.instruction : "N/A";
    const nextDirectionDistance = nextDirection ? (nextDirection.distance / 1609.34).toFixed(2) : "0.00"; 

    return (
        <>
            {isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold">Accessing your location...</h3>
                    </div>
                </div>
            )}
            {modalOpen && !isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full overflow-hidden">
                        <h3 className="text-3xl font-bold mb-4 text-center tracking-wider font-sans">Run Tracker</h3>
                        <div className="text-lg mb-2 font-sans">
                            <span>Total Time: {elapsedTime} seconds</span><br />
                            <span>Total Distance: {(totalDistance / 1609.34).toFixed(2)} miles</span><br />
                            <div className="my-2">
                            <span className="text-gray-600 font-light">{nextDirectionDistance} miles - </span> 
                            <span className="font-semibold tracking-wide">{nextDirectionText}</span>
                            </div>   
                        </div>

                        <div className="mt-4">
                            <button 
                                onClick={toggleDirections} 
                                className="w-full bg-white text-black border border-black py-2 rounded-lg transition duration-300 mb-2 font-sans"
                            >
                                {showDirections ? 'Hide Overview' : 'See Overview'}
                            </button>
                            {showDirections && (
                                <div className="max-h-40 overflow-y-auto">
                                    <ul className="list-none">
                                        {directions.map((direction, index) => (
                                            <li key={index} className="mb-2">
                                                <span className="text-gray-600 font-light">{(direction.distance / 1609.34).toFixed(2)} miles - </span>
                                                <span className="">{`${direction.instruction}`}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="flex space-x-4 mt-4">
                            <button 
                                onClick={handleTogglePauseResume} 
                                className={`w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition duration-300 font-sans`}
                            >
                                {isRunning ? 'Pause Run' : 'Resume Run'}
                            </button>
                            <button 
                                onClick={handleFinishRun} 
                                disabled={!isRunning} 
                                className={`w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition duration-300 font-sans ${!isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Finish Run
                            </button>
                        </div>
                        <button onClick={onClose} className="absolute top-4 right-4 text-gray-100 hover:text-gray-200 font-sans">
                            &times; Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default RunTracker;
