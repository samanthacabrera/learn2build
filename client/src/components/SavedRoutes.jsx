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
                    <div className="bg-white p-4">
                        <button onClick={closeModal}>&times;</button>
                        <ul className="space-y-4 ">
                            {routes.length > 0 ? (
                                routes.map(route => (
                                    <li key={route._id}
                                        className="border-b border-black rounded-sm hover:bg-black hover:bg-opacity-5 transition-all duration-500"
                                    >
                                        <p className="text-2xl leading-relaxed tracking-wide">{route.name}</p>
                                        <p className="mb-2"><span className="tracking-wider">Description: </span>{route.route}</p>
                                        <button className="text-sm text-white bg-black rounded-lg px-2 py-1 my-1">select route</button>
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
