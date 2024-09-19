import React from 'react';

const CityList = ({ setSelectedCity }) => {
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);  
  };

  return (
    <div className="flex flex-col items-center py-32 md:py-0">
      <label htmlFor="city" className="text-lg font-bold uppercase tracking-wide text-gray-800 mb-2">
        1. Select a city to Explore
      </label>
      <select 
        id="city" 
        onChange={handleCityChange}
        className="w-48 p-3 border-2 border-gray-800 rounded-lg bg-gray-100 text-gray-800 font-semibold tracking-wider uppercase hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50"
      >
        <option value="Denver" className="text-gray-800">Denver</option>
        <option value="LA" className="text-gray-800">Los Angeles</option>
        <option value="Chicago" className="text-gray-800">Chicago</option>
      </select>
    </div>
  );
};

export default CityList;
