import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { siteConfig } from "../data/site";
import { HomeIcon, FlowIcon, TagIcon, TerminalIcon } from "./Icons";
import { ThemeToggle } from "./ThemeToggle";

export function Navigation() {
  const location = useLocation();
  const [colomboTime, setColomboTime] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

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

  // Header background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/how-it-works", label: "How It Works" },
    { to: "/pricing", label: "Pricing" },
    { to: "/onboard", label: "Onboard" }
  ];

  const sectorLinks = [
    { to: "/for/restaurants", label: "Restaurants" },
    { to: "/for/cafes", label: "Cafes" },
    { to: "/for/canteens", label: "University Canteens" },
    { to: "/for/bakeries", label: "Bakeries" },
    { to: "/for/flower-boutiques", label: "Flower Boutiques" },
    { to: "/for/boutiques", label: "Boutiques" }
  ];

  return (
    <>
      {/* Full-Page Modern Header */}
      <header className={`full-page-navbar ${isScrolled ? "scrolled" : ""}`} role="banner">
        <div className="nav-inner-container">
          {/* Brand Logo as Wordmark in Display Font */}
          <Link to="/" className="nav-brand-group" aria-label="Ordera Home">
            <span className="brand-wordmark font-display">ORDERA</span>
            <span className="brand-accent-dot" aria-hidden="true" />
          </Link>

          {/* Navigation Links */}
          <nav className="nav-desktop-links" role="navigation">
            {navLinks.map((item) => {
              const isActive =
                item.to === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`nav-link-item ${isActive ? "active" : ""}`}
                >
                  {item.label}
                  {isActive && <span className="nav-active-pill" aria-hidden="true" />}
                </Link>
              );
            })}

            {/* Sectors Dropdown */}
            <div className="nav-dropdown-wrapper">
              <span className="nav-dropdown-trigger">
                Sectors <span className="dropdown-caret">▾</span>
              </span>
              <div className="nav-dropdown-flyout">
                {sectorLinks.map((sec) => (
                  <Link key={sec.to} to={sec.to} className="flyout-item font-body">
                    {sec.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Right Actions: Clock + Theme Switcher + CTA */}
          <div className="nav-right-actions">
            <div className="nav-clock-tag font-mono" aria-label={`Current Colombo time ${colomboTime}`}>
              <span className="clock-pulse-dot" />
              <span>COLOMBO {colomboTime || "12:00"}</span>
            </div>

            <ThemeToggle />

            <Link to="/onboard" className="nav-cta-button font-body">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Dock */}
      <nav className="mobile-bottom-dock" role="navigation" aria-label="Mobile Navigation">
        <div className="bottom-dock-inner">
          <Link
            to="/"
            className={`dock-tab ${location.pathname === "/" ? "active" : ""}`}
          >
            <HomeIcon size={18} />
            <span className="dock-label font-mono">Home</span>
          </Link>
          <Link
            to="/how-it-works"
            className={`dock-tab ${location.pathname.startsWith("/how-it-works") ? "active" : ""}`}
          >
            <FlowIcon size={18} />
            <span className="dock-label font-mono">How</span>
          </Link>
          <Link
            to="/pricing"
            className={`dock-tab ${location.pathname.startsWith("/pricing") ? "active" : ""}`}
          >
            <TagIcon size={18} />
            <span className="dock-label font-mono">Pricing</span>
          </Link>
          <Link
            to="/onboard"
            className={`dock-tab ${location.pathname.startsWith("/onboard") ? "active" : ""}`}
          >
            <TerminalIcon size={18} />
            <span className="dock-label font-mono">Onboard</span>
          </Link>
          <div className="dock-theme-holder">
            <ThemeToggle className="dock-theme-toggle" />
          </div>
        </div>
      </nav>
    </>
  );
}
