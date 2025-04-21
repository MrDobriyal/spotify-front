'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/axios';
import Songs from '@/components/Songs';

export default function ArtistDetailsPage() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [audios, setAudios] = useState([]);

  useEffect(() => {
    if (id) {
      // Fetch artist bio/info
      api.get(`/artist/details/${id}`)
        .then(res => setArtist(res.data))
        .catch(err => console.error("Error loading artist details", err));

      // Fetch artist's songs
      api.get(`/artist/${id}`)
        .then(res => setAudios(res.data))
        .catch(err => console.error("Error loading artist songs", err));
    }
  }, [id]);

  if (!artist) return <p className="text-gray-500">Loading artist...</p>;

  return (
    <div className="p-4 space-y-6">
      {/* Artist Info */}
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <img
          src={artist.image_url}
          alt={artist.name}
          className="w-48 h-48 object-cover rounded"
        />
        <div>
          <h1 className="text-3xl font-bold">{artist.name}</h1>
          <p className="mt-2 text-gray-600">{artist.bio || "No biography available."}</p>
        </div>
      </div>

      {/* Songs Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Songs by {artist.name}</h2>
        {audios.length > 0 ? (
          <Songs audios={audios} />
        ) : (
          <p className="text-gray-500">No songs found for this artist.</p>
        )}
      </div>
    </div>
  );
}