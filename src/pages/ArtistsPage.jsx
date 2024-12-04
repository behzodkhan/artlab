// ArtistsPage.jsx
import React, { useState, useEffect } from 'react';
import ArtistCard from '../components/ArtistCard';
import SearchBar from '../components/SearchBar';
import FilterOptions from '../components/FilterOptions';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner'; // Adjust the path as needed

export default function ArtistsPage() {
  const [artists, setArtists] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [fadeKey, setFadeKey] = useState(0); // Key for triggering animation
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get('https://behzod.pythonanywhere.com/api/artists/'); // Removed double slash
        setArtists(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching artists:', error);
        setError('Failed to load artists. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchArtists();
  }, []);

  const filteredArtists = artists.filter((artist) => {
    const matchesSearch = artist.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'All' || artist.era === filter;
    return matchesSearch && matchesFilter;
  });

  // Update fadeKey whenever the filter or search query changes
  useEffect(() => {
    setFadeKey((prevKey) => prevKey + 1);
  }, [filter, searchQuery]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-5">Discover Artists</h1>
      <SearchBar onSearch={setSearchQuery} />
      <FilterOptions onFilterChange={setFilter} selectedFilter={filter} />
      
      {isLoading ? (
        <LoadingSpinner context="Loading Artists..." />
      ) : error ? (
        <div className="flex justify-center items-center py-20">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      ) : (
        <div
          key={fadeKey} // Triggers re-render with animation
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 animate-fade-in"
        >
          {filteredArtists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      )}
    </main>
  );
}