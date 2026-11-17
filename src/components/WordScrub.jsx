import React, { useEffect, useRef, useState } from "react";

export function WordScrub({ text = "", className = "" }) {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      // Start scrub when top enters viewport, finish when middle is reached
      const start = windowH * 0.9;
      const end = windowH * 0.2;
      const current = rect.top;

      if (current > start) {
        setProgress(0);
      } else if (current < end) {
        setProgress(1);
      } else {
        setProgress((start - current) / (start - end));
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const words = text.split(" ");
  const activeCount = Math.floor(progress * words.length);

  return (
    <p ref={containerRef} className={`word-scrub-paragraph ${className}`}>
      {words.map((word, i) => {
        const isLit = i <= activeCount;
        return (
          <span
            key={i}
            className={`scrub-word ${isLit ? "word-active" : "word-dim"}`}
          >
            {word}{" "}
          </span>
        );
      })}
    </p>
  );
}
