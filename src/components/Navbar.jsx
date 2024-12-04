// Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Importing hamburger and close icons
import logo from './logo.png';
import { Button } from './ui/button';

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  // State to manage mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Function to toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side: Logo and Desktop Nav Links */}
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <img src={logo} alt="Logo" className="h-9 w-9" />
                <span className="text-xl font-bold text-gray-800 ml-2">ArtLab</span>
              </Link>
            </div>
            {/* Desktop Nav Links */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className={`${
                  isActive('/')
                    ? 'border-lime-400 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Home
              </Link>
              <Link
                to="/artists"
                className={`${
                  isActive('/artists')
                    ? 'border-lime-400 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Artists
              </Link>
              <Link
                to="/about"
                className={`${
                  isActive('/about')
                    ? 'border-lime-400 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                About
              </Link>
            </div>
          </div>

          {/* Right side: Desktop Contribute Button and Mobile Menu Button */}
          <div className="flex items-center">
            {/* Desktop Contribute Button */}
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <Link
                to="/contribute"
                className="bg-lime-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
              >
                Contribute
              </Link>
            </div>
            {/* Mobile Menu Button */}
            <div className="sm:hidden">
              <button
                onClick={toggleMobileMenu}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-lime-500"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
              className={`${
                isActive('/')
                  ? 'bg-lime-50 border-lime-400 text-lime-700'
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
            >
              Home
            </Link>
            <Link
              to="/artists"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`${
                isActive('/artists')
                  ? 'bg-lime-50 border-lime-400 text-lime-700'
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
            >
              Artists
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`${
                isActive('/about')
                  ? 'bg-lime-50 border-lime-400 text-lime-700'
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
            >
              About
            </Link>
            <Link
              to="/contribute"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium bg-lime-500 text-white hover:bg-lime-600"
            >
              Contribute
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}