import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

function ContributePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Contribute to ArtLab</h1>
      <div className="max-w-md mx-auto">
        <p className="text-center mb-8">Choose how you'd like to contribute to our growing collection.</p>
        <div className="grid grid-cols-1 gap-4">
          <Link to="/contribute/artist">
            <Button className="w-full bg-lime-500 hover:bg-lime-600">Add Artist</Button>
          </Link>
          <Link to="/contribute/artpiece">
            <Button className="w-full bg-lime-500 hover:bg-lime-600">Add Art Piece</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ContributePage;