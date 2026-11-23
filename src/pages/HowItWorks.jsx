import React, { useState } from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "../data/site";
import { features } from "../data/features";
import { generalFaq } from "../data/faq";
import { useHead } from "../hooks/useHead";
import {
  KitchenBellScene,
  PinKeypadScene,
  PersonPhoneScene,
  QueueCounterScene
} from "../components/SvgScenes";
import { ChevronDownIcon, PhoneIcon, WhatsAppIcon } from "../components/Icons";

const CHAT_STAGES = [
  {
    step: "01",
    title: "Welcome & Menu Categories",
    desc: "Customer scans table QR or messages your WhatsApp number to open the visual food catalog.",
    messages: [
      { sender: "bot", text: "Welcome to Cafe Ceylon" },
      { sender: "bot", isButton: true, text: "Browse Categories ▼" },
      { sender: "user", text: "Main Course" }
    ]
  },
  {
    step: "02",
    title: "Select Dish & Addons",
    desc: "Customer selects their dish, portion size, and spice or milk preferences in clean taps.",
    messages: [
      { sender: "bot", text: "Main Course: Tap to choose" },
      { sender: "user", text: "Chicken Kottu (Rs. 950)" },
      { sender: "bot", text: "Added to cart: 1x Chicken Kottu" }
    ]
  },
  {
    step: "03",
    title: "Review Cart & Confirm",
    desc: "Total is calculated automatically with zero service charge or hidden app commissions.",
    messages: [
      { sender: "bot", text: "Cart Total: Rs. 950. Confirm order?" },
      { sender: "bot", isReplies: true, options: ["Add More", "Confirm"] },
      { sender: "user", text: "Confirm Order" }
    ]
  },
  {
    step: "04",
    title: "Manager Receives Ticket",
    desc: "Manager screen alerts with double chime and sequential order reference OR-1001.",
    messages: [
      { sender: "bot", text: "Order OR-1001 confirmed. Sent to kitchen." }
    ]
  },
  {
    step: "05",
    title: "Cooks Mark Ready",
    desc: "Cook plates the food and taps Mark Ready on the kitchen tablet screen.",
    messages: [
      { sender: "bot", text: "Food is packed and ready for pickup." }
    ]
  },
  {
    step: "06",
    title: "PIN Verification Handover",
    desc: "Customer shows 4 digit PIN (e.g. 7419) at counter to collect food and pay.",
    messages: [
      { sender: "bot", text: "Your Pickup PIN: 7419. Show at counter to collect." }
    ]
  }
];

