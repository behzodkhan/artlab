import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from './logo.png'

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
                <img 
                src={logo}
                alt="Logo" 
                className="h-9 w-9"
                />
                <span className="text-2xl font-bold text-gray-800">
                ArtLab
                </span>
            </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className={`${
                  isActive('/') ? 'border-lime-400 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Home
              </Link>
              <Link
                to="/artists"
                className={`${
                  isActive('/artists') ? 'border-lime-400 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Artists
              </Link>
              <Link
                to="/about"
                className={`${
                  isActive('/about') ? 'border-lime-400 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                About
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Link to='/contribute' className="bg-lime-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Contribute
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}