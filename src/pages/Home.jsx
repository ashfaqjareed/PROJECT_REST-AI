import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { siteConfig } from "../data/site";
import { features } from "../data/features";
import { pricingPlans, enterprisePlan } from "../data/pricing";
import { sectors } from "../data/sectors";
import { generalFaq } from "../data/faq";
import { useHead } from "../hooks/useHead";
import { ChamferButton } from "../components/ChamferButton";
import { SplitFlapText } from "../components/SplitFlapText";
import { OrderBoard } from "../components/OrderBoard";
import { VelocityTicker } from "../components/VelocityTicker";
import { OrderSimulator } from "../components/OrderSimulator";
import { WordScrub } from "../components/WordScrub";
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
import { ChevronDownIcon, PhoneIcon, WhatsAppIcon, FoodIcon } from "../components/Icons";

const SIX_MOVES = [
  { step: "01", title: "CUSTOMER TAPS", desc: "Customer messages your restaurant WhatsApp number and taps through the visual menu categories.", scene: PersonPhoneScene },
  { step: "02", title: "ORDER LANDS", desc: "Order arrives instantly on the manager dashboard with a double alert pulse and sequential reference.", scene: QueueCounterScene },
  { step: "03", title: "MANAGER ACCEPTS", desc: "Manager reviews the items, taps Accept, and dispatches the ticket directly to the kitchen display.", scene: KitchenBellScene },
  { step: "04", title: "KITCHEN COOKS", desc: "Kitchen staff see live order tickets in clear sequence, prepare the dishes, and tap Mark Ready.", scene: KitchenBellScene },
  { step: "05", title: "READY MESSAGE", desc: "WhatsApp sends customer their pickup PIN, informing them food is packed and ready for collection.", scene: PersonPhoneScene },
  { step: "06", title: "PIN HANDOVER", desc: "Manager enters the 4 digit PIN to verify the customer, take payment, and complete the order.", scene: PinKeypadScene }
];

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
    title: "Order from Your Seat | Ordera",
    description: siteConfig.description,
    path: "/"
  });

  const navigate = useNavigate();
  const [demoTab, setDemoTab] = useState("watch"); // "watch" or "try"
  const [activeMove, setActiveMove] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [hoveredSlab, setHoveredSlab] = useState(null);
  const [revealedPhone, setRevealedPhone] = useState(false);
  const [threeSeatsActive, setThreeSeatsActive] = useState(0);

  const liveFeatures = features.filter(f => f.status === "live").slice(0, 6);

  return (
    <div className="home-page-wrap">
      {/* 1. HERO SECTION */}
      <section className="night-hero-section">
        <div className="container">
          <div className="hero-two-col-layout">
            {/* Left Column: Headlines, Subtext, Buttons, Order Board */}
            <div className="hero-text-col">
              <div className="hero-split-flap-headline font-display">
                <SplitFlapText text="ORDER FROM YOUR SEAT." className="headline-row" delay={0} />
                <div className="headline-row">
                  <SplitFlapText text="WALK IN WHEN IT IS " delay={300} />
                  <span className="solid-lime-chip">READY.</span>
                </div>
              </div>

              <p className="hero-subtext">
                Ordera turns WhatsApp into your restaurant's order desk. Customers tap their order, your kitchen sees it, and the food is handed over with a 4 digit PIN. No app to install. No commission on orders.
              </p>

              <div className="hero-action-buttons">
                <ChamferButton to="/onboard" variant="primary">
                  Get Started
                </ChamferButton>
                <ChamferButton
                  variant="secondary"
                  href="#demo-panel"
                >
                  Watch An Order
                </ChamferButton>
              </div>

              {/* Sample Order Board strip in Hero */}
              <div className="hero-order-board">
                <OrderBoard compact={true} />
              </div>
            </div>

            {/* Right Column: Demo Panel (Watch / Try It) */}
            <div id="demo-panel" className="hero-demo-col">
              <div className="demo-panel-card chamfer-card">
                <div className="demo-tab-switcher font-mono">
                  <button
                    type="button"
                    className={`demo-tab-btn ${demoTab === "watch" ? "active" : ""}`}
                    onClick={() => setDemoTab("watch")}
                  >
                    WATCH IT PLAY
                  </button>
                  <button
                    type="button"
                    className={`demo-tab-btn ${demoTab === "try" ? "active" : ""}`}
                    onClick={() => setDemoTab("try")}
                  >
                    TRY IT YOURSELF
                  </button>
                </div>

                <div className="demo-panel-content">
                  <OrderSimulator defaultMode={demoTab === "watch" ? "watch" : "manual"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VELOCITY TICKER (Home phrase set) */}
      <VelocityTicker phrases={siteConfig.tickerPhrases.home} />

      {/* 3. THE WAIT: Scrubbed queue comparison */}
      <section className="night-section border-bottom">
        <div className="container">
          <div className="section-label-col font-mono">THE WAIT</div>
          <h2 className="section-heading font-display">
            ONE CANTEEN BREAK, OBSERVED
          </h2>

          <div className="the-wait-comparison chamfer-card">
            {/* Today Bar */}
            <div className="wait-bar-row">
              <span className="wait-bar-label font-mono">TODAY</span>
              <div className="wait-track">
                <div className="wait-fill-today" style={{ width: "100%" }}>
                  <span className="font-mono">8m Order Line + 5m Bill Queue + 10m Counter Wait = 23m</span>
                </div>
              </div>
            </div>

            {/* With Ordera Bar */}
            <div className="wait-bar-row">
              <span className="wait-bar-label font-mono highlight-lime-text">WITH ORDERA</span>
              <div className="wait-track">
                <div className="wait-fill-ordera" style={{ width: "9%" }}>
                  <span className="font-mono">2m PIN Handover</span>
                </div>
              </div>
            </div>

            <div className="wait-notes-row">
              <p className="wait-caption font-mono">
                {siteConfig.queueComparison.context}
              </p>
              <p className="wait-student-quote font-body">
                {siteConfig.queueComparison.studentNote}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ONE ORDER, SIX MOVES: Sticky Scroll Spy */}
      <section className="night-section border-bottom">
        <div className="container">
          <div className="section-label-col font-mono">WORKFLOW</div>
          <h2 className="section-heading font-display">
            ONE ORDER, SIX MOVES
          </h2>

          <div className="scroll-spy-layout">
            {/* Left sticky odometer */}
            <div className="spy-sticky-odometer">
              <div className="odometer-num font-display highlight-lime-text">
                {SIX_MOVES[activeMove].step}
              </div>
              <div className="odometer-title font-display">
                {SIX_MOVES[activeMove].title}
              </div>
              <p className="odometer-desc font-body">
                {SIX_MOVES[activeMove].desc}
              </p>
            </div>

            {/* Right mini scenes list */}
            <div className="spy-scenes-stack">
              {SIX_MOVES.map((move, idx) => {
                const Scene = move.scene;
                return (
                  <div
                    key={move.step}
                    className={`spy-move-block chamfer-card ${activeMove === idx ? "current-move" : ""}`}
                    onMouseEnter={() => setActiveMove(idx)}
                  >
                    <div className="move-header font-mono">
                      <span className="move-badge">{move.step}</span>
                      <span className="move-header-title">{move.title}</span>
                    </div>
                    <div className="move-scene-display">
                      <Scene />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. MANIFESTO: Word scrub paragraph */}
      <section className="night-section border-bottom manifesto-section">
        <div className="container">
          <div className="section-label-col font-mono">MANIFESTO</div>
          <WordScrub
            text="Your customers already live on WhatsApp. So the order desk should too. No app to download. No account to make. Tap, wait, collect."
            className="manifesto-text font-display"
          />
        </div>
      </section>

      {/* 6. THREE SEATS: Accordion rail */}
      <section className="night-section border-bottom">
        <div className="container">
          <div className="section-label-col font-mono">THREE SEATS</div>
          <h2 className="section-heading font-display">
            BUILT FOR EVERYONE IN THE ROOM
          </h2>

          <div className="three-seats-rail">
            {/* Seat 1: Customer */}
            <div
              className={`seat-strip chamfer-card ${threeSeatsActive === 0 ? "expanded" : ""}`}
              onMouseEnter={() => setThreeSeatsActive(0)}
              onClick={() => setThreeSeatsActive(0)}
            >
              <div className="seat-title font-display">FOR THE CUSTOMER</div>
              <div className="seat-content">
                <PersonPhoneScene />
                <ul className="seat-points font-mono">
                  <li>• Zero app to download or update</li>
                  <li>• Every step is a tap from their seat</li>
                  <li>• Random 4 digit PIN only they hold</li>
                </ul>
              </div>
            </div>

            {/* Seat 2: Manager */}
            <div
              className={`seat-strip chamfer-card ${threeSeatsActive === 1 ? "expanded" : ""}`}
              onMouseEnter={() => setThreeSeatsActive(1)}
              onClick={() => setThreeSeatsActive(1)}
            >
              <div className="seat-title font-display">FOR THE MANAGER</div>
              <div className="seat-content">
                <QueueCounterScene />
                <ul className="seat-points font-mono">
                  <li>• Every incoming order in clean sequence</li>
                  <li>• Accept and dispatch to kitchen in one tap</li>
                  <li>• Permanent number blocking for abusers</li>
                </ul>
              </div>
            </div>

            {/* Seat 3: Kitchen */}
            <div
              className={`seat-strip chamfer-card ${threeSeatsActive === 2 ? "expanded" : ""}`}
              onMouseEnter={() => setThreeSeatsActive(2)}
              onClick={() => setThreeSeatsActive(2)}
            >
              <div className="seat-title font-display">FOR THE KITCHEN</div>
              <div className="seat-content">
                <KitchenBellScene />
                <ul className="seat-points font-mono">
                  <li>• High contrast screen displays hot tickets</li>
                  <li>• Cook marks ready in one tap</li>
                  <li>• No shouting, paper slips, or lost tickets</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHO IT FITS: Six tall slabs with GSAP expansion and navigation */}
      <section className="night-section border-bottom">
        <div className="container">
          <div className="section-label-col font-mono">SECTORS</div>
          <h2 className="section-heading font-display">
            WHO IT FITS
          </h2>

          <div className="six-slabs-container">
            {sectors.map((sec, idx) => {
              const Scene = SECTOR_ICONS[sec.slug] || RestaurantSectorScene;
              const isHovered = hoveredSlab === idx;
              return (
                <div
                  key={sec.slug}
                  className={`sector-slab chamfer-card ${isHovered ? "expanded" : ""}`}
                  onMouseEnter={() => setHoveredSlab(idx)}
                  onMouseLeave={() => setHoveredSlab(null)}
                  onClick={() => navigate(`/for/${sec.slug}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") navigate(`/for/${sec.slug}`);
                  }}
                  aria-label={`Explore Ordera for ${sec.name}`}
                >
                  <div className="slab-header">
                    <span className="slab-status-tag font-mono">{sec.status}</span>
                    <h3 className="slab-name font-display">{sec.name.toUpperCase()}</h3>
                  </div>

                  <div className="slab-body">
                    <p className="slab-problem font-body">{sec.problems[0]}</p>
                    <div className="slab-scene-wrap">
                      <Scene />
                    </div>
                  </div>

                  <div className="slab-footer font-mono">
                    <span>EXPLORE SECTOR →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. WHY TRUST IT: Bento Grid from features.js (status: "live") */}
      <section className="night-section border-bottom">
        <div className="container">
          <div className="section-label-col font-mono">VERIFIED FEATURES</div>
          <h2 className="section-heading font-display">
            WHY TRUST IT
          </h2>

          <div className="bento-features-grid">
            {liveFeatures.map((feat, i) => (
              <div key={feat.id} className={`bento-block chamfer-card bento-${i}`}>
                <div className="bento-badge font-mono">LIVE FEATURE</div>
                <h3 className="bento-title font-display">{feat.title}</h3>
                <p className="bento-desc font-body">{feat.description}</p>
                <div className="bento-indicator">
                  <span className="led-square led-lime" aria-hidden="true" />
                  <span className="font-mono">VERIFIED LIVE</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. PLANS AT A GLANCE + SAVINGS ESTIMATOR */}
      <section className="night-section border-bottom">
        <div className="container">
          <div className="section-label-col font-mono">PLANS</div>
          <h2 className="section-heading font-display">
            PLANS AT A GLANCE
          </h2>

          <div className="plans-summary-grid">
            {pricingPlans.map((p) => (
              <div key={p.id} className={`plan-glance-card chamfer-card ${p.highlight ? "highlight-plan" : ""}`}>
                <div className="plan-glance-name font-display">{p.name}</div>
                <div className="plan-glance-target font-body">{p.target}</div>
                <div className="plan-glance-price font-display highlight-lime-text">
                  {p.monthlyFee} <span className="period font-mono">{p.period}</span>
                </div>
                <div className="plan-glance-setup font-mono">Setup: {p.setupFee} once</div>
                <ul className="plan-glance-limits font-mono">
                  <li>• {p.limits.branches}</li>
                  <li>• {p.limits.menuItems}</li>
                  <li>• {p.limits.staffLogins}</li>
                </ul>
                <ChamferButton to="/pricing" variant={p.highlight ? "primary" : "secondary"}>
                  View Details
                </ChamferButton>
              </div>
            ))}

            {/* Enterprise Coming 2027 Block */}
            <div className="plan-glance-card chamfer-card enterprise-card">
              <div className="plan-glance-name font-display">{enterprisePlan.name}</div>
              <span className="status-tag-ember font-mono">{enterprisePlan.statusTag}</span>
              <p className="plan-glance-target font-body">{enterprisePlan.target}</p>
              <ul className="plan-glance-limits font-mono">
                {enterprisePlan.plannedFeatures.map((f, idx) => (
                  <li key={idx}>• {f.title} <span className="tag-planned">[Planned]</span></li>
                ))}
              </ul>
              <a
                href={`https://wa.me/94768325949?text=${encodeURIComponent(enterprisePlan.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="chamfer-btn chamfer-btn-secondary font-mono"
              >
                Tell Us You Want It
              </a>
            </div>
          </div>

          {/* Compact Savings Estimator */}
          <div style={{ marginTop: "3rem" }}>
            <SavingsEstimator />
          </div>
        </div>
      </section>

      {/* 10. QUESTIONS: FAQ + Assistant trigger */}
      <section className="night-section border-bottom">
        <div className="container">
          <div className="section-label-col font-mono">QUESTIONS</div>
          <h2 className="section-heading font-display">
            COMMON QUESTIONS
          </h2>

          <div className="faq-accordions-group">
            {generalFaq.slice(0, 5).map((item, idx) => (
              <div key={idx} className="faq-night-row">
                <button
                  type="button"
                  className="faq-toggle-btn"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  aria-expanded={openFaq === idx}
                >
                  <span className="faq-q-text">{item.question}</span>
                  <ChevronDownIcon size={18} className={`faq-chevron ${openFaq === idx ? "open" : ""}`} />
                </button>
                {openFaq === idx && (
                  <div className="faq-answer-block">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. CONTACT: Prefer to Talk? */}
      <section className="night-section">
        <div className="container">
          <div className="contact-teaser-box chamfer-card">
            <div className="contact-teaser-text">
              <h2 className="contact-title font-display">PREFER TO TALK?</h2>
              <p className="contact-sub font-body">
                Call our direct Colombo desk or message us on WhatsApp. We answer in person without automated scripts.
              </p>
            </div>

            <div className="contact-reveal-controls">
              {!revealedPhone ? (
                <button
                  type="button"
                  className="tap-reveal-btn font-mono"
                  onClick={() => setRevealedPhone(true)}
                >
                  Tap to Reveal Hotline
                </button>
              ) : (
                <div className="revealed-phone-row">
                  <span className="revealed-num font-display">{siteConfig.phoneDisplay}</span>
                  <a href={siteConfig.telLink} className="contact-action-btn font-mono" aria-label="Call hotline">
                    <PhoneIcon size={14} /> CALL
                  </a>
                  <a href={siteConfig.whatsappLink} target="_blank" rel="noopener noreferrer" className="contact-action-btn wa font-mono" aria-label="WhatsApp">
                    <WhatsAppIcon size={14} /> WHATSAPP
                  </a>
                </div>
              )}
              <ChamferButton to="/onboard" variant="primary">
                Get Started
              </ChamferButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
