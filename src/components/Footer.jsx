import React, { useState } from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "../data/site";
import { sectors } from "../data/sectors";
import { ColomboSkylineStrip } from "./SvgScenes";
import { OrderBoard } from "./OrderBoard";
import { PhoneIcon, WhatsAppIcon } from "./Icons";
import { VelocityTicker } from "./VelocityTicker";
import { ThemeToggle } from "./ThemeToggle";

export function Footer({ tickerPhrases }) {
  const [revealed, setRevealed] = useState(false);
  const phrases = tickerPhrases || siteConfig.tickerPhrases.home;

  return (
    <footer className="full-page-footer" role="contentinfo">
      {/* 1. Velocity Ticker at top of footer */}
      <VelocityTicker phrases={phrases} />

      {/* 2. Giant Wordmark Header Section */}
      <div className="footer-hero-wordmark-wrap" aria-hidden="true">
        <div className="footer-display-brand font-display">
          ORDERA
        </div>
      </div>

      <div className="footer-grid-container container">
        {/* Column 1: Brand Info */}
        <div className="footer-col-brand">
          <div className="footer-brand-title font-display">ORDERA</div>
          <p className="footer-brand-mission font-body">
            Turning WhatsApp into Sri Lanka's restaurant order desk. Customers tap their order from their seat, kitchens prepare with zero paper slips, and food is collected with a 4-digit PIN.
          </p>
          <div className="footer-col-theme">
            <ThemeToggle />
          </div>
        </div>

        {/* Column 2: Platform Links */}
        <div className="footer-col">
          <div className="footer-col-heading font-mono">PLATFORM</div>
          <ul className="footer-links">
            <li><Link to="/" className="f-link">Home</Link></li>
            <li><Link to="/how-it-works" className="f-link">How It Works</Link></li>
            <li><Link to="/pricing" className="f-link">Pricing & Plans</Link></li>
            <li><Link to="/onboard" className="f-link highlight">Start Onboarding</Link></li>
          </ul>
        </div>

        {/* Column 3: Sectors */}
        <div className="footer-col">
          <div className="footer-col-heading font-mono">SECTORS</div>
          <ul className="footer-links">
            {sectors.map((s) => (
              <li key={s.slug}>
                <Link to={`/for/${s.slug}`} className="f-link">
                  <span>{s.name}</span>
                  {s.status === "Coming Next" && (
                    <span className="footer-tag font-mono">Planned</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact & Hotline */}
        <div className="footer-col footer-col-contact">
          <div className="footer-col-heading font-mono">COLOMBO DESK</div>
          <div className="footer-contact-card">
            {!revealed ? (
              <button
                type="button"
                className="footer-reveal-btn font-mono"
                onClick={() => setRevealed(true)}
              >
                Tap to Reveal Hotline
              </button>
            ) : (
              <div className="footer-phone-number font-display">{siteConfig.phoneDisplay}</div>
            )}

            <div className="footer-action-buttons">
              <a
                href={siteConfig.telLink}
                className="f-btn call font-mono"
                aria-label={`Call hotline ${siteConfig.phoneDisplay}`}
              >
                <PhoneIcon size={14} /> CALL
              </a>
              <a
                href={siteConfig.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="f-btn wa font-mono"
                aria-label="Message on WhatsApp"
              >
                <WhatsAppIcon size={14} /> WHATSAPP
              </a>
            </div>

            <div className="footer-guarantee font-mono">
              Inquiries answered in person within 24 hours.
            </div>
          </div>
        </div>
      </div>

      {/* 3. Live Order Board Strip */}
      <div className="footer-order-board-holder">
        <OrderBoard compact={true} />
      </div>

      {/* 4. Elegant Colombo Skyline Strip */}
      <ColomboSkylineStrip />

      {/* 5. Bottom Copyright Bar */}
      <div className="footer-sub-strip">
        <div className="container sub-strip-inner font-mono">
          <p className="copyright-text">
            A Product Of Sri Lanka. Made By{" "}
            <a
              href={siteConfig.parentStudioLink}
              target="_blank"
              rel="noopener noreferrer"
              className="studio-credit-link"
            >
              {siteConfig.parentStudioName}
            </a>.
          </p>
          <div className="copyright-year">2026 ORDERA • ZERO ORDER COMMISSION</div>
        </div>
      </div>
    </footer>
  );
}
