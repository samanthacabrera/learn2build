import React, { useState, useEffect } from 'react';

const RouteLogs = () => {
    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/routes');
                if (response.ok) {
                    const data = await response.json();
                    setRoutes(data);
                } else {
                    console.error('Failed to fetch routes');
                }
            } catch (error) {
                console.error('Error fetching routes:', error);
            }
        };

        fetchRoutes();
    }, []);

    return (
        <div className="flex flex-col my-6 p-4 max-w-md w-full">
            <h2 className="text-xl tracking-wide mb-4">Run Logs:</h2>
            {routes.length === 0 ? (
                <p>No routes saved yet.</p>
            ) : (
                <ul className="w-full">
                    {routes.map((route) => (
                        <li key={route._id} className="border-b py-2">
                            <h3 className="text-lg">{route.name}</h3>
                            <p>{route.route}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RouteLogs;
