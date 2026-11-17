import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { sectors } from "../data/sectors";
import { siteConfig } from "../data/site";
import { pricingPlans } from "../data/pricing";
import { useHead } from "../hooks/useHead";
import { ChamferButton } from "../components/ChamferButton";
import { OpposingTextRails } from "../components/OpposingTextRails";
import { SavingsEstimator } from "../components/SavingsEstimator";
import {
  RestaurantSectorScene,
  CafeSectorScene,
  CanteenSectorScene,
  BakerySectorScene,
  FlowerSectorScene,
  BoutiqueSectorScene
} from "../components/SvgScenes";
import { ChevronDownIcon, PhoneIcon, WhatsAppIcon } from "../components/Icons";

const SECTOR_SCENES = {
  restaurants: RestaurantSectorScene,
  cafes: CafeSectorScene,
  canteens: CanteenSectorScene,
  bakeries: BakerySectorScene,
  "flower-boutiques": FlowerSectorScene,
  boutiques: BoutiqueSectorScene
};

export default function SectorPage() {
  const { slug } = useParams();
  const sector = sectors.find(s => s.slug === slug) || sectors[0];
  const SceneComponent = SECTOR_SCENES[sector.slug] || RestaurantSectorScene;

  useHead({
    title: `${sector.name} Ordering Desk | Ordera`,
    description: sector.headline,
    path: `/for/${sector.slug}`
  });

  const [openFaq, setOpenFaq] = useState(null);
  const [sliderMinutes, setSliderMinutes] = useState(14);
  const [revealedPhone, setRevealedPhone] = useState(false);

  const isComingNext = sector.status === "Coming Next";
  const planMatch = pricingPlans.find(p => p.name === sector.planFit) || pricingPlans[0];

  return (
    <div className="sector-page-wrap">
      {/* a. Title Band */}
      <section className="sector-title-band">
        <OpposingTextRails title={sector.name.toUpperCase()} />
        <div className="container content-layer">
          <div className="sector-status-pill font-mono">
            <span className={`status-led ${isComingNext ? "led-ember" : "led-lime"}`} aria-hidden="true" />
            <span>{sector.status}</span>
          </div>

          <h1 className="sector-page-h1 font-display">
            {sector.headline}
          </h1>

          <div className="sector-btn-row">
            <ChamferButton
              to={`/onboard?type=${encodeURIComponent(sector.name)}`}
              variant="primary"
            >
              {isComingNext ? "Join The Early List" : "Get Started"}
            </ChamferButton>
            <ChamferButton
              href={siteConfig.whatsappLink}
              variant="secondary"
            >
              WhatsApp Us
            </ChamferButton>
          </div>
        </div>
      </section>

      {/* b. The Problem */}
      <section className="night-section border-top border-bottom">
        <div className="container">
          <div className="section-label-col font-mono">THE PROBLEM</div>
          <div className="sector-problem-grid">
            <div className="scene-col">
              <SceneComponent />
            </div>
            <div className="problems-col">
              <h2 className="section-heading font-display">
                WHERE SERVICE STALLS TODAY
              </h2>
              <div className="problem-rows-list">
                {sector.problems.map((prob, i) => (
                  <div key={i} className="problem-row">
                    <span className="problem-num font-mono">{String(i + 1).padStart(2, "0")}</span>
                    <span className="problem-text">{prob}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* c. Why Ordera Fits Here (Six Moves) */}
      <section className="night-section border-bottom">
        <div className="container">
          <div className="section-label-col font-mono">WORKFLOW</div>
          <h2 className="section-heading font-display">
            HOW ORDERS MOVE IN YOUR VENUE
          </h2>
          <div className="six-moves-horizontal">
            {sector.sixMoves.map((m) => (
              <div key={m.step} className="move-card chamfer-card">
                <div className="move-step-num font-mono highlight-lime-text">{m.step}</div>
                <div className="move-title font-display">{m.title}</div>
                <p className="move-desc">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* d. How Much Time */}
      <section className="night-section border-bottom">
        <div className="container">
          <div className="section-label-col font-mono">TIME GAINED</div>
          <h2 className="section-heading font-display">
            MINUTES RECLAIMED PER CUSTOMER
          </h2>

          {sector.slug === "canteens" ? (
            <div className="canteen-baseline-box chamfer-card">
              <div className="baseline-header font-mono">
                OBSERVED UNIVERSITY CANTEEN BREAK (23 MINUTES TOTAL QUEUE)
              </div>
              <div className="canteen-bars">
                <div className="canteen-bar-row">
                  <span className="bar-tag font-mono">TODAY</span>
                  <div className="bar-track">
                    <div className="bar-fill fill-ember" style={{ width: "100%" }}>
                      <span>8m Order + 5m Bill + 10m Wait</span>
                    </div>
                  </div>
                </div>
                <div className="canteen-bar-row">
                  <span className="bar-tag font-mono highlight-lime-text">WITH ORDERA</span>
                  <div className="bar-track">
                    <div className="bar-fill fill-lime" style={{ width: "9%" }}>
                      <span>2m Handover</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="baseline-note font-mono">
                Students order from class and walk in when notified ready.
              </div>
            </div>
          ) : (
            <div className="time-slider-box chamfer-card">
              <div className="slider-header font-mono">
                <span>AVERAGE COUNTER WAIT TODAY: {sliderMinutes} MINUTES</span>
                <span className="example-tag">Example, set your own numbers</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                value={sliderMinutes}
                onChange={(e) => setSliderMinutes(Number(e.target.value))}
                className="estimator-slider"
                aria-label="Average counter wait"
              />
              <div className="slider-comparison-bars">
                <div className="canteen-bar-row">
                  <span className="bar-tag font-mono">WAIT TODAY</span>
                  <div className="bar-track">
                    <div className="bar-fill fill-ember" style={{ width: `${Math.min(100, sliderMinutes * 3.3)}%` }}>
                      <span>{sliderMinutes} minutes standing</span>
                    </div>
                  </div>
                </div>
                <div className="canteen-bar-row">
                  <span className="bar-tag font-mono highlight-lime-text">WITH ORDERA</span>
                  <div className="bar-track">
                    <div className="bar-fill fill-lime" style={{ width: "10%" }}>
                      <span>1 to 2m PIN handover</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* e. How Much Money: Savings Estimator */}
      <section className="night-section border-bottom">
        <div className="container">
          <div className="section-label-col font-mono">REVENUE RECOVERY</div>
          <h2 className="section-heading font-display">
            CALCULATE YOUR MONTHLY REVENUE GAIN
          </h2>
          <SavingsEstimator initialPreset={sector.estimatorPreset} />
        </div>
      </section>

      {/* f. Plan Fit & Setup Duration */}
      <section className="night-section border-bottom">
        <div className="container">
          <div className="section-label-col font-mono">SETUP AND PLANS</div>
          <h2 className="section-heading font-display">
            RECOMMENDED PLAN & SETUP
          </h2>
          <div className="sector-plan-fit-card chamfer-card">
            <div className="plan-fit-header">
              <span className="fit-plan-name font-display">{planMatch.name} PLAN</span>
              <span className="fit-plan-cost font-mono highlight-lime-text">
                {planMatch.setupFee} setup, then {planMatch.monthlyFee} / month
              </span>
            </div>
            <p className="fit-plan-desc">{planMatch.target}</p>
            <div className="fit-benefits-grid">
              {planMatch.serviceBenefits.map((b, i) => (
                <div key={i} className="fit-benefit-item font-mono">
                  <span className="benefit-dash">✓</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
            {/* FOUNDER TO CONFIRM: setup days */}
            <div className="fit-setup-time font-mono">
              Ready in {siteConfig.setupWorkingDays} working days.
            </div>
          </div>
        </div>
      </section>

      {/* g. Questions for this Sector */}
      <section className="night-section border-bottom">
        <div className="container">
          <div className="section-label-col font-mono">QUESTIONS</div>
          <h2 className="section-heading font-display">
            QUESTIONS FOR {sector.name.toUpperCase()}
          </h2>
          <div className="faq-accordions-group">
            {sector.faq.map((item, idx) => (
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

      {/* h. CTA Band & Tap to Reveal */}
      <section className="night-section sector-cta-section">
        <div className="container">
          <h2 className="cta-big-title font-display">
            {isComingNext ? "BE THE FIRST IN YOUR SECTOR TO LAUNCH" : "BRING ORDER TO YOUR COUNTER TODAY"}
          </h2>
          <div className="sector-cta-buttons">
            <ChamferButton
              to={`/onboard?type=${encodeURIComponent(sector.name)}`}
              variant="primary"
            >
              {isComingNext ? "Join The Early List" : "Start Onboarding"}
            </ChamferButton>
            <ChamferButton
              href={siteConfig.whatsappLink}
              variant="secondary"
            >
              WhatsApp Us
            </ChamferButton>
          </div>

          <div className="tap-reveal-block">
            {!revealedPhone ? (
              <button
                type="button"
                className="tap-reveal-btn font-mono"
                onClick={() => setRevealedPhone(true)}
              >
                Tap to Reveal Direct Hotline
              </button>
            ) : (
              <div className="revealed-phone-row">
                <span className="revealed-num font-display">{siteConfig.phoneDisplay}</span>
                <a href={siteConfig.telLink} className="contact-action-btn font-mono" aria-label="Call">
                  <PhoneIcon size={14} /> CALL
                </a>
                <a href={siteConfig.whatsappLink} target="_blank" rel="noopener noreferrer" className="contact-action-btn wa font-mono" aria-label="WhatsApp">
                  <WhatsAppIcon size={14} /> WHATSAPP
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
