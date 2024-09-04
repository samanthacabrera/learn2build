import React from 'react';
import LandMarkList from './components/LandMarkList';
import './App.css'

const App = () => {
   
    return (
        <div>
            <h1 className="text-xl font-semibold"><span className="line-through pr-1">See </span>Run The City</h1>
            <LandMarkList  />
        </div>
    );
};

export default App;
