import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ onSearch }) {
  return (
    <div className="relative max-w-md w-full mx-auto">
      <input
        type="text"
        placeholder="Search artists..."
        className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
        onChange={(e) => onSearch(e.target.value)}
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
}