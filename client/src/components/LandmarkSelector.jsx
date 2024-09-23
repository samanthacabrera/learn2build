import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Source, Layer } from 'react-map-gl';
import CreateRoute from './CreateRoute';

const LandmarkSelector = ({ landmarks }) => {
    const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

    const [viewport, setViewport] = useState({
        latitude: 39.7392, // Denver coordinates
        longitude: -104.9903,
        zoom: 11,
    });

    const [selectedLandmarks, setSelectedLandmarks] = useState([]);
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    const [landmarkDetails, setLandmarkDetails] = useState(null);

    useEffect(() => {
        const fetchRoute = async () => {
            if (selectedLandmarks.length < 2) return;

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
                setRouteCoordinates(route);
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
            <h2 className="text-4xl font-bold uppercase tracking-wide text-gray-800 my-12">2. Plan Your Route</h2> 
            <ReactMapGL
                {...viewport}
                width="100%"
                height="400px"
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

            {landmarkDetails && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-xl font-bold">{landmarkDetails.name}</h2>
                    <p className="text-gray-600">{landmarkDetails.desc}</p>
                </div>
            )}

            <CreateRoute selectedLandmarks={selectedLandmarks} />
        </div>
    );
};

export default LandmarkSelector;
