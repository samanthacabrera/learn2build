import React, { useState } from 'react';

const Carousel = ({ landmark, photos, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl w-full h-full max-w-3xl max-h-[90%] flex flex-col justify-between">
        <div className="flex justify-between px-6">
          <h2 className="text-2xl mt-4">{landmark}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            &times;
          </button>
        </div>
        <div className="flex flex-col px-6">
          <p className="text-lg text-gray-800 mt-2">{photos[currentIndex].message}</p>
          <p className="mt-1 text-gray-500 italic">- {photos[currentIndex].user}</p>
        </div>
        <div className="relative flex-1 flex items-center justify-center px-6">
          <img
            src={photos[currentIndex].url}
            alt={`${landmark} ${currentIndex}`}
            className="w-full h-auto max-h-[70vh] object-cover rounded-lg shadow-md"
          />
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {photos.map((_, index) => (
              <button
                key={index}
                className={`h-1 transition-all duration-300 ${
                  currentIndex === index ? 'bg-gray-800 w-10' : 'bg-gray-400 w-5 hover:bg-gray-600'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
