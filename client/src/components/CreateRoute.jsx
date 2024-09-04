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

    const saveRoute = () => {
        if (route) {
            setRoutes([...routes, route]);
            setRoute(''); 
            // alert('route saved')
        }
    };

    return (
        <div>
            <button onClick={displayRoute}>Create Route</button>
            {route && <>
                <p>{route}</p>
                <button onClick={saveRoute}>Save Route</button>
            </>}
            
        </div>
    );
};

export default CreateRoute;
