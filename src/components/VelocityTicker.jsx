import React, { useEffect, useRef } from "react";

export function VelocityTicker({ phrases = [], className = "" }) {
  const trackRef = useRef(null);
  const doubled = [...phrases, ...phrases, ...phrases];

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let extraSpeed = 0;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      extraSpeed = Math.min(10, Math.max(-10, delta * 0.15));

      if (trackRef.current) {
        trackRef.current.style.animationPlayState = "running";
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`velocity-ticker-wrap ${className}`} aria-hidden="true">
      <div ref={trackRef} className="velocity-ticker-track">
        {doubled.map((phrase, i) => (
          <span key={i} className="velocity-ticker-item font-mono">
            <span className="ticker-bullet" />
            <span className="ticker-text">{phrase}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
