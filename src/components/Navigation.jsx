import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { siteConfig } from "../data/site";
import { HomeIcon, FlowIcon, TagIcon, TerminalIcon } from "./Icons";
import { ChamferButton } from "./ChamferButton";

export function Navigation() {
  const location = useLocation();
  const [colomboTime, setColomboTime] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  // Live Colombo clock
  useEffect(() => {
    const updateTime = () => {
      try {
        const formatter = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Colombo",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false
        });
        setColomboTime(formatter.format(new Date()));
      } catch {
        const d = new Date();
        setColomboTime(`${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  // Scroll progress for desktop left rail line
  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / total) * 100)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "HOME", icon: HomeIcon },
    { to: "/how-it-works", label: "HOW", icon: FlowIcon },
    { to: "/pricing", label: "PRICES", icon: TagIcon },
    { to: "/onboard", label: "ONBOARD", icon: TerminalIcon }
  ];

  return (
    <>
      {/* Slim Top Bar */}
      <header className="night-top-bar" role="banner">
        <div className="top-bar-inner">
          {/* Logo on white chamfered chip to ensure high contrast against black */}
          <Link to="/" className="top-logo-link" aria-label="Ordera Home">
            <div className="logo-chip">
              <img src="/ordera-logo.png" alt="Ordera" className="brand-logo-img" />
            </div>
          </Link>

          {/* Live Colombo Clock */}
          <div className="colombo-clock-box font-mono" aria-label={`Current Colombo time ${colomboTime}`}>
            <span className="clock-led-dot" aria-hidden="true" />
            <span className="clock-city">COLOMBO</span>
            <span className="clock-time">{colomboTime || "12:00"}</span>
          </div>

          {/* Desktop Right CTA */}
          <div className="top-bar-cta">
            <ChamferButton to="/onboard" variant="primary">
              Get Started
            </ChamferButton>
          </div>
        </div>
      </header>

      {/* Desktop Fixed Left Rail (72px wide) */}
      <aside className="night-left-rail" aria-label="Main Navigation">
        {/* Scroll progress trace line down the rail */}
        <div className="rail-scroll-track" aria-hidden="true">
          <div
            className="rail-scroll-progress"
            style={{ height: `${scrollProgress}%` }}
          />
        </div>

        <nav className="rail-nav-list" role="navigation">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.to === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`rail-nav-item ${isActive ? "active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                {isActive && <span className="rail-active-square" aria-hidden="true" />}
                <Icon size={20} className="rail-icon" />
                <span className="rail-label font-mono">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile & Tablet Fixed Bottom Dock */}
      <nav className="mobile-bottom-dock" role="navigation" aria-label="Mobile Navigation">
        <div className="bottom-dock-inner">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.to === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`dock-tab ${isActive ? "active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon size={18} />
                <span className="dock-label font-mono">{item.label}</span>
                {isActive && <span className="dock-active-dot" aria-hidden="true" />}
              </Link>
            );
          })}
          <Link to="/onboard" className="dock-cta-btn font-mono" aria-label="Get Started">
            <span>START</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
