'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-green-400">🎵 SpotClon</Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-green-400 transition">Home</Link>
            <Link href="/artists" className="hover:text-green-400 transition">Artists</Link>
            <Link href="/playlist" className="hover:text-green-400 transition">Playlists</Link>
            <Link href="/library" className="hover:text-green-400 transition">My Library</Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link href="/" className="block hover:text-green-400 transition">Home</Link>
          <Link href="/artists" className="block hover:text-green-400 transition">Artists</Link>
          <Link href="/playlist" className="block hover:text-green-400 transition">Playlists</Link>
          <Link href="/library" className="block hover:text-green-400 transition">My Library</Link>
        </div>
      )}
    </nav>
  );
}