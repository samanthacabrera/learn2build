import * as React from 'react';
import { Map as ReactMapGL } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';

const Map = React.forwardRef((props, ref) => {
  const { mapboxAccessToken, initialViewState, style, mapStyle, ...rest } = props;

  React.useEffect(() => {
    if (mapboxAccessToken) {
      mapboxgl.accessToken = mapboxAccessToken;
    }
  }, [mapboxAccessToken]);

  return (
    <ReactMapGL
      {...rest}
      initialViewState={initialViewState}
      style={style}
      mapStyle={mapStyle}
      ref={ref}
    />
  );
});

export default Map