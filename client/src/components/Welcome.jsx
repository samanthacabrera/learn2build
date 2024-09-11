import React from 'react';

const Welcome = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-center p-8">
      <h1 className="text-6xl font-extrabold text-black mb-8 tracking-wider uppercase">
        Welcome to Run the City
      </h1>
      <p className="text-2xl text-gray-800 max-w-3xl mb-12 leading-relaxed tracking-wide">
        Combine fitness and adventure. "Run the City" is your companion for combining sightseeing 
        with your running routine. Whether you're on a business trip or just taking a short vacation, 
        explore the sights while getting your workout in. Stay fit, and see the best of every city, one run at a time.
      </p>
      <p className="text-xl text-gray-700 max-w-2xl mb-16 leading-loose">
        Join a community of driven individuals. Share your routes and inspire others by tagging us on social media. 
      </p>
      <button className="mt-8 px-8 py-4 bg-black text-white text-lg font-bold rounded-full shadow-md hover:scale-105 transition-all duration-500">
        Get Started
      </button>
    </div>
  );
};

export default Welcome;
