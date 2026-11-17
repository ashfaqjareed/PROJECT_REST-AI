import React, { useEffect, useState } from "react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -20, y: -20 });
  const [visible, setVisible] = useState(false);
  const [overInput, setOverInput] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const hoverCapable = window.matchMedia("(hover: hover)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hasFinePointer || !hoverCapable || prefersReducedMotion) {
      return;
    }

    setIsDesktop(true);

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);

      const target = e.target;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable ||
          target.closest("input") ||
          target.closest("textarea"))
      ) {
        setOverInput(true);
      } else {
        setOverInput(false);
      }
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [visible]);

  if (!isDesktop || !visible || overInput) return null;

  return (
    <div
      className="night-cursor-dot"
      style={{
        transform: `translate3d(${pos.x - 5}px, ${pos.y - 5}px, 0)`
      }}
      aria-hidden="true"
    />
  );
}
