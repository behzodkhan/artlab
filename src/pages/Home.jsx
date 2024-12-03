import React, { useState, useEffect } from 'react';
import ArtSearchBar from '../components/ArtSearchBar';
import ArtGrid from '../components/ArtGrid';
import axios from 'axios';

export default function Home() {
  const [artPieces, setArtPieces] = useState([]);
  const [filteredArtPieces, setFilteredArtPieces] = useState([]);

  // Fetch art pieces from the API
  useEffect(() => {
    const fetchArtPieces = async () => {
      try {
        const response = await axios.get('https://artlab.pythonanywhere.com/api/art_pieces/');
        setArtPieces(response.data);
        setFilteredArtPieces(response.data);
      } catch (error) {
        console.error('Error fetching art pieces:', error);
      }
    };

    fetchArtPieces();
  }, []);

  // Handle search input
  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = artPieces.filter((piece) =>
      piece.title.toLowerCase().includes(lowerCaseQuery) ||
      piece.artist.name.toLowerCase().includes(lowerCaseQuery) || // Search by artist name
      piece.genres.some((genre) =>
        genre.name.toLowerCase().includes(lowerCaseQuery)
      ) // Search by genres
    );
    setFilteredArtPieces(filtered);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900">Discover Arts</h1>
            <ArtSearchBar onSearch={handleSearch} />
        </div>
        <ArtGrid artPieces={filteredArtPieces} />
    </main>
  );
}