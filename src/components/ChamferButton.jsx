import React from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "./Icons";

export function ChamferButton({
  children,
  to,
  href,
  onClick,
  variant = "primary", // "primary" (lime fill, black text) or "secondary" (white outline, white text) or "ember"
  className = "",
  showArrow = true,
  type = "button",
  disabled = false,
  ariaLabel
}) {
  const content = (
    <>
      <span className="btn-slide-bg" aria-hidden="true" />
      <span className="btn-text-roll">
        <span className="btn-text-primary">{children}</span>
        <span className="btn-text-duplicate" aria-hidden="true">{children}</span>
      </span>
      {showArrow && (
        <span className="btn-arrow-roll" aria-hidden="true">
          <span className="btn-arrow-primary"><ArrowRightIcon size={16} /></span>
          <span className="btn-arrow-duplicate"><ArrowRightIcon size={16} /></span>
        </span>
      )}
    </>
  );

  const combinedClass = `chamfer-btn chamfer-btn-${variant} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClass} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={combinedClass}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClass}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
