import React from 'react';

const PhotoList = () => {
    const photos = [
    { url: 'https://images.unsplash.com/photo-1519424187720-db6d0fc5a5d2?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', landmark: 'Union Station', message: 'Loved being able to see #UnionStation on my morning run!' },
    { url: 'https://images.unsplash.com/photo-1519424187720-db6d0fc5a5d2?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', landmark: 'Union Station', message: 'Loved being able to see #UnionStation on my morning run!' },
    { url: 'https://images.unsplash.com/photo-1519424187720-db6d0fc5a5d2?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', landmark: 'Union Station', message: 'Loved being able to see #UnionStation on my morning run!' },
  ];

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
