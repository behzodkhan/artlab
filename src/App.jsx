import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import RootLayout from './Layout';
import ArtistsPage from './pages/ArtistsPage';
import ContributePage from './pages/Contribution/ContributePage';
import AddArtistPage from './pages/Contribution/AddArtistPage';
import AddArtPiecePage from './pages/Contribution/AddArtPiecePage';
import SuccessPage from './pages/Contribution/Success';
import AboutPage from './pages/AboutPage';
import WaitingRoom from './pages/WaitingRoom';
import ArtPieceDetailPage from './pages/ArtPieceDetail';
import ArtistDetailPage from './pages/ArtistsDetail';

export default function App() {
  return (
    <Router>
      <RootLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/art_pieces/:id" element={<ArtPieceDetailPage />} />
          <Route path="/artists/:id" element={<ArtistDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/waiting" element={<WaitingRoom />} />
          <Route path="/artists" element={<ArtistsPage />} />
          <Route path="/contribute" element={<ContributePage />} />
          <Route path="/contribute/artist" element={<AddArtistPage />} />
          <Route path="/contribute/artpiece" element={<AddArtPiecePage />} />
          <Route path="/contribute/success" element={<SuccessPage />} />
        </Routes>
      </RootLayout>
    </Router>
  );
}