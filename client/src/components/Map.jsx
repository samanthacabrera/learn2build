// src/components/Map.jsx
import React from 'react';
import ReactMapGL from 'react-map-gl';

const Map = () => {
  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

  console.log('Map component rendered');
  console.log('Mapbox Token:', mapboxToken);

  if (!mapboxToken) {
    console.error('Mapbox token is missing');
    return <div>Error: Mapbox token not provided</div>;
  }

  const [viewport, setViewport] = React.useState({
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 8,
  });

  console.log('Viewport state:', viewport);

  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height="400px"
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxApiAccessToken={mapboxToken}
      onViewportChange={(nextViewport) => {
        console.log('Viewport change:', nextViewport);
        setViewport(nextViewport);
      }}
    />
  );
};

export default Map;
