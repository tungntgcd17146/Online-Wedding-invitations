'use client';
import { useEffect, useRef, useState } from 'react';
import { Music } from 'lucide-react';

export default function AudioPlayer({ autoPlay }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => {
          console.log("Autoplay block by browser. Waiting for interaction.", err);
        });
    }
  }, [autoPlay]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error(err));
    }
  };

  return (
    <>
      <audio 
        ref={audioRef}
        src="https://media.cocohappii.com/songs/3163faf6-1bbc-4ec3-9a11-0d26756838ce.mp3"
        loop
      />
      <button
        onClick={togglePlay}
        aria-label="Toggle background music"
        className="fixed bottom-5 right-5 z-40 w-12 h-12 rounded-full bg-black/60 border border-[#928362]/40 text-white flex items-center justify-center shadow-lg hover:bg-black/80 transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <div className={`flex items-center justify-center ${isPlaying ? 'audio-spin' : ''}`}>
          <Music className={`w-5 h-5 ${isPlaying ? 'text-[#fff8ed]' : 'text-gray-400'}`} />
        </div>
        {isPlaying && (
          <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-20 animate-ping pointer-events-none"></span>
        )}
      </button>
    </>
  );
}
