import React from 'react';
import LandMarkList from './components/LandMarkList';
import Map from './components/Map';

const App = () => {
  return (
    <div>
      <h1 className="text-9xl font-semibold"><span className="line-through pr-1">See </span>Run The City</h1>
      <LandMarkList />
        <Map/>
    </div>
  );
};

export default App;
