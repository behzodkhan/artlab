import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function RootLayout({ children }) {
  return (
    <div className="bg-gray-100 flex flex-col min-h-screen">
      <Navbar />
      <main className='bg-gray-100 flex-grow'>{children}</main>
      <Footer />
    </div>
  );
}