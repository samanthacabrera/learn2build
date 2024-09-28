import React from 'react';

const routes = [
  {
    id: 1,
    name: 'Confluence Park to Cheesman Park to City Park',
    description: 'A scenic route that takes you through Denver’s beautiful parks, perfect for a refreshing run.',
    landmarks: [
      { name: 'Confluence Park', photoIdea: 'Capture a shot by the river or the pedestrian bridge.' },
      { name: 'Cheesman Park', photoIdea: 'Take a sunset photo from the pavilion.' },
      { name: 'City Park', photoIdea: 'Photograph the lake with a view of downtown Denver in the background.' },
    ],
  },
  {
    id: 2,
    name: 'Coors Field to Empower Field',
    description: 'A vibrant route connecting two of Denver’s iconic stadiums, great for sports enthusiasts.',
    landmarks: [
      { name: 'Coors Field', photoIdea: 'Snap a picture by the main entrance with the clock tower in the background.' },
      { name: 'Empower Field', photoIdea: 'Take a wide-angle shot from the Mile High seating area.' },
    ],
  },
  {
    id: 3,
    name: 'State Capitol to Convention Center to Union Station',
    description: 'Explore the heart of downtown Denver with this urban route, filled with cultural landmarks.',
    landmarks: [
      { name: 'State Capitol', photoIdea: 'Capture the golden dome shining in the sunlight.' },
      { name: 'Convention Center', photoIdea: 'Photograph the famous Big Blue Bear sculpture peeking into the windows.' },
      { name: 'Union Station', photoIdea: 'Get a night shot of the beautifully lit Union Station sign.' },
    ],
  },
];

const FeaturedRoutes = ({ onSelectRoute }) => {
  return (
    <div className="flex flex-col items-center my-12 md:my-32">
      <h1 className="text-2xl md:text-4xl font-extrabold uppercase tracking-wide text-gray-900 mb-2 text-center">
        Run the Classics
      </h1>
      <p className="mb-12">Explore Denver's Most Iconic Running Routes with Photo Ideas</p>
      <div className="w-full max-w-3xl">
        <ul className="space-y-8">
          {routes.map((route) => (
            <li key={route.id} className="p-8 bg-white rounded-lg shadow-xl border-2 border-gray-600">
              <h2 className="text-2xl font-bold">{route.name}</h2>
              <p className="mt-3 text-lg text-gray-700">{route.description}</p>
              <p className="mt-5 font-semibold text-md">Landmarks & Photo Ideas:</p>
              <ul className="list-disc list-inside space-y-2">
                {route.landmarks.map((landmark, index) => (
                  <li key={index} className="text-gray-800 text-md">
                    <span className="font-semibold">{landmark.name}</span>: {landmark.photoIdea}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => onSelectRoute(route.landmarks)} 
                className="mt-4 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800"
              >
                Start Route
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeaturedRoutes;
