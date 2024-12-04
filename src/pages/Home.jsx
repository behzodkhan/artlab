// Home.jsx
import React, { useState, useEffect } from 'react';
import ArtSearchBar from '../components/ArtSearchBar';
import ArtGrid from '../components/ArtGrid';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner'; // Optional: If you have a LoadingSpinner component

export default function Home() {
  const [artPieces, setArtPieces] = useState([]);
  const [filteredArtPieces, setFilteredArtPieces] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch art pieces from the API
  useEffect(() => {
    const fetchArtPieces = async () => {
      try {
        const response = await axios.get('https://artlab.pythonanywhere.com/api/art_pieces/');
        setArtPieces(response.data);
        setFilteredArtPieces(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching art pieces:', error);
        setError('Failed to load art pieces. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchArtPieces();
  }, []);

  // Handle search input
  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = artPieces.filter((piece) =>
      piece.title.toLowerCase().includes(lowerCaseQuery) ||
      (piece.artist && piece.artist.name.toLowerCase().includes(lowerCaseQuery)) || // Ensure artist exists
      (piece.genres && piece.genres.some((genre) =>
        genre.name.toLowerCase().includes(lowerCaseQuery)
      )) // Ensure genres exist
    );
    setFilteredArtPieces(filtered);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 md:mb-0">
          Discover Arts
        </h1>
        
        {/* Search Bar */}
        <div className="w-full md:w-1/3">
          <ArtSearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Optional: Loading and Error States */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          {/* Reuse the LoadingSpinner component if available */}
          {/* <LoadingSpinner message="Loading Art Pieces..." /> */}
          <p className="text-center text-gray-600">Loading Art Pieces...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center py-20">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      ) : (
        /* Art Grid */
        <ArtGrid artPieces={filteredArtPieces} />
      )}
    </main>
  );
}