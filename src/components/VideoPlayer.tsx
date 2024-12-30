import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  title: string;
  onClose: () => void;
}

export function VideoPlayer({ src, title, onClose }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div ref={containerRef} className="relative max-w-4xl w-full mx-4">
        <div className="bg-black rounded-lg overflow-hidden">
          <div className="relative">
            <video
              ref={videoRef}
              src={src}
              className="w-full"
              onEnded={() => setIsPlaying(false)}
            />
            
            {/* Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={togglePlay}
                    className="text-white hover:text-blue-400"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6" />
                    )}
                  </button>
                  
                  <button
                    onClick={toggleMute}
                    className="text-white hover:text-blue-400"
                  >
                    {isMuted ? (
                      <VolumeX className="w-6 h-6" />
                    ) : (
                      <Volume2 className="w-6 h-6" />
                    )}
                  </button>
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={toggleFullscreen}
                    className="text-white hover:text-blue-400"
                  >
                    {isFullscreen ? (
                      <Minimize className="w-6 h-6" />
                    ) : (
                      <Maximize className="w-6 h-6" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Title Bar */}
        <div className="absolute top-0 left-0 right-0 bg-black/80 p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-white font-medium">{title}</h3>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}