import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isMiles, setIsMiles] = useState(true);
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
        throw new Error('Failed to refresh token');
      }

      setAccessToken(data.access_token);
      localStorage.setItem('strava_access_token', data.access_token); 
    } catch (error) {
      setError(error.message);
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
          await refreshAccessToken();
          return;
        }

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setProfile(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProfile();
  }, [accessToken]); 

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Profile</h2>
        <p><strong>Name:</strong> {profile.firstname} {profile.lastname}</p>
    </div>
  );
};

export default Profile;
