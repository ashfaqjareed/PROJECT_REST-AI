import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { siteConfig } from "../data/site";
import {
  FALLBACK_GOOGLE_FORM_URL,
  sriLankanMobileRegex,
  emailRegex
} from "../data/formConfig";
import { useHead } from "../hooks/useHead";
import { PersonPhoneScene } from "../components/SvgScenes";
import { ArrowLeftIcon } from "../components/Icons";

const TOTAL_STEPS = 6;

export default function Onboard() {
  useHead({
    title: "Get Started | Ordera Onboarding",
    description: "Tell us about your restaurant or cafe in a few quick taps. We configure your menu, connect your WhatsApp number, and get you live.",
    path: "/onboard"
  });

  const [searchParams] = useSearchParams();
  const preselectedType = searchParams.get("type") || "";
  const preselectedPlan = searchParams.get("plan") || "growth";

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    ownerName: "",
    email: "",
    city: "",
    whatsapp: "",
    businessName: "",
    businessType: preselectedType || "Restaurant",
    menuSize: "20 To 50 Items",
    planInterest: preselectedPlan === "starter" ? "Starter" : "Growth",
    notes: ""
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Keyboard navigation: ESC to go back
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && currentStep > 1 && !submitted) {
        setCurrentStep((prev) => prev - 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStep, submitted]);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateStep1 = () => {
    const errs = {};
    if (!formData.ownerName.trim()) errs.ownerName = "Your name is required";
    if (!formData.whatsapp.trim()) {
      errs.whatsapp = "WhatsApp number is required";
    } else if (!sriLankanMobileRegex.test(formData.whatsapp.trim().replace(/\s/g, ""))) {
      errs.whatsapp = "Enter a valid Sri Lankan mobile number (e.g. 076 832 5949)";
    }
    if (formData.email.trim() && !emailRegex.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address";
    }
    if (!formData.city.trim()) {
      errs.city = "City or town is required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs = {};
    if (!formData.businessName.trim()) {
      errs.businessName = "Business name is required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setSubmitted(true);
  };

  const buildWhatsAppSummary = () => {
    const summary = [
      `*New Ordera Desk Setup Request*`,
      `Name: ${formData.ownerName}`,
      `Venue: ${formData.businessName || "Not specified"} (${formData.businessType})`,
      `City: ${formData.city}`,
      `WhatsApp: ${formData.whatsapp}`,
      `Email: ${formData.email || "Not provided"}`,
      `Menu Size: ${formData.menuSize}`,
      `Selected Plan: ${formData.planInterest}`,
      `Notes: ${formData.notes || "None"}`
    ].join("\n");
    return `https://wa.me/94768325949?text=${encodeURIComponent(summary)}`;
  };

  return (
    <div className="onboard-page-container">
      <div className="container">
        <div className="onboard-split-layout">
          {/* Left Column: Context and Timeline */}
          <div className="onboard-info-sidebar">
            <h1 className="onboard-main-h1 font-display">
              SET UP YOUR RESTAURANT ORDER DESK
            </h1>
            <p className="onboard-main-sub font-body">
              Answer 6 quick questions in under a minute. We configure your menu, connect your WhatsApp number, and train your staff.
            </p>

            <div className="onboard-scene-wrap">
              <PersonPhoneScene />
            </div>

            <div className="onboard-timeline-box chamfer-card font-mono">
              <div className="timeline-box-title">ONBOARDING TIMELINE:</div>
              <div className="timeline-steps-seq">
                {siteConfig.onboardingSteps.map((step) => (
                  <div key={step.step} className="timeline-seq-item">
                    <span className="step-num highlight-lime-text">{step.step}</span>
                    <div className="step-body">
                      <strong>{step.title} ({step.days}):</strong> {step.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Active Interactive Card */}
          <div className="onboard-card-col">
            <div className="onboard-flow-card chamfer-card">
              {/* Progress Bar Header */}
              <div className="flow-progress-header font-mono">
                <span>STEP {currentStep} OF {TOTAL_STEPS}</span>
                {currentStep > 1 && !submitted && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                    className="flow-back-btn"
                    aria-label="Previous step"
                  >
                    <ArrowLeftIcon size={14} /> BACK
                  </button>
                )}
              </div>

              <div className="progress-bar-track" aria-hidden="true">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
                />
              </div>

              {!submitted ? (
                <div className="flow-step-content">
                  {/* STEP 1: Contact Details */}
                  {currentStep === 1 && (
                    <div className="step-screen">
                      <h2 className="step-question font-display">ABOUT YOU</h2>
                      <p className="step-hint font-body">Who should our Colombo desk coordinate with?</p>

                      <div className="flow-field-group">
                        <label className="flow-label font-mono">YOUR NAME *</label>
                        <input
                          type="text"
                          value={formData.ownerName}
                          onChange={(e) => updateField("ownerName", e.target.value)}
                          placeholder="Nuwan Perera"
                          className={`flow-input ${errors.ownerName ? "input-err" : ""}`}
                          autoFocus
                        />
                        {errors.ownerName && <span className="field-err font-mono">{errors.ownerName}</span>}
                      </div>

                      <div className="flow-field-group">
                        <label className="flow-label font-mono">WHATSAPP NUMBER *</label>
                        <input
                          type="tel"
                          value={formData.whatsapp}
                          onChange={(e) => updateField("whatsapp", e.target.value)}
                          placeholder="076 832 5949"
                          className={`flow-input ${errors.whatsapp ? "input-err" : ""}`}
                        />
                        {errors.whatsapp && <span className="field-err font-mono">{errors.whatsapp}</span>}
                      </div>

                      <div className="flow-field-group">
                        <label className="flow-label font-mono">CITY / LOCATION *</label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => updateField("city", e.target.value)}
                          placeholder="Colombo 03 / Kandy / Negombo"
                          className={`flow-input ${errors.city ? "input-err" : ""}`}
                        />
                        {errors.city && <span className="field-err font-mono">{errors.city}</span>}
                      </div>

                      <div className="flow-field-group">
                        <label className="flow-label font-mono">EMAIL (OPTIONAL)</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          placeholder="nuwan@example.com"
                          className={`flow-input ${errors.email ? "input-err" : ""}`}
                        />
                        {errors.email && <span className="field-err font-mono">{errors.email}</span>}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (validateStep1()) setCurrentStep(2);
                        }}
                        className="chamfer-btn chamfer-btn-primary full-width font-mono"
                        style={{ marginTop: "1rem" }}
                      >
                        CONTINUE →
                      </button>
                    </div>
                  )}

                  {/* STEP 2: Business Name */}
                  {currentStep === 2 && (
                    <div className="step-screen">
                      <h2 className="step-question font-display">WHAT IS YOUR VENUE NAME?</h2>
                      <p className="step-hint font-body">The restaurant, cafe, or canteen name displayed to customers.</p>
                      <div className="flow-field-group" style={{ marginTop: "1.5rem" }}>
                        <input
                          type="text"
                          value={formData.businessName}
                          onChange={(e) => updateField("businessName", e.target.value)}
                          placeholder="e.g. Royal Bakes & Kitchen"
                          className={`flow-input font-display big-text ${errors.businessName ? "input-err" : ""}`}
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && formData.businessName.trim()) {
                              setCurrentStep(3);
                            }
                          }}
                        />
                        {errors.businessName && <span className="field-err font-mono">{errors.businessName}</span>}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (validateStep2()) setCurrentStep(3);
                        }}
                        className="chamfer-btn chamfer-btn-primary full-width font-mono"
                        style={{ marginTop: "1rem" }}
                      >
                        CONTINUE →
                      </button>
                    </div>
                  )}

                  {/* STEP 3: Business Type */}
                  {currentStep === 3 && (
                    <div className="step-screen">
                      <h2 className="step-question font-display">WHAT TYPE OF VENUE?</h2>
                      <p className="step-hint font-body">Select the category that best fits your operation.</p>
                      <div className="tap-options-grid font-mono">
                        {["Restaurant", "Cafe", "Canteen", "Bakery", "Flower Shop", "Boutique"].map((t) => (
                          <button
                            key={t}
                            type="button"
                            className={`tap-option-btn ${formData.businessType === t ? "active" : ""}`}
                            onClick={() => {
                              updateField("businessType", t);
                              setTimeout(() => setCurrentStep(4), 180);
                            }}
                          >
                            <span>{t}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 4: Menu Size */}
                  {currentStep === 4 && (
                    <div className="step-screen">
                      <h2 className="step-question font-display">HOW LARGE IS YOUR MENU?</h2>
                      <p className="step-hint font-body">Estimated number of active food or beverage dishes.</p>
                      <div className="tap-options-grid font-mono">
                        {[
                          { label: "Up To 20 Items", desc: "Small cafe or counter" },
                          { label: "20 To 50 Items", desc: "Standard restaurant menu" },
                          { label: "50 To 120 Items", desc: "Full dining or bakery selection" },
                          { label: "120+ Items", desc: "Large multi-cuisine catalog" }
                        ].map((m) => (
                          <button
                            key={m.label}
                            type="button"
                            className={`tap-option-btn ${formData.menuSize === m.label ? "active" : ""}`}
                            onClick={() => {
                              updateField("menuSize", m.label);
                              setTimeout(() => setCurrentStep(5), 180);
                            }}
                          >
                            <span style={{ display: "block", fontWeight: 700 }}>{m.label}</span>
                            <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>{m.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 5: Plan Choice */}
                  {currentStep === 5 && (
                    <div className="step-screen">
                      <h2 className="step-question font-display">CHOOSE YOUR SUBSCRIPTION</h2>
                      <p className="step-hint font-body">Both plans include menu digitization and zero order commissions.</p>
                      <div className="tap-options-grid font-mono">
                        {[
                          {
                            id: "Starter",
                            fee: "Rs. 3,500/mo",
                            setup: "Rs. 15,000 setup",
                            sub: "1 Counter • Up to 50 items • 2 staff logins"
                          },
                          {
                            id: "Growth",
                            fee: "Rs. 8,000/mo",
                            setup: "Rs. 30,000 setup",
                            sub: "Busy Kitchen • Up to 150 items • 5 logins • Full QR pack"
                          }
                        ].map((p) => (
                          <button
                            key={p.id}
                            type="button"
                            className={`tap-option-btn ${formData.planInterest === p.id ? "active" : ""}`}
                            onClick={() => {
                              updateField("planInterest", p.id);
                              setTimeout(() => setCurrentStep(6), 180);
                            }}
                          >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                              <span style={{ fontWeight: 800, fontSize: "17px" }}>{p.id}</span>
                              <span className="highlight-lime-text font-display" style={{ fontSize: "18px" }}>{p.fee}</span>
                            </div>
                            <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{p.setup}</div>
                            <div style={{ fontSize: "11px", color: "var(--text-2)", marginTop: "6px" }}>{p.sub}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 6: Notes & Final Submit */}
                  {currentStep === 6 && (
                    <div className="step-screen">
                      <h2 className="step-question font-display">ANY SPECIAL REQUIREMENTS?</h2>
                      <p className="step-hint font-body">Optional: Tell us about your current kitchen setup, counter hours, or target launch date.</p>
                      <div className="flow-field-group">
                        <textarea
                          rows={4}
                          value={formData.notes}
                          onChange={(e) => updateField("notes", e.target.value)}
                          placeholder="e.g. We want to start by next Monday with 20 kottu and fried rice items..."
                          className="flow-textarea font-body"
                        />
                      </div>

                      <div className="privacy-note-card font-mono">
                        <strong>DATA PRIVACY:</strong> Your contact details and menu specifications are kept strictly private between you and Ordera. Zero sharing.
                      </div>

                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="chamfer-btn chamfer-btn-primary full-width font-mono"
                        style={{ marginTop: "1.25rem" }}
                      >
                        SUBMIT REQUEST →
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* SUCCESS SCREEN */
                <div className="onboard-success-screen">
                  <div className="success-badge font-mono">✓ REQUEST RECORDED</div>
                  <h2 className="success-title font-display">
                    WE ARE READY TO CONFIGURE YOUR DESK
                  </h2>
                  <p className="success-text font-body">
                    Thank you, {formData.ownerName}. Your setup intake for <strong>{formData.businessName}</strong> ({formData.planInterest} Plan) is logged. Our Colombo team will contact you within 24 hours.
                  </p>

                  <div className="success-actions font-mono" style={{ width: "100%" }}>
                    <a
                      href={buildWhatsAppSummary()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="chamfer-btn chamfer-btn-primary full-width"
                      style={{ textAlign: "center" }}
                    >
                      SEND SUMMARY ON WHATSAPP NOW →
                    </a>

                    <a
                      href={FALLBACK_GOOGLE_FORM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="secondary-form-link font-mono"
                      style={{ display: "block", marginTop: "16px", textAlign: "center" }}
                    >
                      Fill Supplementary Google Intake Form →
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
