import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { siteConfig } from "../data/site";
import { features } from "../data/features";
import { pricingPlans, enterprisePlan } from "../data/pricing";
import { sectors } from "../data/sectors";
import { generalFaq } from "../data/faq";
import { useHead } from "../hooks/useHead";
import { BrexFeatureDeck } from "../components/BrexFeatureDeck";
import { ScrollWordReveal } from "../components/ScrollWordReveal";
import { OrderBoard } from "../components/OrderBoard";
import { VelocityTicker } from "../components/VelocityTicker";
import { OrderSimulator } from "../components/OrderSimulator";
import { SavingsEstimator } from "../components/SavingsEstimator";
import {
  QueueCounterScene,
  PersonPhoneScene,
  KitchenBellScene,
  PinKeypadScene,
  RestaurantSectorScene,
  CafeSectorScene,
  CanteenSectorScene,
  BakerySectorScene,
  FlowerSectorScene,
  BoutiqueSectorScene
} from "../components/SvgScenes";
import { ChevronDownIcon, PhoneIcon, WhatsAppIcon } from "../components/Icons";

const SECTOR_ICONS = {
  restaurants: RestaurantSectorScene,
  cafes: CafeSectorScene,
  canteens: CanteenSectorScene,
  bakeries: BakerySectorScene,
  "flower-boutiques": FlowerSectorScene,
  boutiques: BoutiqueSectorScene
};

