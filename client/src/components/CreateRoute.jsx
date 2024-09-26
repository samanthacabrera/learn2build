import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import RunTracker from './RunTracker'; 

const CreateRoute = ({ selectedLandmarks, mapboxToken }) => {
    const { isSignedIn } = useAuth(); 
    const [route, setRoute] = useState('');
    const [name, setName] = useState(''); 
    const [startRun, setStartRun] = useState(false);

    useEffect(() => {
        if (selectedLandmarks.length < 2) {
            setRoute("You must select at least 2 landmarks to create a route.");
            return;
        }
        const routeString = selectedLandmarks.map(l => l.name).join(' to ');
        setRoute(`Customized route from ${routeString}`);
    }, [selectedLandmarks]);

    const saveRoute = async () => {
        if (!isSignedIn) {
            console.error('You must be signed in to save a route.');
            return;
        }

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

    if (!isSignedIn) {
        return <div>Please sign in to create and save routes.</div>;
    }

    return (
        <div className="flex flex-col items-center my-6 p-4 max-w-md w-full">
            {route && (
                <>
                    <p className="text-gray-800 mb-4">{route}</p>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        placeholder="Enter route name" 
                        className="border border-gray-300 p-2 rounded-lg mb-4 w-full"
                    />
                    <div className="flex space-x-4">
                        <button 
                            onClick={() => setStartRun(true)} 
                            className="bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300"
                        >
                            Start Run 
                        </button>
                    </div>
                    {startRun && <RunTracker selectedLandmarks={selectedLandmarks} mapboxToken={mapboxToken} />}
                </>
            )}
        </div>
    );
};

export default CreateRoute;
