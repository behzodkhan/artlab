import React from 'react';
import { Twitter, Instagram, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-12">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
            <Link to="/" className="text-xl font-bold text-gray-800 mb-2">
              ArtLab
            </Link>
            <p className="text-sm text-gray-600">Discover the world of art</p>
          </div>
          <nav className="flex gap-4 mb-4 md:mb-0">
            <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link to="/artists" className="text-sm text-gray-600 hover:text-gray-900">
              Artists
            </Link>
            <Link to="/about" className="text-sm text-gray-600 hover:text-gray-900">
              About
            </Link>
          </nav>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Facebook</span>
              <Send className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Instagram</span>
              <Instagram className="h-6 w-6" />
            </a>
            <Link to="/contribute">
              <Button variant="outline">Contribute</Button>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}