import React from "react";
import { Link } from "react-router-dom";
import { useHead } from "../hooks/useHead";
import { SplitFlapText } from "../components/SplitFlapText";
import { ChamferButton } from "../components/ChamferButton";
import { ColomboSkylineStrip } from "../components/SvgScenes";
import { ArrowRightIcon } from "../components/Icons";

export default function NotFound() {
  useHead({
    title: "404 - Table Not Found | Ordera",
    description: "The counter or table you requested is not on the board. Head back to Ordera.",
    path: "/404",
  });

  return (
    <main
      style={{
        background: "var(--black)",
        color: "var(--white)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "120px 24px 0",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background radial-less subtle grid/grain if any, or flat black */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "760px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "auto 0",
        }}
      >
        {/* Status Pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 14px",
            background: "var(--surface)",
            border: "1px solid var(--line)",
            marginBottom: "28px",
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--ember)",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              background: "var(--ember)",
              display: "inline-block",
            }}
          />
          STATUS: TICKET VOID (404)
        </div>

        {/* Big Flap Title */}
        <div style={{ marginBottom: "20px" }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(48px, 9vw, 96px)",
              lineHeight: 0.95,
              textTransform: "uppercase",
              letterSpacing: "0.02em",
              color: "var(--white)",
              margin: 0,
            }}
          >
            <SplitFlapText text="COUNTER MISSING" />
          </h1>
        </div>

        {/* Explain Card */}
        <div
          className="chamfer-card"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--line)",
            padding: "32px",
            maxWidth: "540px",
            width: "100%",
            marginBottom: "36px",
            textAlign: "left",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--text-muted)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              borderBottom: "1px solid var(--line)",
              paddingBottom: "12px",
              marginBottom: "16px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>KITCHEN DISPATCH</span>
            <span>ERR_CODE: 404</span>
          </div>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "15px",
              lineHeight: 1.6,
              color: "var(--text-secondary)",
              margin: 0,
            }}
          >
            The link you tapped does not match an active counter or menu.
            The page may have shifted to another table, or the route was typed with a slip of the finger.
          </p>

          <div
            style={{
              marginTop: "20px",
              paddingTop: "16px",
              borderTop: "1px solid var(--line)",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              color: "var(--lime)",
            }}
          >
            RETURN_PIN: 0000 // REDIRECT_READY
          </div>
        </div>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            justifyContent: "center",
          }}
        >
          <ChamferButton to="/" variant="lime">
            RETURN TO BOARD
            <ArrowRightIcon width={16} height={16} strokeWidth={2} />
          </ChamferButton>

          <ChamferButton to="/onboard" variant="ghost">
            START ONBOARDING
          </ChamferButton>
        </div>
      </div>

      {/* Skyline footer strip */}
      <div style={{ width: "100%", maxWidth: "900px", marginTop: "60px", opacity: 0.4 }}>
        <ColomboSkylineStrip />
      </div>
    </main>
  );
}
