import React from 'react';
import { Link } from 'react-router-dom';

export default function ArtistCard({ artist }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
      <div className="p-6 flex flex-col items-center">
        <div className="relative w-32 h-32 mb-4 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
          <img
            src={artist.profile_picture || '/placeholder.svg'}
            alt={artist.name}
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">{artist.name}</h2>
        <p className="text-xs text-gray-500 mb-4">
          {new Date(artist.birth_date).getFullYear()} -{' '}
          {artist.death_date ? new Date(artist.death_date).getFullYear() : 'Present'}
        </p>
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full mb-4 ${getEraBadgeColor(
            artist.era
          )}`}
        >
          {artist.era}
        </span>
        <Link to={`/artists/${artist.id}`}>
          <button className="bg-lime-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 transition-colors duration-300">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}

function getEraBadgeColor(era) {
  switch (era) {
    case 'Modern':
      return 'bg-blue-100 text-blue-800';
    case 'Contemporary':
      return 'bg-green-100 text-green-800';
    case 'Classical':
      return 'bg-yellow-100 text-yellow-800';
    case 'Renaissance':
      return 'bg-purple-100 text-purple-800';
    case 'Baroque':
      return 'bg-pink-100 text-pink-800';
    case 'Realism':
      return 'bg-teal-100 text-teal-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}