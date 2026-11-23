import React from "react";
import { Link } from "react-router-dom";
import { useHead } from "../hooks/useHead";
import { ColomboSkylineStrip } from "../components/SvgScenes";

export default function NotFound() {
  useHead({
    title: "404 - Counter Not Found | Ordera",
    description: "The order counter or page you requested is not on the board. Head back to Ordera.",
    path: "/404"
  });

  return (
    <div className="notfound-brex-page">
      <section className="brex-hero-section text-center">
        <div className="container">
          <div className="brex-eyebrow-pill font-mono" style={{ borderColor: "var(--ember)" }}>
            <span className="eyebrow-dot ember" />
            <span style={{ color: "var(--ember)" }}>STATUS: TICKET VOID (404)</span>
          </div>

          <h1 className="brex-hero-h1 font-display">
            COUNTER MISSING
          </h1>

          <p className="brex-hero-p font-body">
            The table QR or counter link you followed does not exist or has moved. Return to the Ordera home board.
          </p>

          <div className="brex-hero-actions">
            <Link to="/" className="brex-btn-primary font-body">
              Back to Order Board
            </Link>
            <Link to="/onboard" className="brex-btn-secondary font-body">
              Set Up Your Desk
            </Link>
          </div>
        </div>
      </section>

      <div style={{ marginTop: "40px" }}>
        <ColomboSkylineStrip />
      </div>
    </div>
  );
}
