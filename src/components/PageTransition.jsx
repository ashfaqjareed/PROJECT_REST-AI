import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function PageTransition() {
  const location = useLocation();
  const [active, setActive] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    setActive(true);
    const timer = setTimeout(() => {
      setActive(false);
    }, 420);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!active) return null;

  return (
    <div className="night-page-transition" aria-hidden="true">
      <div className="transition-wipe-overlay">
        <div className="wipe-bar bar-1" />
        <div className="wipe-bar bar-2" />
        <div className="wipe-bar bar-3" />
        <div className="wipe-bar bar-4" />
      </div>
      <div className="transition-logo-badge">
        <span className="transition-logo-text font-display">ORDERA</span>
      </div>
    </div>
  );
}
