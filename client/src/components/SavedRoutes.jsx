import React, { useState, useEffect } from 'react';

const SavedRoutes = () => {
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
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
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <button
                onClick={openModal}
            >
                View Saved Routes
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50">
                    <div className="bg-white">
                        <button
                            onClick={closeModal}
                        >
                            &times;
                        </button>
                        <ul>
                            {routes.length > 0 ? (
                                routes.map(route => (
                                    <li key={route._id}>
                                        <p><strong>Name:</strong> {route.name}</p>
                                        <p><strong>Route:</strong> {route.route}</p>
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
