import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { sectors } from "../data/sectors";
import { siteConfig } from "../data/site";
import { pricingPlans } from "../data/pricing";
import { useHead } from "../hooks/useHead";
import { SavingsEstimator } from "../components/SavingsEstimator";
import {
  RestaurantSectorScene,
  CafeSectorScene,
  CanteenSectorScene,
  BakerySectorScene,
  FlowerSectorScene,
  BoutiqueSectorScene
} from "../components/SvgScenes";
import { ChevronDownIcon, PhoneIcon, WhatsAppIcon } from "../components/Icons";

const SECTOR_SCENES = {
  restaurants: RestaurantSectorScene,
  cafes: CafeSectorScene,
  canteens: CanteenSectorScene,
  bakeries: BakerySectorScene,
  "flower-boutiques": FlowerSectorScene,
  boutiques: BoutiqueSectorScene
};

export default function SectorPage() {
  const { slug } = useParams();
  const sector = sectors.find((s) => s.slug === slug) || sectors[0];
  const SceneComponent = SECTOR_SCENES[sector.slug] || RestaurantSectorScene;

  useHead({
    title: `${sector.name} Ordering Desk | Ordera`,
    description: sector.headline,
    path: `/for/${sector.slug}`
  });

  const [openFaq, setOpenFaq] = useState(null);
  const [sliderMinutes, setSliderMinutes] = useState(14);

  const isComingNext = sector.status === "Coming Next";
  const planMatch = pricingPlans.find((p) => p.name === sector.planFit) || pricingPlans[0];

  return (
    <div className="sector-brex-page">
      {/* 1. Sector Hero */}
      <section className="brex-hero-section">
        <div className="container">
          <div className="brex-hero-center text-center">
            <div className="brex-eyebrow-pill font-mono">
              <span className={`eyebrow-dot ${isComingNext ? "ember" : ""}`} />
              <span>{sector.status} • {sector.name.toUpperCase()} SOLUTION</span>
            </div>

            <h1 className="brex-hero-h1 font-display">
              {sector.headline}
            </h1>

            <p className="brex-hero-p font-body">
              Ordera gives your staff their counter hours back. No phone interruptions, no incorrect orders, and clean pickup verification with a 4-digit PIN.
            </p>

            <div className="brex-hero-actions">
              <Link
                to={`/onboard?type=${encodeURIComponent(sector.name)}`}
                className="brex-btn-primary font-body"
              >
                {isComingNext ? "Join The Early List" : "Get Started"}
              </Link>
              <a
                href={siteConfig.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="brex-btn-secondary font-body"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Problems & Where Service Stalls */}
      <section className="brex-section border-top border-bottom">
        <div className="container">
          <div className="section-label-pill font-mono text-center">THE CHALLENGE</div>
          <h2 className="brex-section-h2 font-display text-center">
            WHERE SERVICE STALLS TODAY
          </h2>

          <div className="how-dual-showcase">
            <div className="showcase-card-tile" style={{ justifyContent: "center", alignItems: "center" }}>
              <div className="tile-scene" style={{ maxWidth: "340px", width: "100%" }}>
                <SceneComponent />
              </div>
            </div>

            <div className="showcase-info-col">
              <div className="sector-problem-list">
                {sector.problems.map((prob, i) => (
                  <div key={i} className="sector-prob-item">
                    <span className="prob-idx font-mono highlight-lime-text">{String(i + 1).padStart(2, "0")}</span>
                    <p className="prob-text font-body">{prob}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Six Moves for this Sector */}
      <section className="brex-section border-bottom">
        <div className="container">
          <div className="section-label-pill font-mono text-center">WORKFLOW</div>
          <h2 className="brex-section-h2 font-display text-center">
            HOW ORDERS MOVE IN YOUR VENUE
          </h2>

          <div className="how-timeline-cards-grid">
            {sector.sixMoves.map((m) => (
              <div key={m.step} className="timeline-card">
                <span className="t-node-num highlight-lime-text font-mono">{m.step}</span>
                <div className="t-node-title font-display">{m.title}</div>
                <p className="t-node-desc font-body">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Time Gained Slider */}
      <section className="brex-section border-bottom">
        <div className="container">
          <div className="section-label-pill font-mono text-center">TIME SAVED</div>
          <h2 className="brex-section-h2 font-display text-center">
            MINUTES RECLAIMED PER ORDER
          </h2>

          <div className="brex-wait-card">
            <div className="wait-compare-row">
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }} className="font-mono">
                <span>ESTIMATED COUNTER WAIT TODAY: <strong>{sliderMinutes} MINUTES</strong></span>
                <span style={{ color: "var(--text-muted)" }}>Drag slider to estimate</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                value={sliderMinutes}
                onChange={(e) => setSliderMinutes(Number(e.target.value))}
                className="calc-range-slider"
                aria-label="Average counter wait"
              />
            </div>

            <div className="wait-compare-row">
              <span className="wait-row-label font-mono">STANDING IN LINE TODAY</span>
              <div className="wait-track-bar">
                <div className="wait-bar-fill today" style={{ width: `${Math.min(100, sliderMinutes * 3.3)}%` }}>
                  <span>{sliderMinutes} minutes in line</span>
                </div>
              </div>
            </div>

            <div className="wait-compare-row">
              <span className="wait-row-label font-mono highlight-lime-text">WITH ORDERA</span>
              <div className="wait-track-bar">
                <div className="wait-bar-fill ordera" style={{ width: "12%" }}>
                  <span>1 to 2m PIN Handover</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Revenue Gain Calculator */}
      <section className="brex-section border-bottom">
        <div className="container">
          <div className="section-label-pill font-mono text-center">ROI CALCULATOR</div>
          <h2 className="brex-section-h2 font-display text-center">
            CALCULATE YOUR REVENUE GAIN
          </h2>
          <SavingsEstimator initialPreset={sector.estimatorPreset} />
        </div>
      </section>

      {/* 6. Recommended Plan */}
      <section className="brex-section border-bottom">
        <div className="container">
          <div className="section-label-pill font-mono text-center">PLAN FIT</div>
          <h2 className="brex-section-h2 font-display text-center">
            RECOMMENDED PLAN FOR {sector.name.toUpperCase()}
          </h2>

          <div className="brex-pricing-card highlighted" style={{ maxWidth: "600px", margin: "0 auto" }}>
            <div className="pricing-badge font-mono">BEST FIT</div>
            <h3 className="pricing-name font-display">{planMatch.name} PLAN</h3>
            <p className="pricing-sub font-body">{planMatch.target}</p>

            <div className="pricing-number font-display">
              {planMatch.monthlyFee}
              <span className="pricing-freq font-mono"> / month</span>
            </div>
            <div className="pricing-setup font-mono">Setup fee: {planMatch.setupFee} once (Ready in 2 days)</div>

            <ul className="pricing-limits-list font-mono">
              {planMatch.serviceBenefits.map((b, i) => (
                <li key={i}>✓ {b}</li>
              ))}
            </ul>

            <Link
              to={`/onboard?plan=${planMatch.id}&type=${encodeURIComponent(sector.name)}`}
              className="pricing-action-btn btn-solid font-body"
            >
              Choose {planMatch.name} For {sector.name}
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Sector FAQ */}
      <section className="brex-section border-bottom">
        <div className="container">
          <div className="section-label-pill font-mono text-center">QUESTIONS</div>
          <h2 className="brex-section-h2 font-display text-center">
            QUESTIONS FOR {sector.name.toUpperCase()}
          </h2>

          <div className="brex-faq-accordion">
            {sector.faq.map((item, idx) => (
              <div key={idx} className="faq-item-row">
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  aria-expanded={openFaq === idx}
                >
                  <span className="faq-q-title">{item.question}</span>
                  <ChevronDownIcon size={18} className={`faq-arrow ${openFaq === idx ? "open" : ""}`} />
                </button>
                {openFaq === idx && (
                  <div className="faq-answer-content font-body">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA */}
      <section className="brex-section brex-contact-cta text-center">
        <div className="container">
          <h2 className="brex-cta-title font-display">
            READY TO STREAMLINE {sector.name.toUpperCase()} ORDERS?
          </h2>
          <div className="brex-hero-actions">
            <Link to={`/onboard?type=${encodeURIComponent(sector.name)}`} className="brex-btn-primary font-body">
              Start Onboarding
            </Link>
            <a href={siteConfig.whatsappLink} target="_blank" rel="noopener noreferrer" className="brex-btn-secondary font-body">
              WhatsApp Our Desk
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
