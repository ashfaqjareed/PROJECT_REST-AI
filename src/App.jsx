import React, { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { PageTransition } from "./components/PageTransition";
import { OrderaAssistant } from "./components/OrderaAssistant";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { useTheme } from "./hooks/useTheme";
import { siteConfig } from "./data/site";
import { WhatsAppIcon } from "./components/Icons";

const Home = lazy(() => import("./pages/Home"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Onboard = lazy(() => import("./pages/Onboard"));
const SectorPage = lazy(() => import("./pages/SectorPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

function FloatingWAButton() {
  const location = useLocation();
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
  useTheme(); // Initializes theme attribute on <html>

  return (
    <div className="app-root">
      <ScrollToTop />
      <a href="#main-content" className="skip-link font-mono">
        SKIP TO CONTENT
      </a>
      <PageTransition />
      <Navigation />

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
