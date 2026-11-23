import React, { useState } from "react";
import { pricingPlans } from "../data/pricing";
import { siteConfig } from "../data/site";

export function SavingsEstimator({
  initialPreset = {
    ordersPerDay: 80,
    avgBill: 2200,
    lostCustomersPerDay: 10,
    recoveredPerDay: 6,
    daysOpen: 30,
    planId: "growth"
  },
  className = ""
}) {
  const [ordersPerDay, setOrdersPerDay] = useState(initialPreset.ordersPerDay);
  const [avgBill, setAvgBill] = useState(initialPreset.avgBill);
  const [lostPerDay, setLostPerDay] = useState(initialPreset.lostCustomersPerDay);
  const [recoveredPerDay, setRecoveredPerDay] = useState(initialPreset.recoveredPerDay);
  const [daysOpen] = useState(initialPreset.daysOpen);
  const [selectedPlanId, setSelectedPlanId] = useState(initialPreset.planId);

  const selectedPlan = pricingPlans.find((p) => p.id === selectedPlanId) || pricingPlans[1];
  const monthlyFee = selectedPlan.monthlyFeeNum;

  // Extra revenue per month formula: recoveredPerDay * avgBill * daysOpen
  const extraRevenue = recoveredPerDay * avgBill * daysOpen;

  // Net difference formula: extraRevenue - monthlyFee
  const netDifference = extraRevenue - monthlyFee;

  // Break-even orders per month formula: monthlyFee / avgBill
  const breakEvenOrders = avgBill > 0 ? Math.ceil(monthlyFee / avgBill) : 0;

  // Meta messaging cost formula
  const totalMonthlyOrders = ordersPerDay * daysOpen;
  const totalMessages = totalMonthlyOrders * siteConfig.messaging.messagesPerOrder;
  const billableMessages = Math.max(0, totalMessages - siteConfig.messaging.freeTierMonthlyMessages);
  const messagingCostLkr = Math.round(
    billableMessages * siteConfig.messaging.metaRateUsd * siteConfig.messaging.usdToLkr
  );

  return (
    <div className={`estimator-main-card ${className}`}>
      {/* Estimator Header */}
      <div className="est-card-header text-center">
        <span className="est-badge font-mono">REVENUE ESTIMATOR</span>
        <h3 className="est-headline font-display">CALCULATE YOUR KITCHEN REVENUE GAIN</h3>
        <p className="est-sub font-body">
          Adjust the sliders below to match your venue. See how many lost queue orders Ordera recovers every month.
        </p>
      </div>

      <div className="est-grid-layout">
        {/* Left Column: Sliders & Controls */}
        <div className="est-controls-col">
          {/* Slider 1: Orders per day */}
          <div className="est-slider-group">
            <div className="est-label-row font-mono">
              <span className="est-label-title">ORDERS PER DAY</span>
              <span className="est-label-badge font-mono">{ordersPerDay} orders</span>
            </div>
            <input
              type="range"
              min="20"
              max="400"
              step="5"
              value={ordersPerDay}
              onChange={(e) => setOrdersPerDay(Number(e.target.value))}
              className="est-slider-input"
              aria-label="Orders per day"
            />
            <div className="est-slider-hints font-mono">
              <span>20 (Small Cafe)</span>
              <span>200 (Busy Canteen)</span>
              <span>400+</span>
            </div>
          </div>

          {/* Slider 2: Average bill */}
          <div className="est-slider-group">
            <div className="est-label-row font-mono">
              <span className="est-label-title">AVERAGE BILL PER ORDER</span>
              <span className="est-label-badge font-mono">Rs. {avgBill.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="300"
              max="6000"
              step="100"
              value={avgBill}
              onChange={(e) => setAvgBill(Number(e.target.value))}
              className="est-slider-input"
              aria-label="Average bill"
            />
            <div className="est-slider-hints font-mono">
              <span>Rs. 300 (Tea/Pastry)</span>
              <span>Rs. 2,200 (Lunch)</span>
              <span>Rs. 6,000</span>
            </div>
          </div>

          {/* Slider 3: Customers giving up in queue */}
          <div className="est-slider-group">
            <div className="est-label-row font-mono">
              <span className="est-label-title">CUSTOMERS LEAVING DUE TO QUEUE</span>
              <span className="est-label-badge ember font-mono">{lostPerDay} lost / day</span>
            </div>
            <input
              type="range"
              min="2"
              max="50"
              step="1"
              value={lostPerDay}
              onChange={(e) => {
                const val = Number(e.target.value);
                setLostPerDay(val);
                if (recoveredPerDay > val) setRecoveredPerDay(val);
              }}
              className="est-slider-input"
              aria-label="Customers lost to queue"
            />
            <div className="est-slider-hints font-mono">
              <span>2 per day</span>
              <span>10 per rush</span>
              <span>50 per day</span>
            </div>
          </div>

          {/* Slider 4: Ordera brings back */}
          <div className="est-slider-group">
            <div className="est-label-row font-mono">
              <span className="est-label-title">CUSTOMERS ORDERA RECOVERS</span>
              <span className="est-label-badge lime font-mono">{recoveredPerDay} recovered / day</span>
            </div>
            <input
              type="range"
              min="1"
              max={lostPerDay}
              step="1"
              value={recoveredPerDay}
              onChange={(e) => setRecoveredPerDay(Number(e.target.value))}
              className="est-slider-input"
              aria-label="Customers recovered by Ordera"
            />
            <div className="est-slider-hints font-mono">
              <span>Min: 1</span>
              <span>Target: {Math.round(lostPerDay * 0.6)}</span>
              <span>Max: {lostPerDay}</span>
            </div>
          </div>

          {/* Plan Selector Buttons */}
          <div className="est-plan-select-group">
            <span className="est-label-title font-mono">CHOSEN ORDERA PLAN</span>
            <div className="est-plan-buttons">
              {pricingPlans.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={`est-plan-toggle font-mono ${selectedPlanId === p.id ? "active" : ""}`}
                  onClick={() => setSelectedPlanId(p.id)}
                >
                  <span className="plan-name">{p.name}</span>
                  <span className="plan-cost">{p.monthlyFee} / mo</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Calculated Live Results */}
        <div className="est-output-col">
          <div className="est-primary-metric-box">
            <span className="metric-tag font-mono">EXTRA SALES RECOVERED</span>
            <div className="metric-big-num font-display">
              Rs. {extraRevenue.toLocaleString()}
              <span className="metric-period font-mono"> / month</span>
            </div>
            <div className="metric-formula font-mono">
              Formula: {recoveredPerDay} orders recovered x Rs. {avgBill.toLocaleString()} avg bill x {daysOpen} days
            </div>
          </div>

          <div className="est-net-metric-box">
            <span className="metric-tag font-mono">NET MONTHLY REVENUE GAIN</span>
            <div className="metric-net-num font-display">
              Rs. {netDifference.toLocaleString()}
              <span className="metric-period font-mono"> / month</span>
            </div>
            <div className="metric-formula font-mono">
              After subtracting Rs. {monthlyFee.toLocaleString()} {selectedPlan.name} monthly subscription
            </div>
          </div>

          <div className="est-sub-metrics-grid font-mono">
            <div className="est-sub-card">
              <span className="sub-card-label">BREAK-EVEN ORDERS</span>
              <span className="sub-card-val highlight-lime-text">{breakEvenOrders} orders</span>
              <span className="sub-card-sub">per month to cover plan</span>
            </div>

            <div className="est-sub-card">
              <span className="sub-card-label">EST. META WHATSAPP BILL</span>
              <span className="sub-card-val">Rs. {messagingCostLkr.toLocaleString()}</span>
              <span className="sub-card-sub">1,000 monthly chats free</span>
            </div>
          </div>

          <div className="est-disclaimer-note font-mono">
            * Estimates calculated directly from figures entered above. Zero commission taken by Ordera.
          </div>
        </div>
      </div>
    </div>
  );
}