export default function HowItWorks() {
  useHead({
    title: "How It Works | Ordera",
    description: "One order, step by step. See how customer taps on WhatsApp travel to the restaurant manager and kitchen display with a 4 digit pickup PIN.",
    path: "/how-it-works"
  });

  const [openFaq, setOpenFaq] = useState(null);
  const [activeStage, setActiveStage] = useState(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  const busyFeatures = features.filter(
    (f) => f.status === "live" && ["order-numbers", "maintenance-mode", "block-number"].includes(f.id)
  );

  return (
    <div className="how-it-works-brex-page">
      {/* 1. Hero Header */}
      <section className="brex-hero-section">
        <div className="container">
          <div className="brex-hero-center text-center">
            <div className="brex-eyebrow-pill font-mono">
              <span className="eyebrow-dot" aria-hidden="true" />
              <span>STEP-BY-STEP OPERATION • BUTTON-DRIVEN ORDERING</span>
            </div>

            <h1 className="brex-hero-h1 font-display">
              <span className="block-line">EVERY STEP IS A TAP.</span>
              <span className="block-line">ORDERS ARRIVE CLEAN.</span>
            </h1>

            <p className="brex-hero-p font-body">
              No typing mistakes, no noise across crowded dining rooms, and zero wrong pickups. Here is how an order moves from table to counter in under two minutes.
            </p>

            <div className="brex-hero-actions">
              <Link to="/onboard" className="brex-btn-primary font-body">
                Get Started
              </Link>
              <Link to="/pricing" className="brex-btn-secondary font-body">
                View Plans
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Customer Journey: 6 Tap Screens Grid */}
      <section className="brex-section border-top border-bottom">
        <div className="container">
          <div className="section-label-pill font-mono text-center">CUSTOMER JOURNEY</div>
          <h2 className="brex-section-h2 font-display text-center">
            SIX TAP SCREENS ON WHATSAPP
          </h2>
          <p className="brex-section-desc font-body text-center">
            Customers tap through menu options naturally in WhatsApp. Zero app to download or update.
          </p>

          <div className="how-chat-screens-grid">
            {CHAT_STAGES.map((stage, idx) => (
              <div
                key={stage.step}
                className={`how-chat-col spotlight-card ${activeStage === idx ? "active" : ""}`}
                onMouseEnter={() => setActiveStage(idx)}
                onMouseMove={handleMouseMove}
              >
                <div className="how-step-badge font-mono">
                  <span>STEP {stage.step}</span>
                </div>
                <h3 className="how-stage-title font-display">{stage.title}</h3>
                <p className="how-stage-desc font-body">{stage.desc}</p>

                <div className="how-chat-mockup">
                  <div className="mockup-top-status font-mono">
                    <span className="status-dot green" />
                    <span>WhatsApp Order Desk</span>
                  </div>
                  <div className="mockup-chat-body">
                    {stage.messages.map((m, mIdx) => (
                      <div key={mIdx} className={`mock-chat-row ${m.sender}`}>
                        {m.isButton ? (
                          <div className="chat-btn-ui font-mono">{m.text}</div>
                        ) : m.isReplies ? (
                          <div className="chat-replies-ui font-mono">
                            {m.options.map((opt, oIdx) => (
                              <span key={oIdx} className="reply-pill">{opt}</span>
                            ))}
                          </div>
                        ) : (
                          <div className={`chat-bubble ${m.sender} font-body`}>
                            {m.text}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Manager Desk Tour */}
      <section className="brex-section border-bottom">
        <div className="container">
          <div className="section-label-pill font-mono text-center">MANAGER DESK</div>
          <h2 className="brex-section-h2 font-display text-center">
            THE MANAGER CONTROL SCREEN
          </h2>

          <div className="how-dual-showcase">
            <div className="showcase-info-col">
              <p className="showcase-lead font-body">
                Incoming tickets appear in clean chronological order. The counter attendant reviews the items and sends the order straight to the kitchen screen in one tap.
              </p>
              <div className="showcase-points font-mono">
                <div className="point-item">
                  <span className="point-num highlight-lime-text">01</span>
                  <div>
                    <strong>DOUBLE ALERT PULSE:</strong> Manager is alerted instantly on every incoming ticket.
                  </div>
                </div>
                <div className="point-item">
                  <span className="point-num highlight-lime-text">02</span>
                  <div>
                    <strong>NUMBER BLOCKING:</strong> Abusive or prank numbers blocked permanently in one tap.
                  </div>
                </div>
                <div className="point-item">
                  <span className="point-num highlight-lime-text">03</span>
                  <div>
                    <strong>DAILY REVENUE VIEW:</strong> Real-time takings totals without manual spreadsheets.
                  </div>
                </div>
              </div>
            </div>

            <div className="showcase-ui-col">
              <div className="brex-dash-card spotlight-card" onMouseMove={handleMouseMove}>
                <div className="dash-head font-mono">
                  <span>COUNTER DESK • SAMPLE CAFE</span>
                  <span className="live-pill">LIVE SYNC</span>
                </div>
                <div className="dash-ticket">
                  <div className="dash-ticket-top font-mono">
                    <span className="t-id">OR-1001</span>
                    <span className="t-status">ACCEPTED</span>
                  </div>
                  <div className="dash-items font-mono">
                    <div>1x Classic Chicken Kottu</div>
                    <div>1x Iced Milo Dinosaur</div>
                  </div>
                  <div className="dash-actions font-mono">
                    <span className="btn-tag green">SEND TO COOKS</span>
                    <span className="btn-tag outline">BLOCK NUMBER</span>
                  </div>
                </div>
                <div className="dash-foot font-mono">
                  <span>TODAY'S ORDERS: 42</span>
                  <span className="highlight-lime-text">TAKINGS: RS. 54,200</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Kitchen Screen & PIN Handover */}
      <section className="brex-section border-bottom">
        <div className="container">
          <div className="section-label-pill font-mono text-center">KITCHEN SCREEN & PIN</div>
          <h2 className="brex-section-h2 font-display text-center">
            NO SHOUTING. NO WRONG PICKUPS.
          </h2>

          <div className="how-dual-showcase">
            <div className="showcase-card-tile">
              <div className="tile-scene">
                <KitchenBellScene />
              </div>
              <h3 className="tile-title font-display">TICKETS ON COOK'S SCREEN</h3>
              <p className="tile-desc font-body">
                Cooks see hot tickets in exact order of arrival. When food is plated, one tap marks the order ready, sending the customer their pickup PIN immediately.
              </p>
              <ul className="tile-list font-mono">
                <li>• High contrast screen readable from 3 meters away</li>
                <li>• Mark ready in one tap</li>
                <li>• No messy paper tickets near hot fryers</li>
              </ul>
            </div>

            <div className="showcase-card-tile">
              <div className="tile-scene">
                <PinKeypadScene />
              </div>
              <h3 className="tile-title font-display">4-DIGIT PICKUP PIN</h3>
              <p className="tile-desc font-body">
                The customer holds the 4-digit PIN on WhatsApp. The manager never sees it until the customer shows it at collection, preventing any order mix-up.
              </p>
              <ul className="tile-list font-mono">
                <li>• Random 4-digit PIN generated per ticket</li>
                <li>• Manager enters PIN to verify handover</li>
                <li>• Cash or LankaQR payment settled cleanly</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Busy Hour Tools */}
      <section className="brex-section border-bottom">
        <div className="container">
          <div className="section-label-pill font-mono text-center">RUSH TOOLS</div>
          <h2 className="brex-section-h2 font-display text-center">
            BUILT FOR PEAK HOUR RUSHES
          </h2>

          <div className="brex-bento-grid">
            {busyFeatures.map((f) => (
              <div key={f.id} className="brex-bento-tile">
                <div className="bento-badge-live font-mono">PEAK TOOL</div>
                <h3 className="bento-heading font-display">{f.title}</h3>
                <p className="bento-text font-body">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Setup Timeline */}
      <section className="brex-section border-bottom">
        <div className="container">
          <div className="section-label-pill font-mono text-center">SETUP TIMELINE</div>
          <h2 className="brex-section-h2 font-display text-center">
            READY IN 2 WORKING DAYS
          </h2>

          <div className="how-timeline-cards-grid font-mono">
            {[
              { step: "01", title: "First Talk", days: "Day 1", desc: "WhatsApp discussion on menu layout and counter setup." },
              { step: "02", title: "Menu Entry", days: "Day 1", desc: "We enter your dishes, prices, and photos for you." },
              { step: "03", title: "Number Linking", days: "Day 2", desc: "Connect your official WhatsApp ordering desk." },
              { step: "04", title: "Staff Walkthrough", days: "Day 2", desc: "Run test tickets together on phone or tablet." },
              { step: "05", title: "Go Live", days: "Day 2", desc: "Display your QR posters and accept clean orders." }
            ].map((node) => (
              <div key={node.step} className="timeline-card">
                <span className="t-node-num highlight-lime-text">{node.step}</span>
                <div className="t-node-title">{node.title} ({node.days})</div>
                <p className="t-node-desc font-body">{node.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="brex-section border-bottom">
        <div className="container">
          <div className="section-label-pill font-mono text-center">QUESTIONS</div>
          <h2 className="brex-section-h2 font-display text-center">
            HOW IT WORKS FAQ
          </h2>

          <div className="brex-faq-accordion">
            {generalFaq.map((item, idx) => (
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

      {/* 8. CTA Section */}
      <section className="brex-section brex-contact-cta text-center">
        <div className="container">
          <h2 className="brex-cta-title font-display">
            READY TO SET UP YOUR RESTAURANT DESK?
          </h2>
          <p className="brex-cta-sub font-body">
            Join Sri Lankan restaurants and cafes cutting counter lines with Ordera.
          </p>
          <div className="brex-hero-actions">
            <Link to="/onboard" className="brex-btn-primary font-body">
              Start Onboarding
            </Link>
            <a href={siteConfig.whatsappLink} target="_blank" rel="noopener noreferrer" className="brex-btn-secondary font-body">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
