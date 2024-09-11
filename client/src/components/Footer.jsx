import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="fixed bottom-0">
      <div className="space-x-12">
        <Link 
          to="/" 
        >
          Home
        </Link>
        <Link 
          to="/profile" 
        >
          Profile
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
