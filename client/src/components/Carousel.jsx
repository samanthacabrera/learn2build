import React, { useState } from 'react';

const Carousel = ({ landmark, photos, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextPhoto = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-lg w-full">
        <div className="flex justify-between p-4 border-b">
          <h2 className="text-xl font-bold">{landmark}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            &times;
          </button>
        </div>
        <div className="relative p-4">
          <img
            src={photos[currentIndex].url}
            alt={`${landmark} ${currentIndex}`}
            className="w-full h-40 object-cover rounded-lg"
          />
          <p className="mt-2 text-gray-600">{photos[currentIndex].message}</p>
          
          {/* Carousel Indicators */}
          <div className="absolute inset-x-0 bottom-4 flex justify-center space-x-2">
            {photos.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${currentIndex === index ? 'bg-gray-800' : 'bg-gray-400'}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevPhoto}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white bg-gray-800 rounded-full p-2 hover:bg-gray-700 focus:outline-none"
          >
            &lt;
          </button>
          <button
            onClick={nextPhoto}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white bg-gray-800 rounded-full p-2 hover:bg-gray-700 focus:outline-none"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
