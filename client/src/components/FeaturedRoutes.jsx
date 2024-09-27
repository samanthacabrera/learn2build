// src/FeaturedRoutes.jsx
import React from 'react';

const routes = [
  {
    id: 1,
    name: 'Confluence Park to Cheesman Park to City Park',
    description: 'A scenic route that takes you through Denver’s beautiful parks, perfect for a refreshing run.',
    landmarks: [
      { name: 'Confluence Park', pictureIdea: 'Capture a photo of the skyline reflecting in the water.' },
      { name: 'Cheesman Park', pictureIdea: 'Take a picture with the stunning gardens in the background.' },
      { name: 'City Park', pictureIdea: 'Snap a shot of the Denver Museum of Nature & Science.' },
    ],
  },
  {
    id: 2,
    name: 'Coors Field to Empower Field',
    description: 'A vibrant route connecting two of Denver’s iconic stadiums, great for sports enthusiasts.',
    landmarks: [
      { name: 'Coors Field', pictureIdea: 'Get a picture with the iconic scoreboard behind you.' },
      { name: 'Empower Field', pictureIdea: 'Pose in front of the stadium entrance with your running gear.' },
    ],
  },
  {
    id: 3,
    name: 'State Capitol to Convention Center to Union Station',
    description: 'Explore the heart of downtown Denver with this urban route, filled with cultural landmarks.',
    landmarks: [
      { name: 'State Capitol', pictureIdea: 'Take a picture on the steps with the golden dome in view.' },
      { name: 'Convention Center', pictureIdea: 'Snap a photo with the blue bear in front of the convention center.' },
      { name: 'Union Station', pictureIdea: 'Capture a moment with a refreshing drink after your run.' },
    ],
  },
];

const FeaturedRoutes = () => {
  return (
    <div className="flex flex-col items-center my-12 md:my-32">
      <h1 className="text-2xl md:text-4xl font-extrabold uppercase tracking-wide text-gray-900 mb-2 text-center">
        Run the Classics
        </h1>
        <p className="mb-12">Explore Denver's Most Iconic Running Routes</p>
      <div className="w-full max-w-3xl">
        <ul className="space-y-8">
          {routes.map((route) => (
            <li key={route.id} className="p-8 bg-white rounded-lg shadow-xl border-2 border-gray-600">
              <h2 className="text-3xl font-bold">{route.name}</h2>
              <p className="mt-3 text-lg text-gray-700">{route.description}</p>
              <p className="mt-5 font-semibold text-md">Landmarks:</p>
              <ul className="list-disc list-inside space-y-2">
                {route.landmarks.map((landmark, index) => (
                  <li key={index} className="text-gray-800 text-md">
                    {landmark.name} - <span className="italic">{landmark.pictureIdea}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeaturedRoutes;
