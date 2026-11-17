import React, { useState } from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "../data/site";
import { sectors } from "../data/sectors";
import { ColomboSkylineStrip } from "./SvgScenes";
import { OrderBoard } from "./OrderBoard";
import { PhoneIcon, WhatsAppIcon } from "./Icons";
import { VelocityTicker } from "./VelocityTicker";

export function Footer({ tickerPhrases }) {
  const [revealed, setRevealed] = useState(false);
  const phrases = tickerPhrases || siteConfig.tickerPhrases.home;

  return (
    <footer className="night-footer" role="contentinfo">
      {/* 1. Velocity Ticker at top of footer */}
      <VelocityTicker phrases={phrases} />

      {/* 2. Giant outline ORDERA wordmark with letters wave */}
      <div className="footer-giant-wordmark-wrap" aria-hidden="true">
        <div className="footer-outline-wordmark">
          {"ORDERA".split("").map((letter, i) => (
            <span
              key={i}
              className="wordmark-letter"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>

      <div className="footer-content-grid">
        {/* Column 1: Platform */}
        <div className="footer-col">
          <div className="footer-col-header font-mono">PLATFORM</div>
          <ul className="footer-link-list">
            <li><Link to="/" className="footer-link">Home</Link></li>
            <li><Link to="/how-it-works" className="footer-link">How It Works</Link></li>
            <li><Link to="/pricing" className="footer-link">Pricing & Plans</Link></li>
            <li><Link to="/onboard" className="footer-link highlight-lime">Start Onboarding</Link></li>
          </ul>
        </div>

        {/* Column 2: Sectors */}
        <div className="footer-col">
          <div className="footer-col-header font-mono">SECTORS</div>
          <ul className="footer-link-list">
            {sectors.map((s) => (
              <li key={s.slug}>
                <Link to={`/for/${s.slug}`} className="footer-link">
                  <span>{s.name}</span>
                  {s.status === "Coming Next" && (
                    <span className="footer-coming-tag font-mono">Coming Next</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div className="footer-col footer-col-contact">
          <div className="footer-col-header font-mono">DIRECT CONTACT</div>
          {!revealed ? (
            <button
              type="button"
              className="tap-reveal-btn font-mono"
              onClick={() => setRevealed(true)}
            >
              Tap to Reveal Hotline
            </button>
          ) : (
            <div className="revealed-phone font-display">{siteConfig.phoneDisplay}</div>
          )}

          <div className="footer-contact-actions">
            <a
              href={siteConfig.telLink}
              className="contact-action-btn font-mono"
              aria-label={`Call hotline ${siteConfig.phoneDisplay}`}
            >
              <PhoneIcon size={14} />
              <span>CALL</span>
            </a>
            <a
              href={siteConfig.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-action-btn wa font-mono"
              aria-label="Message on WhatsApp"
            >
              <WhatsAppIcon size={14} />
              <span>WHATSAPP</span>
            </a>
          </div>

          {/* FOUNDER TO CONFIRM: reply time */}
          <div className="footer-reply-note font-mono">
            WhatsApp messages answered within 24 hours.
          </div>
        </div>
      </div>

      {/* 3. Live Order Board Strip */}
      <div className="footer-order-board-wrap">
        <OrderBoard compact={true} />
      </div>

      {/* 4. Thin lime line-art Colombo skyline */}
      <ColomboSkylineStrip />

      {/* 5. Bottom Bar */}
      <div className="footer-bottom-strip">
        <div className="bottom-strip-inner font-mono">
          <p className="footer-credit-text">
            A Product Of Sri Lanka. Made By{" "}
            <a
              href={siteConfig.parentStudioLink}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-parent-link"
            >
              {siteConfig.parentStudioName}
            </a>.
          </p>
          <div className="footer-year">2026 ORDERA</div>
        </div>
      </div>
    </footer>
  );
}
