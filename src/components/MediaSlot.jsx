import React, { useState, useEffect, useRef } from "react";
import { PlayIcon, PauseIcon } from "./Icons";

export function MediaSlot({
  fileName = "demo-recording.mp4",
  poster,
  alt = "Ordera demonstration",
  fallback = null,
  className = ""
}) {
  const [mediaAvailable, setMediaAvailable] = useState(false);
  const [tested, setTested] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSaveData = navigator.connection?.saveData === true;

    if (prefersReducedMotion || isSaveData || !fileName) {
      setMediaAvailable(false);
      setTested(true);
      return;
    }

    const src = `/media/${fileName}`;
    fetch(src, { method: "HEAD" })
      .then((res) => {
        if (res.ok && res.headers.get("content-type")?.includes("video")) {
          setMediaAvailable(true);
        } else {
          setMediaAvailable(false);
        }
      })
      .catch(() => {
        setMediaAvailable(false);
      })
      .finally(() => {
        setTested(true);
      });
  }, [fileName]);

  useEffect(() => {
    if (!mediaAvailable || !videoRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && isPlaying) {
          videoRef.current?.play().catch(() => { });
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [mediaAvailable, isPlaying]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => { });
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  if (!tested) {
    return <div ref={containerRef} className={`media-slot-loading ${className}`}>{fallback}</div>;
  }

  if (!mediaAvailable) {
    return <div ref={containerRef} className={`media-slot-fallback ${className}`}>{fallback}</div>;
  }

  return (
    <div ref={containerRef} className={`media-slot-container chamfer-card ${className}`}>
      <video
        ref={videoRef}
        src={`/media/${fileName}`}
        poster={poster}
        muted={isMuted}
        loop
        playsInline
        preload="none"
        aria-label={alt}
        className="media-slot-video"
      />
      <div className="media-controls-overlay">
        <button
          type="button"
          onClick={togglePlay}
          className="media-ctrl-btn"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <PauseIcon size={14} /> : <PlayIcon size={14} />}
        </button>
        <button
          type="button"
          onClick={toggleMute}
          className="media-ctrl-btn font-mono"
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        >
          {isMuted ? "MUTE" : "UNMUTE"}
        </button>
      </div>
    </div>
  );
}
