import React from 'react';

const PhotoList = ({ photos }) => {
  return (
    <div className="flex flex-col items-center my-12">
      <p className="text-lg font-bold uppercase tracking-wide text-gray-800 mb-2">
        3. Share your Photos
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-md">
        {photos.map((photo, index) => (
          <div key={index} className="border-2 border-gray-800 rounded-lg shadow-lg overflow-hidden">
            <img src={photo.url} alt={photo.landmark} className="w-full h-48 object-cover" />
            <div className="p-2 bg-gray-100">
              <h3 className="font-bold text-gray-800">{photo.landmark}</h3>
              <p className="text-gray-600">{photo.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoList;
