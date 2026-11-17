import React, { useState } from "react";
import { pricingPlans, enterprisePlan, commonProductFeatures, paymentTerms } from "../data/pricing";
import { siteConfig } from "../data/site";
import { pricingFaq } from "../data/faq";
import { useHead } from "../hooks/useHead";
import { ChamferButton } from "../components/ChamferButton";
import { SavingsEstimator } from "../components/SavingsEstimator";
import { CheckIcon, ChevronDownIcon } from "../components/Icons";

export default function Pricing() {
  useHead({
    title: "Pricing & Plans | Ordera",
    description: "Two simple plans for Sri Lankan restaurants and cafes. Setup once, flat monthly subscription, zero commission on orders.",
    path: "/pricing"
  });

  const [selectedPlanId, setSelectedPlanId] = useState("growth");
  const [openFaq, setOpenFaq] = useState(null);

  // Meta messaging calculator state
  const [calcOrders, setCalcOrders] = useState(1500);
  const totalMsgs = calcOrders * siteConfig.messaging.messagesPerOrder;
  const billableMsgs = Math.max(0, totalMsgs - siteConfig.messaging.freeTierMonthlyMessages);
  const metaCostLkr = Math.round(billableMsgs * siteConfig.messaging.metaRateUsd * siteConfig.messaging.usdToLkr);

  return (
    <div className="pricing-page-wrap">
      {/* Title Header */}
      <section className="pricing-hero-header">
        <div className="container text-center-box">
          <div className="section-label-col font-mono">TRANSPARENT PRICING</div>
          <h1 className="pricing-page-h1 font-display">
            PRICES YOU CAN READ IN ONE BREATH
          </h1>
          <p className="pricing-page-sub font-body">
            Two clean plans. One-time setup, predictable flat monthly subscription. Keep 100% of your food revenue with zero order commissions.
          </p>
        </div>
      </section>

      {/* 2 Core Plan Comparison Board */}
      <section className="night-section border-top border-bottom">
        <div className="container">
          <div className="two-plans-grid">
            {pricingPlans.map((plan) => {
              const isSelected = selectedPlanId === plan.id;
              const isGrowth = plan.id === "growth";
              const firstMonthTotal = `Rs. ${(plan.setupFeeNum + plan.monthlyFeeNum).toLocaleString()}`;
              return (
                <div
                  key={plan.id}
                  className={`plan-featured-card chamfer-card ${isGrowth ? "plan-highlight-card" : ""} ${isSelected ? "selected-plan-col" : ""}`}
                  onClick={() => setSelectedPlanId(plan.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter") setSelectedPlanId(plan.id); }}
                  aria-label={`Select ${plan.name} plan`}
                >
                  {isGrowth && (
                    <div className="plan-badge-top font-mono">
                      RECOMMENDED FOR BUSY RESTAURANTS
                    </div>
                  )}

                  <div className="plan-card-header">
                    <h2 className="col-plan-name font-display">{plan.name}</h2>
                    <p className="col-plan-target font-body">{plan.target}</p>
                  </div>

                  {/* Main Price Numbers */}
                  <div className="plan-card-numbers">
                    <div className="price-primary font-display highlight-lime-text">
                      {plan.monthlyFee}
                      <span className="price-period font-mono"> / month</span>
                    </div>
                    <div className="setup-fee-tag font-mono">
                      Setup fee: {plan.setupFee} (one-time)
                    </div>
                    <div className="first-month-tag font-mono">
                      First month total: {firstMonthTotal}
                    </div>
                  </div>

                  {/* Commercial Limits */}
                  <div className="col-limits-block font-mono">
                    <div className="limits-header">CAPACITY LIMITS</div>
                    <div className="limit-item">Outlet Branches: <strong>{plan.limits.branches}</strong></div>
                    <div className="limit-item">WhatsApp Numbers: <strong>{plan.limits.whatsappNumbers}</strong></div>
                    <div className="limit-item">Menu Catalog: <strong>{plan.limits.menuItems}</strong></div>
                    <div className="limit-item">Staff Accounts: <strong>{plan.limits.staffLogins}</strong></div>
                  </div>

                  {/* Service Benefits */}
                  <div className="col-benefits-block">
                    <div className="benefits-header font-mono">WHAT IS INCLUDED</div>
                    {plan.serviceBenefits.map((b, i) => (
                      <div key={i} className="benefit-row font-body">
                        <span className="benefit-check highlight-lime-text font-mono">✓</span>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                  {/* Common Product Features */}
                  <div className="col-features-block">
                    <div className="features-header font-mono">CORE SYSTEM FEATURES</div>
                    {commonProductFeatures.map((feat, i) => (
                      <div key={i} className="feat-check-row font-mono">
                        <CheckIcon size={14} className="check-icon-lime" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="col-cta-wrap">
                    <ChamferButton
                      to={`/onboard?plan=${plan.id}`}
                      variant={isGrowth ? "primary" : "secondary"}
                      className="full-width"
                    >
                      {plan.ctaText}
                    </ChamferButton>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Enterprise Muted Block */}
          <div className="enterprise-wide-card chamfer-card" style={{ marginTop: "40px" }}>
            <div className="ent-header-row">
              <div>
                <span className="ent-title font-display">{enterprisePlan.name}</span>
                <span className="ent-badge font-mono">{enterprisePlan.statusTag}</span>
              </div>
              <div className="ent-quote-text font-mono">Custom Quotes for Hotel Chains & Franchises</div>
            </div>
            <p className="ent-desc font-body">{enterprisePlan.target}</p>
            <div className="ent-features-pills font-mono">
              {enterprisePlan.plannedFeatures.map((f, i) => (
                <span key={i} className="ent-pill">
                  {f.title} <strong className="tag-planned">[Planned]</strong>
                </span>
              ))}
            </div>
            <div style={{ marginTop: "1rem" }}>
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
        </div>
      </section>

      {/* Meta Messaging Explainer */}
      <section className="night-section border-bottom">
        <div className="container">
          <div className="section-label-col font-mono">TRANSPARENCY</div>
          <h2 className="section-heading font-display">
            HOW META WHATSAPP BILLING WORKS
          </h2>
          <div className="messaging-explainer-card chamfer-card">
            <p className="messaging-lead font-body">
              Ordera charges no transaction or commission fees. Meta (WhatsApp's parent company) bills WhatsApp Cloud API messaging directly per utility conversation.
            </p>
            <div className="messaging-rules-grid font-mono">
              <div className="msg-rule-box">
                <span className="msg-rule-num highlight-lime-text">1,000 FREE / MO</span>
                <p>Meta provides every WhatsApp Business Account with 1,000 free service conversations each calendar month.</p>
              </div>
              <div className="msg-rule-box">
                <span className="msg-rule-num highlight-lime-text">~Rs. 4.50 PER ORDER</span>
                <p>Orders that exceed the 1,000 monthly allowance cost approximately USD $0.015 (~Rs. 4.50) per 24-hour customer window, billed directly by Meta.</p>
              </div>
            </div>

            {/* Interactive Meta Calculator */}
            <div className="meta-calc-wrap font-mono" style={{ marginTop: "24px" }}>
              <div className="calc-slider-label">
                <span>ESTIMATED ORDERS PER MONTH: <strong>{calcOrders}</strong></span>
              </div>
              <input
                type="range"
                min="200"
                max="5000"
                step="100"
                value={calcOrders}
                onChange={(e) => setCalcOrders(Number(e.target.value))}
                className="calc-range-slider"
                aria-label="Monthly order estimate for Meta WhatsApp billing"
              />
              <div className="calc-summary-row">
                <div>
                  <span>Total WhatsApp Messages: </span>
                  <strong>{totalMsgs.toLocaleString()}</strong>
                </div>
                <div>
                  <span>Estimated Meta Monthly Fee: </span>
                  <strong className="highlight-lime-text">Rs. {metaCostLkr.toLocaleString()}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Savings Estimator Component */}
      <section className="night-section border-bottom">
        <div className="container">
          <div className="section-label-col font-mono">ESTIMATOR</div>
          <h2 className="section-heading font-display">
            CALCULATE YOUR KITCHEN SAVINGS
          </h2>
          <SavingsEstimator />
        </div>
      </section>

      {/* Pricing FAQ */}
      <section className="night-section border-bottom">
        <div className="container">
          <div className="section-label-col font-mono">QUESTIONS</div>
          <h2 className="section-heading font-display">
            PRICING QUESTIONS
          </h2>
          <div className="faq-accordions-group">
            {pricingFaq.map((item, idx) => (
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
                  <div className="faq-answer-block font-body">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms and Privacy Settlement */}
      <section className="night-section">
        <div className="container">
          <div className="terms-night-card chamfer-card font-mono">
            <div className="terms-title font-display">COMMERCIAL TERMS</div>
            <div className="terms-points">
              <p>• {paymentTerms.settlement}</p>
              <p>• {paymentTerms.commission}</p>
              <p>• {paymentTerms.refunds}</p>
            </div>
            <div className="terms-action-row">
              <ChamferButton to="/onboard" variant="primary">
                Choose A Plan & Get Started
              </ChamferButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
