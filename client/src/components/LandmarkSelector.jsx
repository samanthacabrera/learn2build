import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Source, Layer } from 'react-map-gl';
import CreateRoute from './CreateRoute';

const cityCoordinates = {
    Denver: { latitude: 39.7392, longitude: -104.9903 },
    LA: { latitude: 34.0522, longitude: -118.2437 },
    NY: { latitude: 40.7128, longitude: -74.0060 },
};

const LandmarkSelector = ({ landmarks, selectedCity }) => {
    const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

    const [viewport, setViewport] = useState({
        latitude: cityCoordinates[selectedCity]?.latitude || 39.7392, 
        longitude: cityCoordinates[selectedCity]?.longitude || -104.9903,
        zoom: 11,
    });

    const [selectedLandmarks, setSelectedLandmarks] = useState([]);
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    const [landmarkDetails, setLandmarkDetails] = useState(null);
    const [totalDistance, setTotalDistance] = useState(0); 

    useEffect(() => {
        setViewport((prevViewport) => ({
            ...prevViewport,
            latitude: cityCoordinates[selectedCity]?.latitude || prevViewport.latitude,
            longitude: cityCoordinates[selectedCity]?.longitude || prevViewport.longitude,
        }));
    }, [selectedCity]);

    useEffect(() => {
        const fetchRoute = async () => {
            if (selectedLandmarks.length < 2) {
                setTotalDistance(0);
                return;
            }

            const waypoints = selectedLandmarks.map(landmark =>
                `${landmark.coordinates.longitude},${landmark.coordinates.latitude}`
            ).join(';');

            try {
                const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/walking/${waypoints}?steps=true&geometries=geojson&access_token=${mapboxToken}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const route = data.routes[0].geometry.coordinates;
                const distance = data.routes[0].distance; // Distance in meters

                setRouteCoordinates(route);
                setTotalDistance((distance * 0.000621371).toFixed(2)); 
            } catch (error) {
                console.error('Error fetching route:', error);
            }
        };

        fetchRoute();
    }, [selectedLandmarks, mapboxToken]);

    const toggleLandmarkSelection = (landmark) => {
        setSelectedLandmarks((prevSelected) => {
            if (prevSelected.includes(landmark)) {
                return prevSelected.filter((l) => l !== landmark);
            } else {
                return [...prevSelected, landmark];
            }
        });
        setLandmarkDetails(landmark);
    };

    return (
        <div className="flex flex-col items-center">
            <div className="w-full max-w-7xl px-4 md:px-24 flex flex-col md:flex-row relative">

                <div className="w-full md:w-2/3 relative">
                    <ReactMapGL
                        {...viewport}
                        width="100%"
                        height="500px"
                        mapStyle="mapbox://styles/mapbox/streets-v11"
                        mapboxApiAccessToken={mapboxToken}
                        onViewportChange={(nextViewport) => setViewport(nextViewport)}
                    >
                        {landmarks.map(landmark => (
                            <Marker
                                key={landmark._id}
                                latitude={landmark.coordinates.latitude}
                                longitude={landmark.coordinates.longitude}
                            >
                                <div
                                    onClick={() => toggleLandmarkSelection(landmark)}
                                    style={{
                                        backgroundColor: selectedLandmarks.includes(landmark) ? 'red' : 'green',
                                        width: '15px',
                                        height: '15px',
                                        borderRadius: '50%',
                                        border: '2px solid white',
                                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                                        cursor: 'pointer',
                                        transform: 'translate(-50%, -50%)'
                                    }}
                                />
                            </Marker>
                        ))}

                        {routeCoordinates.length > 0 && (
                            <Source
                                id="route"
                                type="geojson"
                                data={{
                                    type: 'Feature',
                                    geometry: {
                                        type: 'LineString',
                                        coordinates: routeCoordinates,
                                    },
                                }}
                            >
                                <Layer
                                    id="route"
                                    type="line"
                                    paint={{
                                        'line-color': '#FF0000',
                                        'line-width': 3,
                                    }}
                                />
                            </Source>
                        )}
                    </ReactMapGL>

                    <div className="absolute top-4 left-4 bg-white text-black p-2 rounded-lg shadow-lg">
                        Total Distance: {totalDistance} miles
                    </div>
                </div>

                <div className="w-full md:w-1/3 p-4 flex flex-col bg-gray-50 rounded-lg shadow-md h-auto mt-4 md:mt-0 md:ml-4">
                    {landmarkDetails ? (
                        <>
                            <h2 className="text-2xl mb-2">{landmarkDetails.name}</h2>
                            <p className="text-gray-700">{landmarkDetails.desc}</p>
                        </>
                    ) : (
                        <p className="text-gray-500">Click on a landmark to see details</p>
                    )}
                    
                    <div className="mt-6">
                        <CreateRoute selectedLandmarks={selectedLandmarks} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandmarkSelector;
