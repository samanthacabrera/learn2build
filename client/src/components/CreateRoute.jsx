import React, { useState } from 'react';

const CreateRoute = ({ selectedLandmarks }) => {
    const [route, setRoute] = useState('');
    const [name, setName] = useState(''); 
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
        if (route && name) {
            try {
                const response = await fetch('http://localhost:5001/api/routes/save-route', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, route })
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Route saved successfully:', data);

                    setRoutes([...routes, { name, route }]);
                    setRoute(''); 
                    setName(''); // Clear name field after saving
                } else {
                    console.error('Failed to save route');
                }
            } catch (error) {
                console.error('Error saving route:', error);
            }
        } else {
            console.error('Route or name is missing');
        }
    };

    return (
        <div>
            <button onClick={displayRoute}>Create Route</button>
            {route && (
                <>
                    <p>{route}</p>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        placeholder="Enter route name" 
                    />
                    <button onClick={saveRoute}>Save Route</button>
                </>
            )}
        </div>
    );
};

export default CreateRoute;
