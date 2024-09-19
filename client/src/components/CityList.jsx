import React from 'react';

const CityList = ({ setSelectedCity }) => {
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);  
  };

  return (
    <div>
      <label htmlFor="city">Select a city: </label>
      <select id="city" onChange={handleCityChange}>
        <option value="Denver">Denver</option>
        <option value="LA">Los Angeles</option>
        <option value="Chicago">Chicago</option>
      </select>
    </div>
  );
};

export default CityList;
