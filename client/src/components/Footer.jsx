import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-4 mt-auto">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="hover:text-gray-400 transition-colors">Home</Link>
        </div>
        <div>
          <Link to="/profile" className="hover:text-gray-400 transition-colors">Profile</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
