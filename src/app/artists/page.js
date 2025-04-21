'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import Link from 'next/link';

export default function ArtistListPage() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    api.get('/artist')
      .then(res => setArtists(res.data))
      .catch(err => console.error("Failed to fetch artists", err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Artists</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {artists.map(artist => (
          <Link
            key={artist.id}
            href={`/artists/${artist.id}`}
            className="block bg-white p-3 rounded shadow hover:shadow-lg transition"
          >
            <img
              src={artist.image}
              alt={artist.name}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h2 className="text-lg font-semibold text-center">{artist.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}