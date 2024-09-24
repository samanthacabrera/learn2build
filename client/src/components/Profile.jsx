import React from 'react';
import { useUser, SignedIn, SignedOut } from '@clerk/clerk-react';
import RouteLogs from './RouteLogs';
const Profile = () => {
  const { user } = useUser(); 
  
  return (
    <div className="flex flex-col min-h-screen items-center">
      <h2 className="text-5xl mb-4">My Profile</h2>
      
      <SignedIn>
        {user ? ( 
          <p>welcome, {user.firstName}!</p>
        ) : (
          <p>loading user information...</p> 
        )}
        <RouteLogs />
      </SignedIn>

      <SignedOut>
        <p>please sign in to view your profile.</p>
      </SignedOut>
    </div>
  );
};

export default Profile;
