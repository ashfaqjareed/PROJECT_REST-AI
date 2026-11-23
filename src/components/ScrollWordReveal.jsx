import React, { useRef, useEffect, useState } from "react";

export function ScrollWordReveal({ text, subhead, className = "" }) {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredWordIndex, setHoveredWordIndex] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Progress from 0 when entering viewport bottom to 1 when reaching top
      const start = windowHeight * 0.85;
      const end = windowHeight * 0.15;

      const progress = Math.max(0, Math.min(1, (start - rect.top) / (start - end + rect.height * 0.5)));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const words = text.split(" ");
  const totalWords = words.length;

  return (
    <section ref={containerRef} className={`scroll-word-reveal-section ${className}`}>
      <div className="container">
        {subhead && (
          <div className="scroll-reveal-eyebrow font-mono text-center">
            <span className="eyebrow-accent-bracket">[</span>
            <span>{subhead}</span>
            <span className="eyebrow-accent-bracket">]</span>
          </div>
        )}

        <div className="scroll-reveal-text font-display text-center">
          {words.map((word, idx) => {
            // Calculate active threshold for this word
            const wordThreshold = idx / totalWords;
            const isLit = scrollProgress >= wordThreshold;
            const isHovered = hoveredWordIndex === idx;
            const opacity = isHovered
              ? 1
              : isLit
              ? 1
              : Math.max(0.2, scrollProgress > wordThreshold - 0.1 ? 0.55 : 0.2);

            return (
              <span
                key={idx}
                onMouseEnter={() => setHoveredWordIndex(idx)}
                onMouseLeave={() => setHoveredWordIndex(null)}
                className={`scroll-word ${isLit ? "lit" : ""} ${isHovered ? "hovered" : ""}`}
                style={{
                  opacity,
                  transition: "opacity 0.2s ease, color 0.2s ease, transform 0.2s ease, text-shadow 0.2s ease",
                  transform: isHovered
                    ? "translateY(-3px) scale(1.04)"
                    : isLit
                    ? "translateY(0)"
                    : "translateY(2px)"
                }}
              >
                {word}{" "}
              </span>
            );
          })}
        </div>

        <div className="scroll-reveal-footer font-mono text-center">
          <div className="scroll-readout-row">
            <span className="scroll-hint-label">SCROLL TO REVEAL MANIFESTO</span>
            <span className="scroll-pct-badge">{Math.round(scrollProgress * 100)}% READ</span>
          </div>
          <div className="scroll-progress-line">
            <div className="scroll-progress-bar" style={{ width: `${scrollProgress * 100}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
}
