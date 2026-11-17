import React, { useState, useEffect } from "react";

// Signature motif: The ORDER BOARD
// Departure board style strip with split-flap status word cycling and LED indicator.
// Pure flat 2D on black, labelled "Sample Orders".

const initialOrders = [
  { id: "OR-1048", item: "2x Chicken Kottu", status: "READY", color: "lime", mins: "Just now" },
  { id: "OR-1049", item: "1x Seafood Fried Rice", status: "PREPARING", color: "ember", mins: "3m ago" },
  { id: "OR-1050", item: "2x Egg Hoppers, Milo", status: "PREPARING", color: "ember", mins: "5m ago" },
  { id: "OR-1051", item: "1x Pol Rotti Set", status: "READY", color: "lime", mins: "7m ago" }
];

export function OrderBoard({ className = "", compact = false }) {
  const [orders, setOrders] = useState(initialOrders);

  // Periodic split flap flip
  useEffect(() => {
    const timer = setInterval(() => {
      setOrders(prev =>
        prev.map((ord, idx) => {
          if (idx === 1) {
            const nextStatus = ord.status === "PREPARING" ? "READY" : "PREPARING";
            return {
              ...ord,
              status: nextStatus,
              color: nextStatus === "READY" ? "lime" : "ember",
              mins: nextStatus === "READY" ? "Just now" : ord.mins
            };
          }
          return ord;
        })
      );
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`order-board-strip ${className}`} aria-label="Departure board of active sample restaurant orders">
      <div className="order-board-top-tag">
        <span className="led-dot pulse-lime" aria-hidden="true" />
        <span className="order-board-label">Sample Orders</span>
      </div>

      <div className="order-board-rows">
        {orders.slice(0, compact ? 2 : 4).map((ord) => (
          <div key={ord.id} className="order-board-row">
            <span className="order-num font-mono">{ord.id}</span>
            <span className="order-items-preview">{ord.item}</span>
            <div className={`order-status-flap status-${ord.color}`}>
              <span className={`led-square led-${ord.color}`} aria-hidden="true" />
              <span className="status-word font-mono">{ord.status}</span>
            </div>
            <span className="order-time font-mono">{ord.mins}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
