import React, { useState } from 'react';

// SavedRoutes Component
const SavedRoutes = ({ routes }) => {
    return (
        <div>
            <h3>Saved Routes</h3>
            {routes.length > 0 ? (
                <ul>
                    {routes.map((route, index) => (
                        <li key={index}>{route}</li>
                    ))}
                </ul>
            ) : (
                <p>No routes saved yet.</p>
            )}
        </div>
    );
};

// CreateRoute Component
const CreateRoute = ({ selectedLandmarks }) => {
    const [route, setRoute] = useState('');
    const [routes, setRoutes] = useState([]);

    const displayRoute = () => {
        if (selectedLandmarks.length < 2) {
            setRoute("You must select at least 2 landmarks to create a route.");
            return;
        }
        const routeString = selectedLandmarks.map(l => l.name).join(' to ');
        setRoute(`Customized route from ${routeString}`);
    };

    const saveRoute = () => {
        if (route) {
            setRoutes([...routes, route]);
            setRoute(''); 
        }
    };

    return (
        <div>
            <button onClick={displayRoute}>Create Route</button>
            {route && (
                <>
                    <p>{route}</p>
                    <button onClick={saveRoute}>Save Route</button>
                </>
            )}
            <SavedRoutes routes={routes} />
        </div>
    );
};

export default CreateRoute;
