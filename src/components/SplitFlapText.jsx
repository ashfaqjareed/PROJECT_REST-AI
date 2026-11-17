import React, { useState, useEffect } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function SplitFlapText({ text = "", className = "", tag: Tag = "span", delay = 0 }) {
  const [displayedChars, setDisplayedChars] = useState(text.split(""));

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setDisplayedChars(text.split(""));
      return;
    }

    const chars = text.split("");
    const timeouts = [];

    chars.forEach((targetChar, index) => {
      if (targetChar === " " || targetChar === "\n") {
        return;
      }

      const charDelay = delay + index * 35;
      const duration = 300 + (index % 5) * 60;
      const startTime = Date.now() + charDelay;

      const interval = setInterval(() => {
        const now = Date.now();
        if (now < startTime) return;

        if (now >= startTime + duration) {
          setDisplayedChars(prev => {
            const next = [...prev];
            next[index] = targetChar;
            return next;
          });
          clearInterval(interval);
        } else {
          const randGlyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          setDisplayedChars(prev => {
            const next = [...prev];
            next[index] = randGlyph;
            return next;
          });
        }
      }, 50);

      timeouts.push(interval);
    });

    return () => {
      timeouts.forEach(t => clearInterval(t));
    };
  }, [text, delay]);

  return (
    <Tag className={`split-flap-line ${className}`}>
      {displayedChars.map((ch, idx) => (
        <span key={idx} className="split-flap-cell">
          {ch}
        </span>
      ))}
    </Tag>
  );
}
