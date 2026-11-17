import React from "react";

// Reusable Order Ticket component
// Uses the motif of an authentic receipt ticket with perforated torn bottom,
// mono order number, quote-style item bullets, total, and status stamp.

export function TicketCard({
  orderNumber = "OR-1001",
  dateTime = "Today, 12:45 PM",
  items = [
    { name: "Chicken Kottu", qty: 2, price: "Rs. 1,900" },
    { name: "Iced Milo", qty: 1, price: "Rs. 350" }
  ],
  total = "Rs. 2,250",
  status = "ACCEPTED", // "NEW", "ACCEPTED", "COOKING", "READY", "HANDED OVER"
  className = "",
  style = {}
}) {
  const statusColorMap = {
    NEW: "var(--orange)",
    ACCEPTED: "var(--paper-2)",
    COOKING: "var(--paper-2)",
    READY: "var(--green)",
    "HANDED OVER": "var(--green)"
  };

  return (
    <div className={`ticket-card ${className}`} style={style}>
      {/* Top perforated rail hole */}
      <div className="ticket-pin-hole" aria-hidden="true"></div>

      <div className="ticket-header">
        <div className="ticket-order-tag">{orderNumber}</div>
        <div className="ticket-date-tag">{dateTime}</div>
      </div>

      <div className="ticket-divider" aria-hidden="true"></div>

      <div className="ticket-items-list">
        {items.map((it, idx) => (
          <div key={idx} className="ticket-item-row">
            <span className="ticket-item-qty">{it.qty}x</span>
            <span className="ticket-item-name">{it.name}</span>
            <span className="ticket-item-price">{it.price}</span>
          </div>
        ))}
      </div>

      <div className="ticket-divider dashed" aria-hidden="true"></div>

      <div className="ticket-footer-row">
        <span className="ticket-total-label">TOTAL</span>
        <span className="ticket-total-value">{total}</span>
      </div>

      {status && (
        <div
          className="ticket-status-stamp"
          style={{
            backgroundColor: statusColorMap[status] || "var(--paper-2)"
          }}
        >
          {status}
        </div>
      )}

      {/* Perforated sawtooth bottom edge */}
      <div className="ticket-perforated-edge" aria-hidden="true"></div>
    </div>
  );
}
