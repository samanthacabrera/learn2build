import React, { useState, useEffect } from 'react';

const Community = () => {
  const landmarkPhotos = {
    'Union Station': [
      { url: 'https://images.unsplash.com/photo-1519424187720-db6d0fc5a5d2?q=80&w=1770&auto=format&fit=crop', message: 'Morning run by #Union Station!', user: 'Sam C' },
      { url: 'https://images.unsplash.com/photo-1519424187720-db6d0fc5a5d2?q=80&w=1770&auto=format&fit=crop', message: 'Loved the views on my jog!', user: 'Justin M' },
      { url: 'https://images.unsplash.com/photo-1519424187720-db6d0fc5a5d2?q=80&w=1770&auto=format&fit=crop', message: 'Awesome run to Union Station!', user: 'Sam C' },
    ],
    'Confluence Park': [
      { url: 'https://images.unsplash.com/photo-1578062982426-fe3fbb719669?q=80&w=1758&auto=format&fit=crop', message: 'Running through Confluence Park!', user: 'Justin M' },
      { url: 'https://images.unsplash.com/photo-1578062982426-fe3fbb719669?q=80&w=1758&auto=format&fit=crop', message: 'Breathtaking views of the park!', user: 'Sam C' },
      { url: 'https://images.unsplash.com/photo-1578062982426-fe3fbb719669?q=80&w=1758&auto=format&fit=crop', message: 'Can’t wait to run again here!', user: 'Justin M' },
    ],
    'Coors Field': [
      { url: 'https://images.unsplash.com/photo-1562711936-46f6760be439?q=80&w=1740&auto=format&fit=crop', message: 'Squeezed in a run to see the iconic #CoorsField', user: 'Sam C' },
      { url: 'https://images.unsplash.com/photo-1562711936-46f6760be439?q=80&w=1740&auto=format&fit=crop', message: 'City run with a view!', user: 'Justin M' },
      { url: 'https://images.unsplash.com/photo-1562711936-46f6760be439?q=80&w=1740&auto=format&fit=crop', message: 'A classic finish to a great run!', user: 'Sam C' },
    ],
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentLandmark, setCurrentLandmark] = useState('Union Station');
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        const newIndex = (currentIndex + 1) % landmarkPhotos[currentLandmark].length;
        setCurrentIndex(newIndex);
        setFade(true);
      }, 500);
    }, 4000); 

    return () => clearInterval(timer);
  }, [currentIndex, currentLandmark]);

  return (
    <div className="flex flex-col items-center my-12">
        <h2 className="text-4xl font-bold uppercase tracking-wide text-gray-800 mb-12">
            More than a run. It's a movement.
        </h2>

      <div className="w-full max-w-4xl text-center mb-8">
        <ul className="flex justify-center space-x-4 mb-4">
          {Object.keys(landmarkPhotos).map((landmark) => (
            <li key={landmark}>
              <button
                className={`font-bold tracking-wide uppercase px-4 py-2 ${
                  currentLandmark === landmark ? 'text-black border-b-4 border-gray-800' : 'text-gray-500'
                }`}
                onClick={() => {
                  setCurrentLandmark(landmark);
                  setCurrentIndex(0); 
                }}
              >
                {landmark}
              </button>
            </li>
          ))}
        </ul>

        <div className={`transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
          <img
            src={landmarkPhotos[currentLandmark][currentIndex].url}
            alt={currentLandmark}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
          <p className="mt-4 text-gray-800">
            "{landmarkPhotos[currentLandmark][currentIndex].message}"
          </p>
          <p className="text-gray-700 italic">- {landmarkPhotos[currentLandmark][currentIndex].user}</p>
        </div>
      </div>

    </div>
  );
};

export default Community;
