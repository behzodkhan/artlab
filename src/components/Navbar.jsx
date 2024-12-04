import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from './logo.png';
import { AuthContext } from '@/contexts/AuthContext';

export default function Navbar() {
  const location = useLocation();
  const { isAuthenticated, username, handleLoginRedirect, handleLogout, isLoading } = useContext(AuthContext);
  const isActive = (path) => location.pathname === path;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (isLoading) {
    return null;
  }

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
              {/* New Contribute Link */}
              <Link
                to="/contribute"
                className={`${
                  isActive('/contribute')
                    ? 'border-lime-400 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Contribute
              </Link>
            </div>
          </div>

          {/* Right side: Desktop Auth Buttons and Mobile Menu Button */}
          <div className="flex items-center">
            {/* Desktop Auth Buttons */}
            <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
              {!isAuthenticated ? (
                <button
                  onClick={handleLoginRedirect}
                  className="bg-lime-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
                >
                  Login
                </button>
              ) : (
                <>
                  <span className="text-gray-700">Hello, {username}!</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Logout
                  </button>
                </>
              )}
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
            {/* New Contribute Link */}
            <Link
              to="/contribute"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`${
                isActive('/contribute')
                  ? 'bg-lime-50 border-lime-400 text-lime-700'
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
            >
              Contribute
            </Link>
            {/* Mobile Auth Buttons */}
            <div className="pt-4 pb-3 border-t border-gray-200">
              {!isAuthenticated ? (
                <button
                  onClick={handleLoginRedirect}
                  className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium bg-lime-500 text-white hover:bg-lime-600"
                >
                  Login
                </button>
              ) : (
                <div className="flex items-center pl-3 pr-4 py-2 border-l-4 border-transparent">
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">Hello, {username}!</div>
                    <button
                      onClick={handleLogout}
                      className="mt-1 text-sm text-red-600 hover:text-red-800"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}