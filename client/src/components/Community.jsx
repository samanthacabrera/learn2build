import React, { useState, useEffect } from 'react';

const Community = () => {
  const cityReviews = {
    Denver: [
      { review: 'The altitude’s tough, but the trails are worth it.' },
      { review: 'Great parks and views—always something new to run.' },
      { review: 'Even in winter, Denver’s perfect for outdoor runs.' },
    ],
    LosAngeles: [
      { review: 'Beach runs or canyon trails—LA keeps it exciting.' },
      { review: 'City streets or nature—LA’s got it all.' },
      { review: 'Year-round mild weather keeps me consistent.' },
    ],
    NewYork: [
      { review: 'Central Park is my escape in the city.' },
      { review: 'Brooklyn Bridge offers great views and a solid run.' },
      { review: 'Every run in NYC feels like a new adventure.' },
    ],
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCity, setCurrentCity] = useState('Denver');
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        const newIndex = (currentIndex + 1) % cityReviews[currentCity].length;
        setCurrentIndex(newIndex);
        setFade(true);
      }, 500);
    }, 4000); 

    return () => clearInterval(timer);
  }, [currentIndex, currentCity]);

  return (
    <div id="community" className="flex flex-col items-center my-12">
      <h2 className="text-4xl font-bold uppercase tracking-wide leading-loose text-gray-800 mt-24 mb-6">
        More than a run. <br />It's a movement.
      </h2>

      <div className="w-full max-w-4xl text-center mb-8">
        <ul className="flex justify-center space-x-4 mb-4">
          {Object.keys(cityReviews).map((city) => (
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
          <p className="my-24 text-gray-800">
            "{cityReviews[currentCity][currentIndex].review}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default Community;
