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
  const [daysOpen, setDaysOpen] = useState(initialPreset.daysOpen);
  const [selectedPlanId, setSelectedPlanId] = useState(initialPreset.planId);

  const selectedPlan = pricingPlans.find(p => p.id === selectedPlanId) || pricingPlans[1];
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
  const messagingCostLkr = Math.round(billableMessages * siteConfig.messaging.metaRateUsd * siteConfig.messaging.usdToLkr);

  return (
    <div className={`savings-estimator-card chamfer-card ${className}`}>
      <div className="estimator-header">
        <h3 className="estimator-title font-display">SAVINGS & REVENUE ESTIMATOR</h3>
        <span className="example-tag font-mono">Example, replace with yours</span>
      </div>

      <div className="estimator-body">
        {/* Input sliders */}
        <div className="estimator-inputs">
          <div className="estimator-field">
            <div className="field-label-row font-mono">
              <span>ORDERS PER DAY</span>
              <span className="field-val font-mono">{ordersPerDay}</span>
            </div>
            <input
              type="range"
              min="20"
              max="400"
              step="5"
              value={ordersPerDay}
              onChange={(e) => setOrdersPerDay(Number(e.target.value))}
              className="estimator-slider"
              aria-label="Orders per day"
            />
          </div>

          <div className="estimator-field">
            <div className="field-label-row font-mono">
              <span>AVERAGE BILL (RS)</span>
              <span className="field-val font-mono">Rs. {avgBill.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="300"
              max="6000"
              step="100"
              value={avgBill}
              onChange={(e) => setAvgBill(Number(e.target.value))}
              className="estimator-slider"
              aria-label="Average bill"
            />
          </div>

          <div className="estimator-field">
            <div className="field-label-row font-mono">
              <span>CUSTOMERS GIVING UP IN QUEUE / DAY</span>
              <span className="field-val font-mono">{lostPerDay}</span>
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
              className="estimator-slider"
              aria-label="Customers lost to queue"
            />
          </div>

          <div className="estimator-field">
            <div className="field-label-row font-mono">
              <span>ORDERA BRINGS BACK / DAY</span>
              <span className="field-val font-mono highlight-lime">{recoveredPerDay}</span>
            </div>
            <input
              type="range"
              min="1"
              max={lostPerDay}
              step="1"
              value={recoveredPerDay}
              onChange={(e) => setRecoveredPerDay(Number(e.target.value))}
              className="estimator-slider"
              aria-label="Customers recovered by Ordera"
            />
          </div>

          <div className="estimator-field">
            <div className="field-label-row font-mono">
              <span>PLAN SELECTOR</span>
            </div>
            <div className="plan-buttons-row">
              {pricingPlans.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={`plan-select-btn font-mono ${selectedPlanId === p.id ? "active" : ""}`}
                  onClick={() => setSelectedPlanId(p.id)}
                >
                  {p.name} ({p.monthlyFee})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calculated Results with explicit formulas */}
        <div className="estimator-results">
          <div className="result-metric-box">
            <div className="result-label font-mono">EXTRA SALES PER MONTH</div>
            <div className="result-value font-display highlight-lime">
              Rs. {extraRevenue.toLocaleString()}
            </div>
            <div className="formula-line font-mono">
              Formula: {recoveredPerDay} recovered × Rs. {avgBill.toLocaleString()} × {daysOpen} days
            </div>
          </div>

          <div className="result-metric-box">
            <div className="result-label font-mono">NET MONTHLY GAIN AFTER PLAN</div>
            <div className="result-value font-display">
              Rs. {netDifference.toLocaleString()}
            </div>
            <div className="formula-line font-mono">
              Formula: Rs. {extraRevenue.toLocaleString()} extra sales − Rs. {monthlyFee.toLocaleString()} {selectedPlan.name} fee
            </div>
          </div>

          <div className="result-dual-row">
            <div className="result-sub-box">
              <div className="result-sub-label font-mono">BREAK-EVEN</div>
              <div className="result-sub-val font-mono">{breakEvenOrders} orders / mo</div>
              <div className="formula-line font-mono">
                {selectedPlan.monthlyFee} ÷ Rs. {avgBill.toLocaleString()} avg bill
              </div>
            </div>

            <div className="result-sub-box">
              <div className="result-sub-label font-mono">EST. META MESSAGE FEE</div>
              <div className="result-sub-val font-mono">Rs. {messagingCostLkr.toLocaleString()} / mo</div>
              <div className="formula-line font-mono">
                {totalMonthlyOrders} orders × 12 msgs − 1,000 free
              </div>
            </div>
          </div>

          <div className="estimator-disclaimer font-mono">
            These numbers come from the figures you enter. They are not guaranteed results.
          </div>
        </div>
      </div>
    </div>
  );
}
