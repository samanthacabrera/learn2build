import React from 'react';
import LandMarkList from './components/LandMarkList';
import ErrorBoundary from './ErrorBoundary';
import Map from 'react-map-gl/dist/esm/components/map';

const App = () => {

    return (
        <div>
            <h1 className="text-9xl font-semibold"><span className="line-through pr-1">See </span>Run The City</h1>
            <LandMarkList />
            <ErrorBoundary>
                <Map /> 
            </ErrorBoundary>
        </div>
    );
};

export default App;




