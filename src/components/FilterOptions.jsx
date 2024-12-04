import React from 'react';

export default function FilterOptions({ onFilterChange, selectedFilter }) {
  const filters = ['All', 'Modern', 'Contemporary', 'Classical', 'Renaissance', 'Baroque', 'Realism', 'Symbolism'];

  return (
    <div className="flex flex-wrap justify-center gap-2 my-4">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`px-4 py-2 text-sm font-medium rounded-md border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            filter === selectedFilter
              ? 'bg-lime-500 text-white border-lime-500'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}