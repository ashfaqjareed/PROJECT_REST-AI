import React, { useEffect, useRef } from "react";

export function OpposingTextRails({ title = "ORDERA", className = "" }) {
  const railLeftRef = useRef(null);
  const railRightRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const offset = scrollY * 0.25;
      if (railLeftRef.current) {
        railLeftRef.current.style.transform = `translate3d(-${offset % 400}px, 0, 0)`;
      }
      if (railRightRef.current) {
        railRightRef.current.style.transform = `translate3d(${offset % 400}px, 0, 0)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const repeated = `${title} • ${title} • ${title} • ${title} • ${title} • ${title}`;

  return (
    <div className={`opposing-rails-container ${className}`} aria-hidden="true">
      <div ref={railLeftRef} className="opposing-rail rail-solid font-display">
        {repeated}
      </div>
      <div ref={railRightRef} className="opposing-rail rail-outline font-display">
        {repeated}
      </div>
    </div>
  );
}
