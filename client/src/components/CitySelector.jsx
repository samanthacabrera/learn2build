import React from 'react';

const CitySelector = ({ setSelectedCity }) => {
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);  
  };

  return (
    <div className="flex flex-col items-center py-32 md:py-0">
      <label htmlFor="city" className="text-4xl font-bold uppercase tracking-wide text-gray-800 my-12">
        1. Select a City
      </label>
      <select 
        id="city" 
        onChange={handleCityChange}
        className="w-48 mb-12 p-3 border-2 border-gray-800 rounded-lg bg-gray-100 text-gray-800 font-semibold tracking-wider uppercase hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50"
      >
        <option value="Denver" className="text-gray-800">Denver</option>
        <option value="LA" className="text-gray-800">Los Angeles</option>
        <option value="NY" className="text-gray-800">New York</option>
      </select>
    </div>
  );
};

export default CitySelector;
