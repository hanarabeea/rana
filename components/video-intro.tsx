"use client"

import { useEffect, useRef, useState } from "react"

interface VideoIntroProps {
  onComplete: () => void
  onSkip: () => void
}

export default function VideoIntro({ onComplete, onSkip }: VideoIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Ensure the first frame/poster is available without starting playback
    video.load();
  }, []);

  const handleClick = () => {
    if (started) return;

    const video = videoRef.current;
    if (!video) return;

    setStarted(true);
    video.play().catch(() => {
      // If playback fails (rare), allow another click attempt
      setStarted(false);
    });
  };

  return (
    <div 
      className="fixed inset-0 bg-black flex items-center justify-center z-[9999]"
      onClick={handleClick}
    >
      {!started && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
           <div className="w-16 h-16 rounded-full bg-white/10 border border-white/30 flex items-center justify-center mb-4 animate-[pulse_2s_ease-in-out_infinite]">
             <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[12px] border-l-white border-b-8 border-b-transparent ml-1"></div>
           </div>
           <p className="text-white/80 tracking-widest text-sm uppercase font-light animate-[pulse_2s_ease-in-out_infinite]">Tap to Play</p>
        </div>
      )}
      
      <button 
        className="absolute top-8 right-6 z-20 text-white/50 hover:text-white bg-black/50 px-4 py-2 rounded-full border border-white/20 transition-all text-xs tracking-wider uppercase"
        onClick={(e) => { e.stopPropagation(); onComplete(); }}
      >
        Skip
      </button>

      <div className="w-full h-full flex items-center justify-center bg-black">
        <video 
          ref={videoRef}
          className="w-full h-full object-cover"
          style={{ width: '100vw', height: '100dvh', objectFit: 'cover', objectPosition: 'center' }}
          playsInline={true}
          muted={true}
          autoPlay={true}
          controls={false}
          onEnded={onComplete}
          onPlay={() => setStarted(true)}
          preload="auto"
          disablePictureInPicture
          loop={false}
        >
        <source src="/engagement-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
