import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';

const RouteMap = ({ landmarks }) => {

    const positions = landmarks.map(landmark => {
        return [landmark.coordinates.coordinates[1], landmark.coordinates.coordinates[0]];
    });

    return (
        <MapContainer center={positions[0]} zoom={13} style={{ height: '500px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            />
            {positions.map((position, index) => (
                <Marker key={index} position={position} icon={new L.Icon({
                    iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
                    iconSize: [38, 95],
                    iconAnchor: [22, 94],
                    popupAnchor: [-3, -76],
                    shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',
                    shadowSize: [68, 95],
                    shadowAnchor: [22, 94]
                })} />
            ))}
            <Polyline positions={positions} color="blue" />
        </MapContainer>
    );
};

export default RouteMap;
