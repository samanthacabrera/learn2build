import React from 'react';
import LoggedRuns from './LoggedRuns';

const Profile = () => {
  return (
    <div className="flex flex-col min-h-screen p-8 bg-gray-100">
      <h2 className="text-5xl font-extrabold text-center my-16 text-gray-900">
        My Profile
      </h2>
      <div className="flex space-x-8">
        <div className="flex-1 bg-white p-8 rounded-lg shadow-lg">
          <LoggedRuns />
        </div>
      </div>
    </div>
  );
};

export default Profile;
