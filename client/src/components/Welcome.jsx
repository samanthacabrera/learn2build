import React from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';

const Welcome = () => {
  const { isSignedIn } = useUser();
  const { redirectToSignUp } = useClerk();

  const handleButtonClick = () => {
    if (!isSignedIn) {
      redirectToSignUp(); 
    } else {
      const communitySection = document.getElementById("community");
      if (communitySection) {
        communitySection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-center p-4 sm:p-8">
      <h1 className="text-5xl sm:text-8xl font-extrabold text-black mb-4 sm:mb-8 tracking-wider uppercase">
        <span className="line-through">See</span> Run the City
      </h1>
      <p className="text-lg sm:text-2xl text-gray-800 max-w-3xl mb-8 sm:mb-12 leading-relaxed tracking-wide">
        Combine fitness and adventure. <span className="italic">Run The City</span> transforms your business trips and vacations into 
        active explorations. Stay fit and see the best of every city, one run at a time.
      </p>
      <p className="text-base sm:text-xl text-gray-700 max-w-2xl mb-8 sm:mb-16 leading-loose">
        Join a community of driven individuals. Share your routes and inspire others by tagging us on social media.
      </p>
      <button 
        className="px-6 sm:px-8 py-3 sm:py-4 bg-black text-white font-bold rounded-full shadow-md hover:scale-105 transition-all duration-200"
        onClick={handleButtonClick}
      >
        {isSignedIn ? 'Get Inspired' : 'Get Started'}
      </button>
    </div>
  );
};

export default Welcome;
