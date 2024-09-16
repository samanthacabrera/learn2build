import React, { useState, useEffect } from 'react';
import RunLogger from './RunLogger';
import SavedRoutes from './SavedRoutes';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState(import.meta.env.VITE_STRAVA_ACCESS_TOKEN);
  const refreshToken = import.meta.env.VITE_STRAVA_REFRESH_TOKEN; 

  const refreshAccessToken = async () => {
    try {
      const response = await fetch('https://www.strava.com/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: import.meta.env.VITE_STRAVA_CLIENT_ID, 
          client_secret: import.meta.env.VITE_STRAVA_CLIENT_SECRET, 
          refresh_token: refreshToken,
          grant_type: 'refresh_token',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(`Failed to refresh token: ${data.error || response.statusText}`);
      }

      setAccessToken(data.access_token);
      localStorage.setItem('strava_access_token', data.access_token); 
    } catch (error) {
      console.error('Error refreshing access token:', error.message);
      setError(`Error refreshing access token: ${error.message}`);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (!accessToken) return;

      try {
        const response = await fetch('https://www.strava.com/api/v3/athlete', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (response.status === 401) {
          console.log('Token expired, refreshing...'); 
          await refreshAccessToken();
          return;
        }

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error.message); 
        setError(`Error fetching profile: ${error.message}`);
      }
    };

    fetchProfile();
  }, [accessToken]); 

  if (error) {
    return <div className="text-red-600 font-bold text-lg">Error: {error}</div>;
  }

  if (!profile) {
    return <div className="text-gray-500">Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <h2 className="text-3xl font-extrabold mb-4">{profile.firstname}'s Profile</h2>
      <div className="flex">
        <RunLogger />
        <SavedRoutes />
      </div>

    </div>
  );
};

export default Profile;
