import { useState } from 'react';
import { Search, X } from 'lucide-react';

function ArtSearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    onSearch(query);
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <div className="relative max-w-lg w-full mx-auto">
      <div className="flex items-center bg-white border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-lime-500">
        <div className="pl-3 flex items-center text-gray-500">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          placeholder="Search art pieces..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="flex-1 px-3 py-2 text-gray-700 bg-transparent focus:outline-none"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="pr-3 text-gray-500 hover:text-gray-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}

export default ArtSearchBar;