import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, Brush, MessageCircle } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="h-full bg-gray-800 text-white w-64">
      <div className="p-4 text-2xl font-bold border-b border-gray-700">ArtLab Admin</div>
      <nav className="mt-6">
        <ul className="space-y-4">
          <li>
            <Link to="/admin/dashboard" className="flex items-center px-4 py-2 hover:bg-gray-700">
              <Home className="mr-3 h-5 w-5" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/artists" className="flex items-center px-4 py-2 hover:bg-gray-700">
              <Users className="mr-3 h-5 w-5" />
              Artists
            </Link>
          </li>
          <li>
            <Link to="/admin/artpieces" className="flex items-center px-4 py-2 hover:bg-gray-700">
              <Brush className="mr-3 h-5 w-5" />
              Art Pieces
            </Link>
          </li>
          <li>
            <Link to="/admin/comments" className="flex items-center px-4 py-2 hover:bg-gray-700">
              <MessageCircle className="mr-3 h-5 w-5" />
              Comments
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}