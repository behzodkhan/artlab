import React, { useState } from 'react';

const filters = [
  { name: 'Genre', options: ['Abstract', 'Realism', 'Impressionism', 'Surrealism', 'Pop Art', 'Landscape Painting'] },
  { name: 'Medium', options: ['Oil on Canvas', 'Acrylic', 'Watercolor', 'Digital', 'Mixed Media'] },
  { name: 'Style', options: ['Modern', 'Contemporary', 'Classical', 'Minimalist', 'Expressionist', 'Realism'] },
];

function Filters({ onFilterChange }) {
  const [activeFilters, setActiveFilters] = useState({});

  const handleFilterChange = (filterName, option) => {
    const newFilters = { ...activeFilters, [filterName]: option };
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between">
          {filters.map((filter) => (
            <div key={filter.name} className="relative group mb-4 sm:mb-0">
              <button
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {filter.name}
                <svg
                  className="ml-2 -mr-0.5 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 hidden group-hover:block">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  {filter.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleFilterChange(filter.name, option)}
                      className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left ${
                        activeFilters[filter.name] === option ? 'bg-gray-100' : ''
                      }`}
                      role="menuitem"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Filters;