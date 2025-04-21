'use client'
import { useAudio } from "@/context/AudioContext";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AudioPlayer() {
  const {
    currentTrack,
    audioRef,
    isPlaying,
    togglePlayPause,
    closeSong,
    duration,
    handleSeek,
    currentTime,
    playPrevious,
    playNext,
    handleLoadedMetadata,
    updateProgress,
    queue,
    playTrack,
  } = useAudio();

  const [isExpanded, setIsExpanded] = useState(false);
  const [volume, setVolume] = useState(1);

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    if (audioRef.current && currentTrack?.audio_url) {
      audioRef.current.load();
      audioRef.current.volume = volume;
    }
  }, [currentTrack?.audio_url]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  if (!currentTrack) return null;

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white border-t border-gray-800 transition-all duration-300 ${isExpanded ? "h-[100vh] overflow-y-scroll" : "h-8"}`}>
      {/* Expand/Collapse Toggle */}
      <div className="text-center py-1 bg-gray-800 cursor-pointer text-sm" onClick={toggleExpand}>
        {isExpanded ? "Collapse ↓" : "Expand ↑"}
      </div>

      {/* Audio Player Content */}
      <div className={`flex flex-col sm:flex-row items-center ${isExpanded ? "justify-center" : "justify-between"} px-4 py-4 space-y-4 sm:space-y-0 sm:space-x-6`}>
        {/* Close Button */}
        <button className="absolute top-2 right-4 text-white text-xl hover:text-red-500" onClick={closeSong}>
          ×
        </button>

        {/* Animated Album Cover */}
        <motion.img
          src={currentTrack.image_url}
          alt="Track"
          className={`rounded-full object-cover border-4 border-green-500 ${isExpanded ? "w-48 h-48" : "w-14 h-14"}`}
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={isPlaying ? { repeat: Infinity, duration: 10, ease: "linear" } : {}}
        />

        {/* Track Info */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <h3 className="text-lg font-semibold">{currentTrack.title}</h3>
          <p className="text-sm text-gray-400">{currentTrack.description}</p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <button onClick={playPrevious} className="text-lg hover:text-green-400 transition">⏮</button>
          <button
            onClick={togglePlayPause}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-full text-white font-semibold transition"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button onClick={playNext} className="text-lg hover:text-green-400 transition">⏭</button>
        </div>

        {/* Time & Progress Bar */}
        <div className="w-full max-w-2xl mt-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>{formatDuration(currentTime)}</span>
            <span>{formatDuration(duration)}</span>
          </div>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="w-full accent-green-500"
          />
        </div>

        {/* Volume */}
        <div className="flex items-center space-x-2 text-xs mt-2 sm:mt-0">
          <span>🔊</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="accent-green-500"
          />
        </div>
      </div>

      {/* Queue Display (Expanded View Only) */}
      {isExpanded && (
        <div className="mt-6 px-4">
          <h4 className="text-lg font-semibold mb-2">Queue</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {queue.map((track, index) => (
              <div
                key={index}
                className="bg-gray-800 p-3 rounded hover:bg-gray-700 cursor-pointer text-center"
                onClick={() => playTrack(track)}
              >
                <img src={track.image_url} alt={track.title} className="w-full h-24 object-cover rounded mb-2" />
                <p className="text-sm truncate">{track.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <audio
        ref={audioRef}
        key={currentTrack.id}
        src={currentTrack.audio_url}
        onTimeUpdate={updateProgress}
        preload="metadata"
        onLoadedMetadata={handleLoadedMetadata}
        autoPlay
      />
    </div>
  );
}