export default function Home() {
  useHead({
    title: "Ordera | WhatsApp Ordering for Sri Lankan Restaurants",
    description: siteConfig.description,
    path: "/"
  });

  const navigate = useNavigate();
  const [demoTab, setDemoTab] = useState("watch");
  const [openFaq, setOpenFaq] = useState(null);
  const [revealedPhone, setRevealedPhone] = useState(false);

  const liveFeatures = features.filter((f) => f.status === "live").slice(0, 6);

  // Mouse spotlight tracker for proximity glow on cards
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div className="home-brex-wrap">
      {/* 1. HERO SECTION: Refero / Brex SaaS Hero */}
      <section className="brex-hero-section">
        <div className="container">
          <div className="brex-hero-center text-center">
            {/* Announcement Pill */}
            <div className="brex-eyebrow-pill font-mono">
              <span className="eyebrow-dot" aria-hidden="true" />
              <span>COLOMBO RESTAURANT TECH • ZERO ORDER COMMISSION</span>
            </div>

            {/* Main Punchy Headline */}
            <h1 className="brex-hero-h1 font-display">
              <span className="block-line">The order desk</span>
              <span className="block-line">is just the start.</span>
            </h1>

            {/* Subtext */}
            <p className="brex-hero-p font-body">
              Ordera turns WhatsApp into your restaurant's order desk. Customers tap their food order from their seat, your kitchen sees tickets instantly, and meals are handed over with a 4-digit PIN.
            </p>

            {/* Call to Actions */}
            <div className="brex-hero-actions">
              <Link to="/onboard" className="brex-btn-primary font-body">
                Get Started
              </Link>
              <Link to="/pricing" className="brex-btn-secondary font-body">
                View Pricing
              </Link>
            </div>

            {/* Micro proof badges */}
            <div className="brex-hero-meta font-mono">
              <span>No App Download</span>
              <span>•</span>
              <span>Keep 100% Revenue</span>
              <span>•</span>
              <span>Ready in 2 Days</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. REFERO / BREX 5-CARD FEATURE SHOWCASE */}
      <section className="brex-deck-section">
        <div className="container">
          <BrexFeatureDeck />
        </div>
      </section>

      {/* 3. SCROLL EFFECT: Scroll-driven Word Reveal */}
      <ScrollWordReveal
        subhead="THE MANIFESTO"
        text="Your customers already live on WhatsApp. So the order desk should too. No app to download. No account to make. Every step is a tap, so orders arrive clean. While the city waits in line, your kitchen is already cooking."
      />

      {/* 4. INTERACTIVE LIVE SIMULATOR */}
      <section className="brex-section border-top border-bottom">
        <div className="container">
          <div className="section-label-pill font-mono text-center">
            INTERACTIVE EXPERIENCE
          </div>
          <h2 className="brex-section-h2 font-display text-center">
            SEE HOW ONE TAP FLOWS THROUGH YOUR VENUE
          </h2>
          <p className="brex-section-desc font-body text-center">
            Watch the complete customer-to-kitchen order cycle in action, or test ordering directly.
          </p>

          <div className="brex-simulator-wrapper">
            <div className="simulator-tab-bar font-mono">
              <button
                type="button"
                className={`sim-tab-item ${demoTab === "watch" ? "active" : ""}`}
                onClick={() => setDemoTab("watch")}
              >
                WATCH ORDER CYCLE
              </button>
              <button
                type="button"
                className={`sim-tab-item ${demoTab === "try" ? "active" : ""}`}
                onClick={() => setDemoTab("try")}
              >
                TRY IT YOURSELF
              </button>
            </div>

            <div className="simulator-canvas">
              <OrderSimulator defaultMode={demoTab === "watch" ? "watch" : "manual"} />
            </div>

            <div className="simulator-board-footer">
              <OrderBoard compact={true} />
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE WAIT: Observed Canteen Comparison */}
      <section className="brex-section border-bottom">
        <div className="container">
          <div className="section-label-pill font-mono text-center">THE WAIT</div>
          <h2 className="brex-section-h2 font-display text-center">
            ONE CANTEEN BREAK, OBSERVED
          </h2>

          <div className="brex-wait-card spotlight-card" onMouseMove={handleMouseMove}>
            <div className="wait-compare-row">
              <span className="wait-row-label font-mono">TODAY WITHOUT ORDERA</span>
              <div className="wait-track-bar">
                <div className="wait-bar-fill today" style={{ width: "100%" }}>
                  <span className="font-mono">8m Order Line + 5m Bill Queue + 10m Counter Wait = 23m</span>
                </div>
              </div>
            </div>

            <div className="wait-compare-row">
              <span className="wait-row-label font-mono highlight-lime-text">WITH ORDERA</span>
              <div className="wait-track-bar">
                <div className="wait-bar-fill ordera" style={{ width: "12%" }}>
                  <span className="font-mono">2m PIN Handover</span>
                </div>
              </div>
            </div>

            <div className="wait-meta-row font-mono">
              <span>{siteConfig.queueComparison.context}</span>
              <span className="student-quote font-body">{siteConfig.queueComparison.studentNote}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHO IT FITS: Sector Cards */}
      <section className="brex-section border-bottom">
        <div className="container">
          <div className="section-label-pill font-mono text-center">SOLUTIONS</div>
          <h2 className="brex-section-h2 font-display text-center">
            BUILT FOR BUSY SRI LANKAN VENUES
          </h2>
          <p className="brex-section-desc font-body text-center">
            Tailored order flows for restaurants, cafes, university canteens, and bakeries.
          </p>

          <div className="brex-sectors-grid">
            {sectors.map((sec) => {
              const Scene = SECTOR_ICONS[sec.slug] || RestaurantSectorScene;
              return (
                <div
                  key={sec.slug}
                  className="brex-sector-card spotlight-card"
                  onClick={() => navigate(`/for/${sec.slug}`)}
                  onMouseMove={handleMouseMove}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") navigate(`/for/${sec.slug}`);
                  }}
                  aria-label={`Explore Ordera for ${sec.name}`}
                >
                  <div className="sector-card-header">
                    <span className="sector-status-tag font-mono">{sec.status}</span>
                    <h3 className="sector-title font-display">{sec.name}</h3>
                  </div>
                  <p className="sector-problem font-body">{sec.problems[0]}</p>
                  <div className="sector-scene-slot">
                    <Scene />
                  </div>
                  <div className="sector-card-foot font-mono">
                    <span>EXPLORE SECTOR →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. VERIFIED FEATURES BENTO GRID */}
      <section className="brex-section border-bottom">
        <div className="container">
          <div className="section-label-pill font-mono text-center">PROVEN CAPABILITIES</div>
          <h2 className="brex-section-h2 font-display text-center">
            WHY KITCHENS RELY ON ORDERA
          </h2>

          <div className="brex-bento-grid">
            {liveFeatures.map((feat, i) => (
              <div
                key={feat.id}
                className={`brex-bento-tile tile-${i} spotlight-card`}
                onMouseMove={handleMouseMove}
              >
                <div className="bento-badge-live font-mono">LIVE IN PRODUCTION</div>
                <h3 className="bento-heading font-display">{feat.title}</h3>
                <p className="bento-text font-body">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PLANS AT A GLANCE (Starter Rs. 3,500/mo & Growth Rs. 8,000/mo) */}
      <section className="brex-section border-bottom">
        <div className="container">
          <div className="section-label-pill font-mono text-center">PRICING</div>
          <h2 className="brex-section-h2 font-display text-center">
            TRANSPARENT, FLAT SUBSCRIPTION PLANS
          </h2>
          <p className="brex-section-desc font-body text-center">
            Zero percent food order commissions. Setup once, pay month-to-month.
          </p>

          <div className="brex-pricing-deck">
            {pricingPlans.map((plan) => {
              const isGrowth = plan.id === "growth";
              return (
                <div
                  key={plan.id}
                  className={`brex-pricing-card spotlight-card ${isGrowth ? "highlighted" : ""}`}
                  onMouseMove={handleMouseMove}
                >
                  {isGrowth && (
                    <div className="pricing-badge font-mono">MOST POPULAR</div>
                  )}
                  <h3 className="pricing-name font-display">{plan.name}</h3>
                  <p className="pricing-sub font-body">{plan.target}</p>

                  <div className="pricing-number font-display">
                    {plan.monthlyFee}
                    <span className="pricing-freq font-mono"> / month</span>
                  </div>
                  <div className="pricing-setup font-mono">Setup fee: {plan.setupFee} once</div>

                  <ul className="pricing-limits-list font-mono">
                    <li>• {plan.limits.branches}</li>
                    <li>• {plan.limits.menuItems}</li>
                    <li>• {plan.limits.staffLogins}</li>
                  </ul>

                  <Link
                    to={`/onboard?plan=${plan.id}`}
                    className={`pricing-action-btn font-body ${isGrowth ? "btn-solid" : "btn-outline"}`}
                  >
                    {plan.ctaText}
                  </Link>
                </div>
              );
            })}

            {/* Enterprise Card */}
            <div
              className="brex-pricing-card enterprise spotlight-card"
              onMouseMove={handleMouseMove}
            >
              <div className="pricing-badge font-mono" style={{ background: "var(--ember)", color: "#fff" }}>
                {enterprisePlan.statusTag}
              </div>
              <h3 className="pricing-name font-display">{enterprisePlan.name}</h3>
              <p className="pricing-sub font-body">{enterprisePlan.target}</p>

              <div className="pricing-number font-display" style={{ fontSize: "28px" }}>
                Custom Quote
              </div>
              <div className="pricing-setup font-mono">Multi-outlet franchises</div>

              <ul className="pricing-limits-list font-mono">
                {enterprisePlan.plannedFeatures.map((f, idx) => (
                  <li key={idx}>• {f.title}</li>
                ))}
              </ul>

              <a
                href={`https://wa.me/94768325949?text=${encodeURIComponent(enterprisePlan.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="pricing-action-btn btn-outline font-body"
              >
                Inquire For Chains
              </a>
            </div>
          </div>

          <div style={{ marginTop: "40px" }}>
            <SavingsEstimator />
          </div>
        </div>
      </section>

      {/* 9. QUESTIONS & HOTLINE */}
      <section className="brex-section border-bottom">
        <div className="container">
          <div className="section-label-pill font-mono text-center">QUESTIONS</div>
          <h2 className="brex-section-h2 font-display text-center">
            FREQUENTLY ASKED QUESTIONS
          </h2>

          <div className="brex-faq-accordion">
            {generalFaq.slice(0, 5).map((item, idx) => (
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

      {/* 10. DIRECT DESK CONTACT */}
      <section className="brex-section brex-contact-cta">
        <div className="container text-center">
          <h2 className="brex-cta-title font-display">
            TALK DIRECTLY WITH OUR COLOMBO TEAM
          </h2>
          <p className="brex-cta-sub font-body">
            Have questions about your kitchen setup or menu size? We answer directly without automated bots.
          </p>

          <div className="brex-cta-reveal-box">
            {!revealedPhone ? (
              <button
                type="button"
                className="brex-reveal-btn font-mono"
                onClick={() => setRevealedPhone(true)}
              >
                Tap to Reveal Direct Hotline
              </button>
            ) : (
              <div className="brex-revealed-row">
                <span className="revealed-phone-number font-display">{siteConfig.phoneDisplay}</span>
                <div className="revealed-actions">
                  <a href={siteConfig.telLink} className="revealed-btn font-mono">
                    <PhoneIcon size={14} /> Call Hotline
                  </a>
                  <a href={siteConfig.whatsappLink} target="_blank" rel="noopener noreferrer" className="revealed-btn wa font-mono">
                    <WhatsAppIcon size={14} /> WhatsApp
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
