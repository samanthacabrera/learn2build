import React from 'react';
import ReactMapGL, { Marker, Source, Layer } from 'react-map-gl';

const Map = ({ landmarks, selectedLandmarks }) => {
  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

  const [viewport, setViewport] = React.useState({
    latitude: 39.7392, // Denver coordinates
    longitude: -104.9903,
    zoom: 11,
  });

  const routeCoordinates = selectedLandmarks.map(landmark => [
    landmark.coordinates.longitude,
    landmark.coordinates.latitude
  ]);

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

      {routeCoordinates.length > 1 && (
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
  );
};

export default Map;
