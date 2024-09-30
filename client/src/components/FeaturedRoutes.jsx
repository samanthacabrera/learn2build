import React from 'react';

const routes = {
  Denver: [
    {
      id: 1,
      name: 'Confluence Park to Cheesman Park to City Park',
      description: 'A scenic route that takes you through Denver’s most beautiful parks.',
      landmarks: [
        { name: 'Confluence Park', photoIdea: 'Capture a shot by the river or the pedestrian bridge.' },
        { name: 'Cheesman Park', photoIdea: 'Take a sunset photo from the pavilion.' },
        { name: 'City Park', photoIdea: 'Photograph the lake with a view of downtown Denver in the background.' },
      ],
    },
    {
      id: 2,
      name: 'State Capitol to Convention Center to Union Station',
      description: 'Explore the heart of downtown Denver with this urban route, filled with cultural landmarks.',
      landmarks: [
        { name: 'State Capitol', photoIdea: 'Capture the golden dome shining in the sunlight.' },
        { name: 'Convention Center', photoIdea: 'Photograph the famous Big Blue Bear sculpture peeking into the windows.' },
        { name: 'Union Station', photoIdea: 'Get a night shot of the beautifully lit Union Station sign.' },
      ],
    },
  ],
  LA: [
    {
      id: 3,
      name: 'Ocean Trails Reserve',
      description: 'A stunning coastal route with views of the Pacific Ocean, perfect for a peaceful run.',
      landmarks: [
        { name: 'Ocean Trails Reserve', photoIdea: 'Take a photo of the cliffside trail overlooking the ocean.' },
      ],
    },
  ],
  NY: [
    {
      id: 4,
      name: 'Central Park Loop',
      description: 'Run through New York’s famous Central Park, surrounded by nature and city views.',
      landmarks: [
        { name: 'Central Park', photoIdea: 'Capture the skyline with the park’s greenery in the foreground.' },
      ],
    },
  ],
};

const FeaturedRoutes = ({ onSelectRoute, selectedCity }) => {
  const cityRoutes = routes[selectedCity] || [];

  return (
    <div className="flex flex-col items-center p-8 my-12 md:my-32">
      <h1 className="text-2xl md:text-4xl font-extrabold uppercase tracking-wide text-gray-900 mb-2 text-center">
        Run the Classics
      </h1>
      <p className="mb-12">Explore {selectedCity}'s Most Iconic Running Routes with Photo Ideas</p>
      <div className="w-full max-w-3xl">
        <ul className="space-y-8">
          {cityRoutes.map((route) => (
            <li key={route.id} className="p-8 bg-white rounded-lg shadow-xl border-2 border-gray-600">
              <h2 className="text-2xl font-bold">{route.name}</h2>
              <p className="mt-3 text-lg text-gray-700">{route.description}</p>
              <p className="text-lg tracking-wide my-1">Landmarks & Photo Ideas:</p>
              <ul className="list-disc list-inside space-y-2">
                {route.landmarks.map((landmark, index) => (
                  <li key={index} className="text-gray-800 text-md">
                    <span className="font-semibold">{landmark.name}</span>: {landmark.photoIdea}
                  </li>
                ))}
              </ul>
              {/* Button is not functional...yet! */}
              <button
                className="mt-4 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800"
              >
                Start Run
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeaturedRoutes;
