import React, { useState } from 'react';
import LandMarkList from './components/LandMarkList';
import RouteMap from './components/RouteMap';

const App = () => {
    const [selectedLandmarks, setSelectedLandmarks] = useState([]);

    return (
        <div>
            <LandMarkList onSelectLandmarks={setSelectedLandmarks} />
            <RouteMap landmarks={selectedLandmarks} />
        </div>
    );
};

export default App;
