import React from 'react';
import ReactMapGL, { Marker, Source, Layer } from 'react-map-gl';

const Map = ({ landmarks, selectedLandmarks }) => {
  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

  const [viewport, setViewport] = React.useState({
    latitude: 39.7392, // Denver coordinates
    longitude: -104.9903,
    zoom: 11,
  });

  const [routeCoordinates, setRouteCoordinates] = React.useState([]);
  const [distance, setDistance] = React.useState(null);
  const [userLocation, setUserLocation] = React.useState(null);
  const [isTracking, setIsTracking] = React.useState(false);

  React.useEffect(() => {
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
        const routeDistanceInMeters = data.routes[0].distance;
        const routeDistanceInMiles = routeDistanceInMeters / 1609.34;

        setRouteCoordinates(route);
        setDistance(routeDistanceInMiles.toFixed(2)); 
      } catch (error) {
        console.error('Error fetching route:', error);
      }
    };

    fetchRoute();
  }, [selectedLandmarks, mapboxToken]);

  React.useEffect(() => {
    if (navigator.geolocation && isTracking) {
      const watchId = navigator.geolocation.watchPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          setViewport(prevViewport => ({
            ...prevViewport,
            latitude,
            longitude,
            zoom: 14
          }));
        },
        error => console.error('Error fetching location:', error),
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );

      return () => {
        if (watchId) {
          navigator.geolocation.clearWatch(watchId);
        }
      };
    }
  }, [isTracking]);

  const toggleTracking = () => {
    setIsTracking(prev => !prev);
  };

  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height="400px"
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxApiAccessToken={mapboxToken}
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >
      {landmarks.map(landmark => (
        <Marker
          key={landmark._id}
          latitude={landmark.coordinates.latitude}
          longitude={landmark.coordinates.longitude}
        >
          <div style={{
            backgroundColor: selectedLandmarks.includes(landmark) ? 'red' : 'green',
            width: '15px',
            height: '15px',
            borderRadius: '50%',
            border: '2px solid white',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
            transform: 'translate(-50%, -50%)'
          }} />
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

      {userLocation && (
        <Marker latitude={userLocation.latitude} longitude={userLocation.longitude}>
          <div style={{
            backgroundColor: 'blue',
            width: '15px',
            height: '15px',
            borderRadius: '50%',
            border: '2px solid white',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
            transform: 'translate(-50%, -50%)'
          }} />
        </Marker>
      )}

      {distance !== null && (
        <div style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'white', padding: '5px', borderRadius: '5px' }}>
          Distance: {distance} miles
        </div>
      )}

      <button
        style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: 'white', padding: '5px', borderRadius: '5px' }}
        onClick={toggleTracking}
      >
        {isTracking ? 'Stop Tracking' : 'Start Tracking'}
      </button>
    </ReactMapGL>
  );
};

export default Map;
