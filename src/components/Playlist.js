import React from 'react';

export default function Playlist({ Playlist, playlistId }) {
  return (
    <div className="mb-6 text-white">
      <h2 className="text-black text-2xl font-bold mb-4">Playlists</h2>
      <div className="flex overflow-x-auto gap-4 pb-2">
        <div
          onClick={() => playlistId(null)}
          className="min-w-[100px] p-3 bg-gray-800 rounded-lg text-center cursor-pointer hover:bg-gray-700 transition-all"
        >
          All
        </div>
        {Playlist.map((playlist) => (
          <div
            key={playlist.id}
            onClick={() => playlistId(playlist.id)}
            className="min-w-[120px] flex-shrink-0 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 cursor-pointer text-center transition-all"
          >
            <img
              className="w-20 h-20 mx-auto object-cover rounded-md mb-2"
              src={playlist.image}
              alt={playlist.title}
            />
            <p className="text-sm truncate">{playlist.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}