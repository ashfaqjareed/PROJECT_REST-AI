import React from "react";

// Custom inline SVG icons with consistent 1.75px stroke and square caps.
// Zero icon fonts, zero icon libraries, zero emojis.

export function ArrowRightIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="miter" className={className} aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export function ArrowLeftIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="miter" className={className} aria-hidden="true">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

export function CheckIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="miter" className={className} aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function CloseIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="miter" className={className} aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function PhoneIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="miter" className={className} aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="miter" className={className} aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

export function HomeIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="miter" className={className} aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

export function FlowIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="miter" className={className} aria-hidden="true">
      <rect x="3" y="3" width="6" height="6" />
      <rect x="15" y="15" width="6" height="6" />
      <path d="M6 9v9h9" />
    </svg>
  );
}

export function TagIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="miter" className={className} aria-hidden="true">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

export function TerminalIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="miter" className={className} aria-hidden="true">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

export function ChevronDownIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="miter" className={className} aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function ChatIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="miter" className={className} aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export function PlayIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="miter" className={className} aria-hidden="true">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

export function PauseIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="miter" className={className} aria-hidden="true">
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  );
}

export function RefreshIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="miter" className={className} aria-hidden="true">
      <polyline points="23 4 23 10 17 10" />
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </svg>
  );
}

export function FoodIcon({ type = "rice", size = 24, className = "" }) {
  if (type === "hopper") {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="var(--white)" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="miter" className={className} aria-hidden="true">
        <path d="M4 14C4 22 10 26 16 26C22 26 28 22 28 14" />
        <ellipse cx="16" cy="14" rx="12" ry="5" />
        <circle cx="16" cy="14" r="3" fill="var(--lime)" stroke="none" />
      </svg>
    );
  }
  if (type === "kottu") {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="var(--white)" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="miter" className={className} aria-hidden="true">
        <path d="M6 18C6 24 10 26 16 26C22 26 26 24 26 18H6Z" />
        <path d="M8 14L14 8M18 14L24 8" stroke="var(--lime)" />
      </svg>
    );
  }
  if (type === "rotti") {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="var(--white)" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="miter" className={className} aria-hidden="true">
        <polygon points="16,6 27,24 5,24" />
        <circle cx="16" cy="18" r="2" fill="var(--ember)" stroke="none" />
      </svg>
    );
  }
  if (type === "drink") {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="var(--white)" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="miter" className={className} aria-hidden="true">
        <path d="M9 8L11 26H21L23 8H9Z" />
        <line x1="8" y1="8" x2="24" y2="8" />
        <line x1="18" y1="4" x2="14" y2="16" stroke="var(--lime)" />
      </svg>
    );
  }
  if (type === "snack") {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="var(--white)" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="miter" className={className} aria-hidden="true">
        <circle cx="12" cy="16" r="6" />
        <circle cx="20" cy="16" r="6" fill="var(--lime)" stroke="none" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="var(--white)" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="miter" className={className} aria-hidden="true">
      <path d="M6 14C6 22 10 26 16 26C22 26 26 22 26 14H6Z" />
      <path d="M10 10L16 6L22 10" stroke="var(--lime)" />
    </svg>
  );
}
