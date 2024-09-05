import React from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

const Map = ({ landmarks }) => {
  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

  const [viewport, setViewport] = React.useState({
    latitude: 39.7392, // Denver coordinates
    longitude: -104.9903, 
    zoom: 12,
  });

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
          <div style={{ backgroundColor: 'green', width: '10px', height: '10px', borderRadius: '50%' }} />
        </Marker>
      ))}
    </ReactMapGL>
  );
};

export default Map;
