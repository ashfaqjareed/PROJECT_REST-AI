import React, { useState } from "react";
import { siteConfig } from "../data/site";
import { features } from "../data/features";
import { generalFaq } from "../data/faq";
import { useHead } from "../hooks/useHead";
import { ChamferButton } from "../components/ChamferButton";
import { OpposingTextRails } from "../components/OpposingTextRails";
import { SplitFlapText } from "../components/SplitFlapText";
import {
  KitchenBellScene,
  PinKeypadScene,
  PersonPhoneScene,
  QueueCounterScene
} from "../components/SvgScenes";
import { ChevronDownIcon } from "../components/Icons";

const CHAT_STAGES = [
  {
    step: "01",
    title: "Welcome & Action List",
    messages: [
      { sender: "bot", text: "Welcome Back, Nimal" },
      { sender: "bot", isButton: true, text: "Select An Option ▼" },
      { sender: "user", text: "Order Food" }
    ]
  },
  {
    step: "02",
    title: "Browse Categories",
    messages: [
      { sender: "bot", text: "Select A Menu Category" },
      { sender: "bot", isButton: true, text: "Browse Categories ▼" },
      { sender: "user", text: "Main Course" }
    ]
  },
  {
    step: "03",
    title: "Select Dish & Quantity",
    messages: [
      { sender: "bot", text: "Main Course items loaded. Tap to choose." },
      { sender: "user", text: "Chicken Kottu (Rs. 950)" }
    ]
  },
  {
    step: "04",
    title: "Review Cart & Confirm",
    messages: [
      { sender: "bot", text: "Added to cart: 1x Chicken Kottu. Total: Rs. 950." },
      { sender: "bot", isReplies: true, options: ["Add More", "Edit", "Confirm"] },
      { sender: "user", text: "Confirm Order" }
    ]
  },
  {
    step: "05",
    title: "Order Received by Counter",
    messages: [
      { sender: "bot", text: "Order Received: OR-1001. Preparing your order." }
    ]
  },
  {
    step: "06",
    title: "Ready Notice with 4-Digit PIN",
    messages: [
      { sender: "bot", text: "Your Order Is Ready. PIN: 7419. Show at counter to collect." }
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
  const busyFeatures = features.filter(f => f.status === "live" && ["order-numbers", "maintenance-mode", "block-number"].includes(f.id));

  return (
    <div className="how-it-works-wrap">
      {/* Title Band with Opposing Text Rails */}
      <section className="sector-title-band">
        <OpposingTextRails title="HOW IT WORKS" />
        <div className="container content-layer">
          <h1 className="how-page-h1 font-display">
            <SplitFlapText text="ONE ORDER, STEP BY STEP." />
          </h1>
          <p className="how-page-sub font-body">
            Every step is a tap, so orders arrive clean. No typing, no customer errors, no shouting across the kitchen.
          </p>
        </div>
      </section>

      {/* a. Customer Journey: 6 flat chat screens on a staggered diagonal */}
      <section className="night-section border-top border-bottom">
        <div className="container">
          <div className="section-label-col font-mono">CUSTOMER JOURNEY</div>
          <h2 className="section-heading font-display">
            SIX TAP SCREENS ON WHATSAPP
          </h2>

          <div className="staggered-chat-screens-grid">
            {CHAT_STAGES.map((stage, idx) => (
              <div key={stage.step} className={`stagger-chat-col col-${idx % 2 === 0 ? "even" : "odd"}`}>
                <div className="chat-step-badge font-mono highlight-lime-text">STEP {stage.step}</div>
                <div className="chat-stage-title font-display">{stage.title}</div>

                <div className="flat-chat-phone chamfer-card">
                  <div className="chat-phone-header font-mono">
                    <span className="phone-indicator" />
                    <span>Sample Cafe (WhatsApp)</span>
                  </div>
                  <div className="chat-phone-body">
                    {stage.messages.map((m, mIdx) => (
                      <div key={mIdx} className={`chat-line-row ${m.sender}`}>
                        {m.isButton ? (
                          <div className="chat-sim-btn font-mono">{m.text}</div>
                        ) : m.isReplies ? (
                          <div className="chat-sim-replies">
                            {m.options.map((opt, oIdx) => (
                              <span key={oIdx} className="mini-reply-pill font-mono">{opt}</span>
                            ))}
                          </div>
                        ) : (
                          <div className={`chat-bubble-night ${m.sender}`}>
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

      {/* b. Manager Dashboard Tour */}
      <section className="night-section border-bottom">
        <div className="container">
          <div className="section-label-col font-mono">MANAGER DESK</div>
          <h2 className="section-heading font-display">
            THE MANAGER DASHBOARD
          </h2>

          <div className="dashboard-tour-grid">
            <div className="tour-info-col">
              <p className="tour-lead font-body">
                The manager sees every incoming WhatsApp ticket in real time. One tap accepts the ticket, and one tap sends it straight to the kitchen screen.
              </p>
              <div className="tour-feature-points font-mono">
                <div className="tour-point">
                  <span className="tour-bullet font-mono">01</span>
                  <div>
                    <strong>DOUBLE ALERT PULSE:</strong> Instant visual notification on every new ticket.
                  </div>
                </div>
                <div className="tour-point">
                  <span className="tour-bullet font-mono">02</span>
                  <div>
                    <strong>NUMBER BLOCKING:</strong> Block prank or abusive phone numbers permanently.
                  </div>
                </div>
                <div className="tour-point">
                  <span className="tour-bullet font-mono">03</span>
                  <div>
                    <strong>REVENUE VIEW:</strong> Daily takings and order volume totals without manual spreadsheets.
                  </div>
                </div>
              </div>
            </div>

            <div className="tour-ui-col">
              <div className="mockup-dash-card chamfer-card">
                <div className="mockup-header font-mono">
                  <span>DASHBOARD • SAMPLE CAFE</span>
                  <span className="led-dot pulse-lime" />
                </div>
                <div className="mockup-ticket chamfer-card">
                  <div className="mockup-ticket-head font-mono">
                    <span className="mockup-id">OR-1001</span>
                    <span className="mockup-status status-active">ACCEPTED</span>
                  </div>
                  <div className="mockup-items font-mono">
                    <div>1x Classic Chicken Kottu</div>
                    <div>1x Iced Milo Dinosaur</div>
                  </div>
                  <div className="mockup-buttons font-mono">
                    <span className="mockup-btn btn-lime">SEND TO KITCHEN</span>
                    <span className="mockup-btn btn-outline">BLOCK NUMBER</span>
                  </div>
                </div>
                <div className="mockup-revenue-strip font-mono">
                  <span>TODAY'S ORDERS: 42</span>
                  <span className="highlight-lime-text">REVENUE: RS. 54,200</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* c. Kitchen View */}
      <section className="night-section border-bottom">
        <div className="container">
          <div className="section-label-col font-mono">KITCHEN PASS</div>
          <h2 className="section-heading font-display">
            TICKETS ON THE COOK'S SCREEN
          </h2>
          <div className="kitchen-tour-grid">
            <div className="kitchen-scene-col">
              <KitchenBellScene />
            </div>
            <div className="kitchen-desc-col">
              <p className="kitchen-desc-text font-body">
                Cooks see hot tickets lined up in exact order of arrival. When food is plated, one tap marks the order ready, sending the customer their pickup PIN immediately.
              </p>
              <div className="kitchen-highlights font-mono">
                <div>• Pure black screen for steamy, hot kitchen environments</div>
                <div>• Big high contrast text readable from 3 meters away</div>
                <div>• Zero messy paper tickets hanging near fryers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* d. PIN Handover Diagram */}
      <section className="night-section border-bottom">
        <div className="container">
          <div className="section-label-col font-mono">PIN HANDOVER</div>
          <h2 className="section-heading font-display">
            WHY THE 4-DIGIT PIN MATTERS
          </h2>

          <div className="pin-diagram-grid">
            <div className="pin-explanation-col">
              <p className="pin-bold-line font-display">
                NO WRONG PICKUPS. NO ARGUMENTS AT A BUSY COUNTER.
              </p>
              <p className="pin-sub-text font-body">
                The customer holds the PIN on their phone. The manager never sees it until the customer shows it at the counter. The manager enters it into the dashboard to close the ticket and hand over the meal.
              </p>
              <div className="pin-rule-callout font-mono">
                Customer verifies meal → Manager types PIN → Food handed over → Cash or card paid
              </div>
            </div>

            <div className="pin-scene-col">
              <PinKeypadScene />
            </div>
          </div>
        </div>
      </section>

      {/* e. Busy Hour Features */}
      <section className="night-section border-bottom">
        <div className="container">
          <div className="section-label-col font-mono">RUSH HOURS</div>
          <h2 className="section-heading font-display">
            BUILT FOR BUSY HOURS
          </h2>

          <div className="busy-hour-cards-grid">
            {busyFeatures.map((f) => (
              <div key={f.id} className="busy-feature-card chamfer-card">
                <div className="busy-card-badge font-mono">PEAK TOOL</div>
                <h3 className="busy-card-title font-display">{f.title}</h3>
                <p className="busy-card-desc font-body">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* f. Setup Timeline & Requirements */}
      <section className="night-section border-bottom">
        <div className="container">
          <div className="section-label-col font-mono">SETUP TIMELINE</div>
          <h2 className="section-heading font-display">
            WHAT WE SET UP & WHAT WE NEED FROM YOU
          </h2>

          <div className="setup-dual-grid">
            {/* Timeline */}
            <div className="setup-timeline-col">
              <h3 className="setup-sub-heading font-display">SETUP TIMELINE</h3>
              <div className="setup-steps-line font-mono">
                {[
                  { step: "01", title: "FIRST TALK", desc: "WhatsApp discussion on menu size and counter layout." },
                  { step: "02", title: "MENU ENTRY", desc: "We enter items and prices from your photos or PDFs." },
                  { step: "03", title: "NUMBER SETUP", desc: "Link your WhatsApp ordering desk number." },
                  { step: "04", title: "TEST ORDERS", desc: "Run simulated tickets with your shift team." },
                  { step: "05", title: "GO LIVE", desc: "Place counter QR posters and start receiving orders." }
                ].map((s) => (
                  <div key={s.step} className="timeline-node">
                    <span className="timeline-node-num highlight-lime-text">{s.step}</span>
                    <div className="timeline-node-body">
                      <strong>{s.title}:</strong> {s.desc}
                    </div>
                  </div>
                ))}
              </div>
              {/* FOUNDER TO CONFIRM: setup days */}
              <div className="setup-commitment-tag font-mono">
                Ready in {siteConfig.setupWorkingDays} working days.
              </div>
            </div>

            {/* What we need from you */}
            <div className="setup-needs-col">
              <h3 className="setup-sub-heading font-display">WHAT WE NEED FROM YOU</h3>
              <div className="needs-card chamfer-card font-mono">
                <div className="need-item">✓ A WhatsApp number for the restaurant counter</div>
                <div className="need-item">✓ Your menu with current prices (photos or text)</div>
                <div className="need-item">✓ A tablet, smartphone, or laptop for the dashboard</div>
                <div className="need-item">✓ Counter staff member assigned as manager login</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* g. FAQ Accordion */}
      <section className="night-section border-bottom">
        <div className="container">
          <div className="section-label-col font-mono">QUESTIONS</div>
          <h2 className="section-heading font-display">
            HOW IT WORKS FAQ
          </h2>
          <div className="faq-accordions-group">
            {generalFaq.map((item, idx) => (
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

      {/* h. CTA Band */}
      <section className="night-section sector-cta-section">
        <div className="container">
          <h2 className="cta-big-title font-display">
            READY TO GET STARTED WITH ORDERA?
          </h2>
          <div className="sector-cta-buttons">
            <ChamferButton to="/onboard" variant="primary">
              Start Onboarding
            </ChamferButton>
            <ChamferButton href={siteConfig.whatsappLink} variant="secondary">
              WhatsApp Us
            </ChamferButton>
          </div>
        </div>
      </section>
    </div>
  );
}
