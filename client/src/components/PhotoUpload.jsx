import React from 'react';  

const PhotoUpload = () => {

  return (
    <div className="flex flex-col items-center text-center py-32 md:py-0">
      <h2 className="text-4xl font-bold uppercase tracking-wide text-gray-800 mb-2">3. Share with Community</h2>     
          <input
            type="file"
            accept="image/*"
            className="py-12"
          />
    </div>
  );
};

export default PhotoUpload;
