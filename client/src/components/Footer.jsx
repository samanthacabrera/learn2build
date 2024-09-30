import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white text-sm py-4 mt-auto">
      <div className="container mx-auto flex justify-center items-center">
          <p>made with love by <a href="https://github.com/samanthacabrera" target="_blank" rel="noopener noreferrer" className="hover:underline transition duration-500">sam</a></p>
      </div>
    </footer>
  );
};

export default Footer;
