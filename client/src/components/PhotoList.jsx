import React, { useState } from 'react';
import Carousel from './Carousel';

const PhotoList = () => {
  const landmarkPhotos = {
    'Union Station': [
      { url: 'https://images.unsplash.com/photo-1519424187720-db6d0fc5a5d2?q=80&w=1770&auto=format&fit=crop', message: 'Morning run by #Union Station!', user: 'Sam C' },
      { url: 'https://images.unsplash.com/photo-1519424187720-db6d0fc5a5d2?q=80&w=1770&auto=format&fit=crop', message: 'Loved the views on my jog!', user: 'Justin M' },
      { url: 'https://images.unsplash.com/photo-1519424187720-db6d0fc5a5d2?q=80&w=1770&auto=format&fit=crop', message: 'Loved the views on my jog!', user: 'Sam C' },
    ],
    'Confluence Park': [
      { url: 'https://images.unsplash.com/photo-1578062982426-fe3fbb719669?q=80&w=1758&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', message: 'Running through Confluence Park!', user: 'Justin M' },
      { url: 'https://images.unsplash.com/photo-1578062982426-fe3fbb719669?q=80&w=1758&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', message: 'Loved the views on my jog!', user: 'Sam C' },
      { url: 'https://images.unsplash.com/photo-1578062982426-fe3fbb719669?q=80&w=1758&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', message: 'Loved the views on my jog!', user: 'Justin M' },
    ],
    'Coors Field': [
      { url: 'https://images.unsplash.com/photo-1562711936-46f6760be439?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', message: 'Squeezed in a run to see the iconic #CoorsField', user: 'Sam C' },
      { url: 'https://images.unsplash.com/photo-1562711936-46f6760be439?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', message: 'Loved the views on my jog!', user: 'Justin M' },
      { url: 'https://images.unsplash.com/photo-1562711936-46f6760be439?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', message: 'Loved the views on my jog!', user: 'Sam C' },
    ],
  };

  const [activeLandmark, setActiveLandmark] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (landmark) => {
    setActiveLandmark(landmark);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveLandmark(null);
  };

  return (
    <div className="flex flex-col items-center my-12">
      <h2 className="text-3xl font-bold uppercase tracking-wide text-gray-800 mb-2">3. Share with Community</h2>

      <div className="flex flex-col lg:flex-row justify-between items-start w-full max-w-4xl my-6">
        <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
          <input
            type="file"
            accept="image/*"
          />
        </div>
        
        <div className="w-full lg:w-1/2">
          <p className="text-2xl text-gray-800 mb-2">
            Check out photos from fellow runners
          </p>
          
          {Object.keys(landmarkPhotos).map((landmark) => (
            <div key={landmark} className="w-full max-w-2xl mb-12">
              <h3 className="text-xl text-gray-800 mb-4">{landmark}</h3>
              <div className="flex items-start">
                <img
                  src={landmarkPhotos[landmark][0].url}
                  alt={landmark}
                  className="w-1/2 h-40 object-cover rounded-lg shadow-md cursor-pointer"
                />
                <div className="w-1/2 p-4">
                  <p className="text-gray-800">{landmarkPhotos[landmark][0].message}</p>
                  <p className="text-gray-700 tracking-wide italic">- {landmarkPhotos[landmark][0].user}</p>
                  <button
                    onClick={() => openModal(landmark)}
                    className="border p-2 mt-1"
                  >
                    View More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <Carousel
          landmark={activeLandmark}
          photos={landmarkPhotos[activeLandmark]}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default PhotoList;
