// ArtGrid.jsx
import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

// Utility function to get random color classes
const getRandomColorClass = () => {
  const colors = [
    'bg-red-200 text-red-800',
    'bg-blue-200 text-blue-800',
    'bg-green-200 text-green-800',
    'bg-yellow-200 text-yellow-800',
    'bg-purple-200 text-purple-800',
    'bg-pink-200 text-pink-800',
    'bg-indigo-200 text-indigo-800',
    'bg-teal-200 text-teal-800',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

function ArtGrid({ artPieces }) {
  const [genres, setGenres] = useState({});
  const [artistData, setArtistData] = useState({});
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state (optional)

  // Helper function to preload images
  const preloadImages = (urls) => {
    return Promise.all(
      urls.map(
        (url) =>
          new Promise((resolve) => {
            const img = new Image();
            img.src = url;
            img.onload = () => resolve(true);
            img.onerror = () => resolve(true); // Resolve even if the image fails to load
          })
      )
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch genres
        const genreResponse = await fetch('https://behzod.pythonanywhere.com/api/genres/');
        if (!genreResponse.ok) throw new Error('Failed to fetch genres');
        const genreData = await genreResponse.json();
        const genreMap = genreData.reduce((acc, genre) => {
          acc[genre.id] = genre.name;
          return acc;
        }, {});
        setGenres(genreMap);

        // Fetch unique artist IDs
        const artistIds = Array.from(new Set(artPieces.map((piece) => piece.artist)));

        // Fetch all artist data in parallel
        const artistPromises = artistIds.map(async (id) => {
          const response = await fetch(`https://behzod.pythonanywhere.com/api/artists/${id}`);
          if (!response.ok) throw new Error(`Failed to fetch artist with ID ${id}`);
          const artist = await response.json();
          return { id: artist.id, data: artist };
        });

        const artists = await Promise.all(artistPromises);
        const artistMap = artists.reduce((acc, artist) => {
          acc[artist.id] = artist.data;
          return acc;
        }, {});
        setArtistData(artistMap);

        // Collect all image URLs from artPieces
        const imageUrls = artPieces.map((piece) => piece.image);

        // Preload all images
        await preloadImages(imageUrls);

        // All data and images fetched successfully
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message); // Set error message
        setLoading(false);
      }
    };

    fetchData();
  }, [artPieces]);

  const breakpointColumnsObj = {
    default: 3, // 3 columns for large screens
    1100: 2,    // 2 columns for medium screens
    768: 1,     // 1 column for small screens
  };

  const maxImageHeight = 5000; // Define the maximum allowed height for images

  if (loading) {
    return <LoadingSpinner context="Loading Art Pieces..." />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex -ml-4 w-auto"
        columnClassName="pl-4 bg-clip-padding"
      >
        {artPieces.map((piece) => (
          <Link key={piece.id} to={`/art_pieces/${piece.id}`}>
            <div
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105 mb-4"
            >
              <div className="relative">
                <img
                  src={piece.image}
                  alt={piece.title}
                  className="w-full h-auto object-contain"
                  style={{
                    maxWidth: '100%',        // Prevent images from overflowing the container width
                    maxHeight: maxImageHeight, // Scale down images exceeding the max height
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{piece.title}</h3>
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center">
                    {artistData[piece.artist] ? (
                      <>
                        <img
                          src={artistData[piece.artist].profile_picture}
                          alt={artistData[piece.artist].name}
                          className="w-6 h-6 rounded-full mr-2"
                        />
                        <p className="text-sm text-gray-600">{artistData[piece.artist].name}</p>
                      </>
                    ) : (
                      <p className="text-sm text-gray-400">Loading artist...</p>
                    )}
                  </div>
                  <p className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                    {piece.created_year}
                  </p>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {piece.genres.map((genreId, index) => (
                    <button
                      key={index}
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${getRandomColorClass()}`}
                    >
                      {genres[genreId] || 'Loading...'}
                    </button>
                  ))}
                  <button
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${getRandomColorClass()}`}
                  >
                    {piece.medium}
                  </button>
                  <button
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${getRandomColorClass()}`}
                  >
                    {piece.style}
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </Masonry>
    </div>
  );
}

export default ArtGrid;