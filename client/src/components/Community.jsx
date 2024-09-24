import React, { useState, useEffect } from 'react';

const Community = () => {
  const landmarkPhotos = {
    Denver: [
      { url: 'https://images.unsplash.com/photo-1519424187720-db6d0fc5a5d2?q=80&w=1770&auto=format&fit=crop', message: 'Morning run by #Union Station!', user: 'Sam C' },
      { url: 'https://images.unsplash.com/photo-1578062982426-fe3fbb719669?q=80&w=1758&auto=format&fit=crop', message: 'Running through Confluence Park!', user: 'Justin M' }
    ],
    LosAngeles: [
      { url: 'https://via.placeholder.com/600x400?text=Los+Angeles+Photo+2', message: 'Exploring Griffith Park!', user: 'Jordan K' },
      { url: 'https://via.placeholder.com/600x400?text=Los+Angeles+Photo+3', message: 'Downtown LA vibes!', user: 'Riley B' },
    ],
    NewYork: [
      { url: 'https://via.placeholder.com/600x400?text=New+York+Photo+1', message: 'Running in Central Park!', user: 'Jillian R' },
      { url: 'https://via.placeholder.com/600x400?text=New+York+Photo+2', message: 'Brooklyn Bridge views!', user: 'Taylor L' },
    ],
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCity, setCurrentCity] = useState('Denver');
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        const newIndex = (currentIndex + 1) % landmarkPhotos[currentCity].length;
        setCurrentIndex(newIndex);
        setFade(true);
      }, 500);
    }, 4000); 

    return () => clearInterval(timer);
  }, [currentIndex, currentCity]);

  return (
    <div className="flex flex-col items-center my-12">
      <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-wide leading-loose text-gray-800 mt-24 mb-6">
        More than a run. <br/>It's a movement.
      </h2>

      <div className="w-full max-w-4xl text-center mb-8">
        <ul className="flex justify-center space-x-4 mb-4">
          {Object.keys(landmarkPhotos).map((city) => (
            <li key={city}>
              <button
                className={`font-bold tracking-wide uppercase px-4 py-2 ${
                  currentCity === city ? 'text-black border-b-4 border-gray-800' : 'text-gray-500'
                }`}
                onClick={() => {
                  setCurrentCity(city);
                  setCurrentIndex(0); 
                }}
              >
                {city}
              </button>
            </li>
          ))}
        </ul>

        <div className={`transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
          <p className="my-4 text-gray-800">
            "{landmarkPhotos[currentCity][currentIndex].message}"
            <span className="text-gray-700 italic"> - {landmarkPhotos[currentCity][currentIndex].user}</span>
          </p>
        
          <div className="flex justify-center">
          <img
            src={landmarkPhotos[currentCity][currentIndex].url}
            alt={currentCity}
            className="w-3/4 h-full object-cover rounded-lg shadow-lg"
          />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
