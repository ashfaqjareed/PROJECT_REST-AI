import React, { useState } from "react";
import { Link } from "react-router-dom";

export function BrexFeatureDeck() {
  const [activeCard, setActiveCard] = useState(0);

  // Card 1 interactive state: selected dish
  const [selectedDishIndex, setSelectedDishIndex] = useState(0);
  const sampleDishes = [
    { name: "Chicken Kottu", price: "Rs. 950" },
    { name: "Egg Roti & Gravy", price: "Rs. 450" },
    { name: "Iced Milo", price: "Rs. 320" },
    { name: "Beef Fried Rice", price: "Rs. 1,200" }
  ];

  // Card 2 interactive state: ticket status
  const [ticketStatus, setTicketStatus] = useState("COOKING"); // "COOKING" or "READY"

  // Card 3 interactive state: 4-digit PIN
  const [pinDigits, setPinDigits] = useState(["7", "4", "1", "9"]);
  const generateNewPin = () => {
    const d1 = String(Math.floor(1 + Math.random() * 9));
    const d2 = String(Math.floor(Math.random() * 10));
    const d3 = String(Math.floor(Math.random() * 10));
    const d4 = String(Math.floor(Math.random() * 10));
    setPinDigits([d1, d2, d3, d4]);
  };

  // Card 4 interactive state: revenue time frame
  const [revTab, setRevTab] = useState("today"); // "today" or "yesterday"

  // Card 5 interactive state: stock toggles
  const [stockRoti, setStockRoti] = useState(true);
  const [stockKottu, setStockKottu] = useState(false);
  const [rushActive, setRushActive] = useState(true);

  // Mouse spotlight tracker
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  const cards = [
    {
      id: "catalog",
      title: "Tap-to-Order Catalog",
      desc: "Customers message WhatsApp and tap through visual dish categories without downloading any app.",
      badge: "WhatsApp 2.0",
      content: (
        <div className="card-mock-phone">
          <div className="mock-chat-bubble bot">
            <span className="mock-chat-title">Cafe Ceylon</span>
            <span className="mock-chat-sub">Tap an option to start</span>
          </div>
          <button
            type="button"
            className="mock-chat-tap-btn"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedDishIndex((prev) => (prev + 1) % sampleDishes.length);
            }}
            title="Tap to switch dish"
          >
            Order Food & Drinks ▼
          </button>
          <div className="mock-chat-bubble user">
            {sampleDishes[selectedDishIndex].name} ({sampleDishes[selectedDishIndex].price})
          </div>
          <div className="mock-micro-hint font-mono">Tap button to test switch</div>
        </div>
      )
    },
    {
      id: "kitchen",
      title: "Kitchen Screen",
      desc: "High contrast cooks display shows tickets in arrival sequence with one-tap ready alerts.",
      badge: "Cooks Pass",
      content: (
        <div className="card-mock-ticket">
          <div className="mock-ticket-header">
            <span className="ticket-id font-mono">OR-1042</span>
            <span className={`ticket-status font-mono ${ticketStatus === "READY" ? "ready" : "active"}`}>
              {ticketStatus}
            </span>
          </div>
          <div className="mock-ticket-items">
            <div>1x Chicken Kottu (Spicy)</div>
            <div>1x Iced Milo Extra Cold</div>
          </div>
          <button
            type="button"
            className={`mock-ready-btn font-mono ${ticketStatus === "READY" ? "is-ready" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setTicketStatus((prev) => (prev === "COOKING" ? "READY" : "COOKING"));
            }}
          >
            {ticketStatus === "COOKING" ? "MARK READY ✓" : "RESET TICKET"}
          </button>
        </div>
      )
    },
    {
      id: "pin",
      title: "Pickup PIN Handover",
      desc: "A random 4 digit PIN sent to WhatsApp prevents wrong pickups and counter mix-ups.",
      badge: "Double Verify",
      content: (
        <div className="card-mock-pin-box">
          <div className="pin-label font-mono">CUSTOMER VERIFICATION PIN</div>
          <div className="pin-numbers-row font-mono">
            <span>{pinDigits[0]}</span>
            <span>{pinDigits[1]}</span>
            <span>{pinDigits[2]}</span>
            <span>{pinDigits[3]}</span>
          </div>
          <button
            type="button"
            className="pin-regen-btn font-mono"
            onClick={(e) => {
              e.stopPropagation();
              generateNewPin();
            }}
          >
            GENERATE NEW PIN ↻
          </button>
          <div className="pin-sub">Show at counter to collect</div>
        </div>
      )
    },
    {
      id: "revenue",
      title: "Instant Revenue Desk",
      desc: "Live daily sales totals, order counts, and zero commission settlement records.",
      badge: "Zero Cuts",
      content: (
        <div className="card-mock-rev-box">
          <div className="rev-head font-mono">
            <div className="rev-toggle-group">
              <button
                type="button"
                className={`rev-pill-btn ${revTab === "today" ? "active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setRevTab("today");
                }}
              >
                TODAY
              </button>
              <button
                type="button"
                className={`rev-pill-btn ${revTab === "yesterday" ? "active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setRevTab("yesterday");
                }}
              >
                YESTERDAY
              </button>
            </div>
            <span className="rev-val">
              {revTab === "today" ? "Rs. 104,200" : "Rs. 92,600"}
            </span>
          </div>
          <div className="rev-mini-chart">
            <div className="chart-bar" style={{ height: revTab === "today" ? "45%" : "60%" }} title="Lunch rush" />
            <div className="chart-bar" style={{ height: revTab === "today" ? "70%" : "50%" }} title="Tea rush" />
            <div className="chart-bar" style={{ height: revTab === "today" ? "90%" : "75%" }} title="Dinner rush" />
            <div className="chart-bar active" style={{ height: "100%" }} title="Peak service" />
          </div>
          <div className="rev-foot font-mono">
            {revTab === "today" ? "48 TICKETS • 100% DIRECT SALES" : "42 TICKETS • 100% DIRECT SALES"}
          </div>
        </div>
      )
    },
    {
      id: "control",
      title: "Menu & Rush Control",
      desc: "One-tap sold-out toggle when dishes run dry, plus polite maintenance pause during rushes.",
      badge: "Counter Control",
      content: (
        <div className="card-mock-toggle-box">
          <div
            className="toggle-row clickable"
            onClick={(e) => {
              e.stopPropagation();
              setStockRoti(!stockRoti);
            }}
          >
            <span>Egg Roti</span>
            <span className={`toggle-pill font-mono ${stockRoti ? "in-stock" : "sold-out"}`}>
              {stockRoti ? "IN STOCK" : "SOLD OUT"}
            </span>
          </div>
          <div
            className="toggle-row clickable"
            onClick={(e) => {
              e.stopPropagation();
              setStockKottu(!stockKottu);
            }}
          >
            <span>Seafood Kottu</span>
            <span className={`toggle-pill font-mono ${stockKottu ? "in-stock" : "sold-out"}`}>
              {stockKottu ? "IN STOCK" : "SOLD OUT"}
            </span>
          </div>
          <button
            type="button"
            className={`toggle-rush-btn font-mono ${rushActive ? "active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setRushActive(!rushActive);
            }}
          >
            {rushActive ? "RUSH PAUSE: ACTIVE" : "RUSH PAUSE: OFF"}
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="brex-deck-container">
      <div className="brex-deck-header text-center">
        <h2 className="brex-deck-title font-display">
          The order desk is just the start.
        </h2>
        <p className="brex-deck-sub font-body">
          Everything your restaurant needs to speed up service, eliminate wrong orders, and keep 100% of food revenue.
        </p>
      </div>

      <div className="brex-deck-cards-grid">
        {cards.map((c, idx) => (
          <div
            key={c.id}
            className={`brex-card spotlight-card ${activeCard === idx ? "active" : ""}`}
            onMouseEnter={() => setActiveCard(idx)}
            onClick={() => setActiveCard(idx)}
            onMouseMove={handleMouseMove}
          >
            <div className="brex-card-top">
              <span className="brex-card-badge font-mono">{c.badge}</span>
              <h3 className="brex-card-heading font-display">{c.title}</h3>
              <p className="brex-card-desc font-body">{c.desc}</p>
            </div>

            <div className="brex-card-preview">
              {c.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
