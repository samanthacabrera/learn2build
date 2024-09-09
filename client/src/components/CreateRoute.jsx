import React, { useState } from 'react';

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

    const saveRoute = async () => {
        if (route) {
            try {
                const response = await fetch('http://localhost:5001/api/routes/save-route', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ route })
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Route saved successfully:', data);

                    
                    setRoutes([...routes, route]);
                    setRoute(''); 
                } else {
                    console.error('Failed to save route');
                }
            } catch (error) {
                console.error('Error saving route:', error);
            }
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
        </div>
    );
};

export default CreateRoute;
