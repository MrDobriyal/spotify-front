import React from 'react';

export default function Artist({ artists, onSelectArtist }) {
  return (
    <div className="mb-6 text-white">
      <h2 className="text-black text-2xl font-bold mb-4">Artists</h2>
      <div className="flex overflow-x-auto gap-4 pb-2">
        <div
          onClick={() => onSelectArtist(null)}
          className="min-w-[100px]  p-3 rounded-lg bg-gray-600 text-center cursor-pointer hover:bg-gray-700 transition-all"
        >
          All
        </div>
        {artists.map((artist) => (
          <div
            key={artist.id}
            onClick={() => onSelectArtist(artist.id)}
            className="min-w-[120px] flex-shrink-0 p-3 bg-gray-600 rounded-lg hover:bg-gray-700 cursor-pointer text-center transition-all"
          >
            <img
              className="w-20 h-20 mx-auto object-cover rounded-full mb-2"
              src={artist.image}
              alt={artist.name}
            />
            <p className="text-sm">{artist.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}