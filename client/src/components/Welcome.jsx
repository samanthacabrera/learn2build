import React from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import CitySelector from './CitySelector'; 

const Welcome = ({ setSelectedCity }) => {  
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
    <div className="flex flex-col items-center justify-center bg-white text-center mt-8 md:mt-20 px-4">
      <h1 className="text-5xl sm:text-8xl font-extrabold text-black mb-4 sm:mb-8 tracking-wider uppercase">
        <span className="line-through">See</span> Run the City
      </h1>
      <p className="text-lg sm:text-2xl text-gray-800 max-w-3xl mb-8 leading-relaxed tracking-wide">
        <span className="italic">Run The City</span> transforms your business trips and vacations into 
        active explorations. Stay fit and see the best of every city, one run at a time.
      </p>
      <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mb-4 tracking-wide leading-loose">
        Select the city that you want to explore. 
      </p>
      
      {isSignedIn ? (
        <CitySelector setSelectedCity={setSelectedCity} />
      ) : (
        <button 
          className="px-6 sm:px-8 py-3 sm:py-4 mb-16 bg-black text-white font-bold rounded-full shadow-md hover:scale-105 transition-all duration-200"
          onClick={handleButtonClick}
        >
          Get Started
        </button>
      )}
    </div>
  );
};

export default Welcome;
