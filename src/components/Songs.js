import React from 'react';
import { useAudio } from "@/context/AudioContext";

export default function Songs({ audios }) {
  const { playTrack, addInQueue } = useAudio();

  return (
    <div className='text-white'>
      <h1 className="text-black text-2xl font-bold mb-4">Songs</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
        {audios.map((audio, index) => (
          <div
            key={audio.id || index}
            className="bg-gray-600 p-3 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
          >
            <img
              src={audio.image_url}
              alt={audio.title}
              className="w-full h-40 object-cover rounded-md mb-2 cursor-pointer"
              onClick={() => playTrack(audio)}
            />
            <div className="text-sm mb-1 font-medium truncate">{audio.title}</div>
            <div className="text-xs text-gray-400">{audio.duration}</div>
            <div className="flex items-center justify-between mt-2">
              {/* <span
                onClick={() => addInQueue(audio)}
                className="text-xs bg-gray-700  hover:bg-gray-600 px-2 py-1 rounded cursor-pointer"
              >
                Add to Queue
              </span> */}
              <button
                onClick={() => addInQueue(audio)}
                className="text-sm font-medium bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg shadow transition duration-200"
              >
                Add to Queue
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}