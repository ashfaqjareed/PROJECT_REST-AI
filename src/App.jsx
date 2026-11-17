import React, { lazy, Suspense, useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { PageTransition } from "./components/PageTransition";
import { CustomCursor } from "./components/CustomCursor";
import { OrderaAssistant } from "./components/OrderaAssistant";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { siteConfig } from "./data/site";
import { WhatsAppIcon } from "./components/Icons";

const Home = lazy(() => import("./pages/Home"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Onboard = lazy(() => import("./pages/Onboard"));
const SectorPage = lazy(() => import("./pages/SectorPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

function ScrollTraceLine() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        setProgress(Math.min(100, Math.max(0, (window.scrollY / total) * 100)));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="page-scroll-tracer" aria-hidden="true">
      <div className="tracer-track">
        <div className="tracer-fill" style={{ height: `${progress}%` }}>
          <div className="tracer-head" />
        </div>
      </div>
    </div>
  );
}

function FloatingWAButton() {
  const location = useLocation();
  // Hide on onboard page
  if (location.pathname === "/onboard") return null;
  return (
    <a
      href={siteConfig.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-float-pill font-mono"
      aria-label="Direct WhatsApp hotline 076 832 5949"
    >
      <WhatsAppIcon width={16} height={16} strokeWidth={2} />
      <span>WHATSAPP</span>
    </a>
  );
}

export default function App() {
  useSmoothScroll();

  return (
    <div className="app-root">
      <a href="#main-content" className="skip-link font-mono">
        SKIP TO CONTENT
      </a>
      <CustomCursor />
      <PageTransition />
      <Navigation />
      <ScrollTraceLine />

      <div className="page-shell">
        <main id="main-content" tabIndex={-1}>
          <Suspense fallback={<div className="page-loading-fallback" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/onboard" element={<Onboard />} />
              <Route path="/for/:slug" element={<SectorPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>

      <FloatingWAButton />
      <OrderaAssistant />
    </div>
  );
}
