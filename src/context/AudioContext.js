'use client';
import { createContext, useContext, useState, useRef, useEffect } from "react";
import api from "@/lib/axios";

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasCountedView, setHasCountedView] = useState(false);
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  const playTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setHasCountedView(false);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  const addInQueue = (track) => {
    const newQueue = [...queue, track];
    setQueue(newQueue);
  }

  const playNext = () => {
    if (currentIndex < queue.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setCurrentTrack(queue[nextIndex]);
      setIsPlaying(true);
    }
  };

  const playPrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setCurrentTrack(queue[prevIndex]);
      setIsPlaying(true);
    }
  };

  const closeSong = () => {
    setCurrentTrack(null);
    setIsPlaying(false);
  }

  const updateProgress = (e) => {
    if (audioRef.current && !isSeeking) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };



  const handleSetDuration = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSetCurrentTime = (time) => {
    if (audioRef.current && !isSeeking) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (!hasCountedView && audio.currentTime >= 3) {
        api.post(`audios/listen/${currentTrack.id} `);
        setHasCountedView(true);
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    // audio.addEventListener('seeked', handleSeek);
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      // audio.addEventListener('seeked', handleSeek);
    };
  }, [currentTrack, hasCountedView]);

  // const streamAudioApi = async (url) => {
  //   try {
  //     console.log("run")
  //     const response = await api.get(url);
  //     const blobUrl = response.data;
  //     return blobUrl;
  //   } catch (error) {
  //     console.error("Error starting audio stream:", error);
  //   }
  // };
  



  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    const duration = audio.duration;
    if (isFinite(duration)) {
      setDuration(duration);
    } else {
      console.warn("Duration not available yet");
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [currentTrack]);

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value); // or hardcoded 15 for testing
  
    const audio = audioRef.current;
  
    if (!audio) return;
  
    // Check if metadata is loaded
    if (audio.readyState >= 1) {
      setIsSeeking(true);
      audio.currentTime = seekTime;

      setCurrentTime(seekTime);
      console.log("Seeked to:", audio.currentTime);
  
      setTimeout(() => setIsSeeking(false), 1000);
    } else {
      console.warn("Audio not ready. Metadata not loaded yet.");
    }
  };
  useEffect(() => {
    if (audioRef.current) {
      window.audioRef = audioRef;
    }
  }, [currentTrack]);


  return (
    <AudioContext.Provider
      value={{
        currentTrack, playTrack, togglePlayPause, isPlaying,
        audioRef, closeSong, duration, currentTime, handleSeek,
        handleSetDuration, updateProgress, addInQueue, playNext, playPrevious, 
        handleSetCurrentTime ,queue
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);