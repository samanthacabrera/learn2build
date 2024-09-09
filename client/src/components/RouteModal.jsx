import React from 'react';

const RouteModal = ({ isOpen, onClose, route }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                <h2>Route Details</h2>
                <pre>{JSON.stringify(route, null, 2)}</pre>
            </div>
        </div>
    );
};

export default RouteModal;
