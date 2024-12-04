// scripts/generate-sitemap.js

import fs from 'fs';
import axios from 'axios';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

// Base URL of your website
const BASE_URL = 'https://artlab.dovuchcha.uz';
const BASE_BACK_URL = 'https://artlab.pythonanywhere.com';


// Define static routes
const staticRoutes = [
  '/',
  '/artists',
  '/about',
  '/contribute',
  'contribute/artist',
  '/contribute/artpiece'
  // Add other static routes here
];

// Function to fetch dynamic routes (e.g., individual art pieces and artists)
const fetchDynamicRoutes = async () => {
  try {
    // Fetch art pieces
    const artResponse = await axios.get(`${BASE_BACK_URL}/api/art_pieces/`);
    const artPieces = artResponse.data;

    // Fetch artists
    const artistsResponse = await axios.get(`${BASE_BACK_URL}/api/artists/`);
    const artists = artistsResponse.data;

    // Generate URLs for art pieces
    const artUrls = artPieces.map(piece => `/art_pieces/${piece.id}`);

    // Generate URLs for artists
    const artistUrls = artists.map(artist => `/artists/${artist.id}`);

    return [...artUrls, ...artistUrls];
  } catch (error) {
    console.error('Error fetching dynamic routes:', error);
    return [];
  }
};

// Main function to generate sitemap
const generateSitemap = async () => {
  // Fetch dynamic routes
  const dynamicRoutes = await fetchDynamicRoutes();

  // Combine static and dynamic routes
  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  // Create a stream to write to
  const stream = new SitemapStream({ hostname: BASE_URL });

  // Convert routes to sitemap entries
  const sitemapEntries = allRoutes.map(route => ({
    url: route,
    changefreq: 'weekly',
    priority: 0.7,
  }));

  // Add sitemap entries to the stream
  const xmlString = await streamToPromise(Readable.from(sitemapEntries).pipe(stream)).then(data => data.toString());

  // Write the sitemap to public directory
  fs.writeFileSync('public/sitemap.xml', xmlString);

  console.log('sitemap.xml generated successfully!');
};

generateSitemap();