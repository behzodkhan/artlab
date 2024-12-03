// Footer.jsx
import React from 'react';
import { Twitter, Instagram, Send, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-12">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          {/* Logo and Description */}
          <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
            <Link to="/" className="text-xl font-bold text-gray-800 mb-2">
              ArtLab
            </Link>
            <p className="text-sm text-gray-600">Discover the world of art</p>
            
            {/* Contact Email */}
            <p className="text-sm text-gray-600 mt-2">
              Contact us:{" "}
              <a
                href="mailto:contact@artlab.com"
                className="text-gray-600 hover:text-gray-900 underline"
              >
                dovuchcha@dovuchcha.uz
              </a>
            </p>
          </div>
          
          {/* Navigation Links */}
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
          
          {/* Social Media and Contribute Button */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex gap-4">
              <a href="https://t.me/dovucca" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Telegram</span>
                <Send className="h-6 w-6" />
              </a>
              <a href="https://youtube.com/@dovuchcha" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <Youtube className="h-6 w-6" />
              </a>
              <a href="https://instagram.com/dovuchcha.uz" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
            </div>
            <Link to="/contribute">
              <Button variant="outline">Contribute</Button>
            </Link>
          </div>
        </div>
        
        {/* Optional: Footer Bottom Text */}
        <div className="mt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} ArtLab. All rights reserved.
        </div>
      </div>
    </footer>
  );
}