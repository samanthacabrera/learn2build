import React from 'react';  

const PhotoUpload = () => {
  return (
    <div className="flex flex-col items-center text-center py-32 md:py-0 bg-gray-100">
      <h2 className="text-5xl font-extrabold uppercase tracking-wide text-black mb-6">3. Share Your Run</h2>     
      <p className="text-lg text-gray-700 mb-8">
        Upload a photo from your run to inspire others and showcase your journey. 
        Let the community see your progress and the beautiful places you’ve explored!
      </p>
      <input
        type="file"
        accept="image/*"
        className="py-4 px-6 border-2 border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition duration-200"
      />
      <p className="text-sm text-gray-500 mt-4">Select an image that captures your best moments!</p>
    </div>
  );
};

export default PhotoUpload;
