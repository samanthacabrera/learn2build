import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';

const SavedRoutes = () => {
    const { isSignedIn } = useAuth(); 
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

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
        <div>
            <button onClick={openModal} className="border p-2 rounded hover:bg-black hover:text-white transition-all duration-300">View Saved Routes</button>
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50">
                    <div className="bg-white">
                        <button onClick={closeModal}>&times;</button>
                        <ul>
                            {routes.length > 0 ? (
                                routes.map(route => (
                                    <li key={route._id}>
                                        <p>Name: {route.name}</p>
                                        <p>Description: {route.route}</p>
                                    </li>
                                ))
                            ) : (
                                <p>No routes saved.</p>
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SavedRoutes;
