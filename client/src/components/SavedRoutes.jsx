import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';

const SavedRoutes = () => {
    const { isSignedIn } = useAuth(); 
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isSignedIn) {
            setLoading(false); 
            return;
        }

        const fetchRoutes = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/routes');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRoutes(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRoutes();
    }, [isSignedIn]);

    if (!isSignedIn) {
        return <div>Please sign in to view saved routes.</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="mt-4">
            <h2 className="text-3xl tracking-wider mb-2">My Saved Routes</h2>
            <ul>
                {routes.length > 0 ? (
                    routes.map(route => (
                        <li key={route._id}
                            className="border-b border-black rounded-sm hover:bg-black hover:bg-opacity-5 transition-all duration-500"
                        >
                            <p className="text-2xl leading-relaxed mt-2">{route.name}</p>
                            <p className="mb-1"><span className="tracking-wider">Description: </span>{route.route}</p>
                            <button className="text-sm text-white bg-black rounded-lg px-2 py-1 my-1">View Route</button>
                        </li>
                    ))
                ) : (
                    <p>No routes saved.</p>
                )}
            </ul>
        </div>
    );
};

export default SavedRoutes;
