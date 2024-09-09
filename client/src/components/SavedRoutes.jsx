// SavedRoutes.jsx
import React, { useState, useEffect } from 'react';
import RouteModal from './RouteModal';

const SavedRoutes = () => {
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRoute, setSelectedRoute] = useState(null);
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

    const openModal = (route) => {
        setSelectedRoute(route);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedRoute(null);
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
            <h2>Saved Routes</h2>
            <ul>
                {routes.map(route => (
                    <li key={route._id}>
                        <button onClick={() => openModal(route.route)}>View Route</button>
                    </li>
                ))}
            </ul>
            <RouteModal
                isOpen={isModalOpen}
                onClose={closeModal}
                route={selectedRoute}
            />
        </div>
    );
};

export default SavedRoutes;
