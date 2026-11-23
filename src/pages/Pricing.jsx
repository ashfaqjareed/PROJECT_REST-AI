import React, { useState } from "react";
import { Link } from "react-router-dom";
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
  const [calcOrders, setCalcOrders] = useState(1200);
  const totalMsgs = calcOrders * siteConfig.messaging.messagesPerOrder;
  const billableMsgs = Math.max(0, totalMsgs - siteConfig.messaging.freeTierMonthlyMessages);
  const metaCostLkr = Math.round(billableMsgs * siteConfig.messaging.metaRateUsd * siteConfig.messaging.usdToLkr);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div className="pricing-page-wrap">
      {/* 1. Header Hero - Centered and Punchy */}
      <section className="pricing-hero-header">
        <div className="container text-center-box">
          <div className="section-label-col font-mono">TRANSPARENT PRICING</div>
          <h1 className="pricing-page-h1 font-display">
            PRICES YOU CAN READ IN ONE BREATH
          </h1>
          <p className="pricing-page-sub font-body">
            Two clean plans built for Sri Lankan venues. One-time setup, predictable flat monthly subscription. Keep 100% of your customer food revenue with zero order commissions.
          </p>
        </div>
      </section>

      {/* 2. The 2 Main Pricing Cards */}
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
                  className={`plan-featured-card chamfer-card spotlight-card ${isGrowth ? "plan-highlight-card" : ""} ${isSelected ? "selected-plan-col" : ""}`}
                  onClick={() => setSelectedPlanId(plan.id)}
                  onMouseMove={handleMouseMove}
                >
                  {isGrowth && (
                    <div className="plan-badge-top font-mono">
                      RECOMMENDED FOR BUSY RESTAURANTS
                    </div>
                  )}

                  <div className="plan-card-header text-center">
                    <h2 className="col-plan-name font-display">{plan.name}</h2>
                    <p className="col-plan-target font-body">{plan.target}</p>
                  </div>

                  {/* Prominent Visible Price */}
                  <div className="plan-card-numbers text-center">
                    <div className="price-primary font-display highlight-lime-text">
                      {plan.monthlyFee}
                      <span className="price-period font-mono"> / month</span>
                    </div>
                    <div className="setup-fee-tag font-mono">
                      Setup fee: <strong>{plan.setupFee}</strong> (one-time)
                    </div>
                    <div className="first-month-tag font-mono">
                      First month total: {firstMonthTotal}
                    </div>
                  </div>

                  {/* Plan Limits */}
                  <div className="col-limits-block font-mono">
                    <div className="limits-header">CAPACITY LIMITS</div>
                    <div className="limit-item">Outlet Branches: <strong>{plan.limits.branches}</strong></div>
                    <div className="limit-item">WhatsApp Numbers: <strong>{plan.limits.whatsappNumbers}</strong></div>
                    <div className="limit-item">Menu Catalog: <strong>{plan.limits.menuItems}</strong></div>
                    <div className="limit-item">Staff Accounts: <strong>{plan.limits.staffLogins}</strong></div>
                  </div>

                  {/* Service Inclusions */}
                  <div className="col-benefits-block">
                    <div className="benefits-header font-mono">WHAT IS INCLUDED</div>
                    {plan.serviceBenefits.map((b, i) => (
                      <div key={i} className="benefit-row font-body">
                        <span className="benefit-check highlight-lime-text font-mono">✓</span>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                  {/* System Core Features */}
                  <div className="col-features-block">
                    <div className="features-header font-mono">CORE SYSTEM INCLUDED</div>
                    {commonProductFeatures.slice(0, 4).map((feat, i) => (
                      <div key={i} className="feat-check-row font-mono">
                        <CheckIcon size={14} className="check-icon-lime" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className="col-cta-wrap text-center">
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

          {/* Enterprise Custom Plan */}
          <div className="enterprise-wide-card chamfer-card">
            <div className="ent-header-row">
              <div>
                <span className="ent-title font-display">{enterprisePlan.name}</span>
                <span className="ent-badge font-mono">{enterprisePlan.statusTag}</span>
              </div>
              <div className="ent-quote-text font-mono">Custom Quotes for Multi-Branch Franchises</div>
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
                Inquire For Multi-Branch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Meta WhatsApp Billing Transparency */}
      <section className="night-section border-bottom">
        <div className="container">
          <div className="section-label-col font-mono text-center">TRANSPARENCY</div>
          <h2 className="section-heading font-display text-center">
            HOW META WHATSAPP BILLING WORKS
          </h2>
          <div className="messaging-explainer-card chamfer-card">
            <p className="messaging-lead font-body text-center">
              Ordera charges zero order commissions. Meta (WhatsApp parent company) provides 1,000 free service conversations per month to each WhatsApp Business account.
            </p>
            <div className="messaging-rules-grid font-mono">
              <div className="msg-rule-box">
                <span className="msg-rule-num highlight-lime-text">1,000 FREE / MONTH</span>
                <p>Meta covers the first 1,000 customer service chats free each month on every WhatsApp Business number.</p>
              </div>
              <div className="msg-rule-box">
                <span className="msg-rule-num highlight-lime-text">~RS. 4.50 PER ORDER</span>
                <p>Orders beyond the 1,000 free monthly quota cost ~USD $0.015 per 24-hour customer window, billed directly by Meta.</p>
              </div>
            </div>

            {/* Interactive Meta Calculator */}
            <div className="meta-calc-wrap font-mono">
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

      {/* 4. Savings Estimator */}
      <section className="night-section border-bottom">
        <div className="container">
          <div className="section-label-col font-mono text-center">ESTIMATOR</div>
          <h2 className="section-heading font-display text-center">
            CALCULATE YOUR KITCHEN REVENUE GAIN
          </h2>
          <SavingsEstimator />
        </div>
      </section>

      {/* 5. Frequently Asked Questions */}
      <section className="night-section border-bottom">
        <div className="container">
          <div className="section-label-col font-mono text-center">QUESTIONS</div>
          <h2 className="section-heading font-display text-center">
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

      {/* 6. Terms & Commercial Transparency */}
      <section className="night-section">
        <div className="container">
          <div className="terms-night-card chamfer-card font-mono text-center">
            <div className="terms-title font-display">COMMERCIAL TERMS</div>
            <div className="terms-points">
              <p>• {paymentTerms.settlement}</p>
              <p>• {paymentTerms.commission}</p>
              <p>• {paymentTerms.refunds}</p>
            </div>
            <div className="terms-action-row" style={{ justifyContent: "center" }}>
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
