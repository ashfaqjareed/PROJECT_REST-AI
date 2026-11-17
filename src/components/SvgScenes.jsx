import React from "react";

// Night Kitchen: Flat 2D vector line art on pure black.
// 2px white strokes with square caps, one solid spot shape in lime or ember per scene.
// Zero gradients, zero 3D, zero emojis.

export function QueueCounterScene({ className = "" }) {
  return (
    <div className={`scene-wrap ${className}`} aria-label="Queue of customers waiting at a food counter">
      <svg viewBox="0 0 480 220" fill="none" className="scene-svg">
        {/* Floor line */}
        <line x1="20" y1="200" x2="460" y2="200" stroke="var(--white)" strokeWidth="2" strokeLinecap="square" />
        
        {/* Counter */}
        <rect x="340" y="90" width="120" height="110" stroke="var(--white)" strokeWidth="2" />
        <rect x="350" y="55" width="40" height="35" stroke="var(--white)" strokeWidth="2" />
        {/* Cashier screen spot shape in Ember */}
        <rect x="355" y="60" width="30" height="20" fill="var(--ember)" />

        {/* Counter staff figure */}
        <circle cx="420" cy="55" r="14" stroke="var(--white)" strokeWidth="2" />
        <path d="M400 90c0-15 40-15 40 0" stroke="var(--white)" strokeWidth="2" strokeLinecap="square" />

        {/* Steam puffs */}
        <path d="M360 40v-15M370 42v-20" stroke="var(--white)" strokeWidth="2" strokeLinecap="square" className="anim-steam" />

        {/* Queuing customers with subtle shuffle */}
        {/* Person 1 */}
        <g className="anim-shuffle-1">
          <circle cx="280" cy="95" r="14" stroke="var(--white)" strokeWidth="2" />
          <path d="M262 135c0-20 36-20 36 0v65h-36z" stroke="var(--white)" strokeWidth="2" />
        </g>

        {/* Person 2 */}
        <g className="anim-shuffle-2">
          <circle cx="210" cy="100" r="14" stroke="var(--white)" strokeWidth="2" />
          <path d="M192 140c0-20 36-20 36 0v60h-36z" stroke="var(--white)" strokeWidth="2" />
        </g>

        {/* Person 3 */}
        <g className="anim-shuffle-1">
          <circle cx="140" cy="105" r="14" stroke="var(--white)" strokeWidth="2" />
          <path d="M122 145c0-20 36-20 36 0v55h-36z" stroke="var(--white)" strokeWidth="2" />
        </g>

        {/* Person 4 checking watch */}
        <g className="anim-shuffle-2">
          <circle cx="70" cy="110" r="14" stroke="var(--white)" strokeWidth="2" />
          <path d="M52 150c0-20 36-20 36 0v50h-36z" stroke="var(--white)" strokeWidth="2" />
          <line x1="88" y1="140" x2="100" y2="130" stroke="var(--white)" strokeWidth="2" strokeLinecap="square" />
        </g>
      </svg>
    </div>
  );
}

export function PersonPhoneScene({ className = "" }) {
  return (
    <div className={`scene-wrap ${className}`} aria-label="Customer comfortably seated at a table tapping an order on phone">
      <svg viewBox="0 0 420 220" fill="none" className="scene-svg">
        {/* Table */}
        <line x1="220" y1="140" x2="380" y2="140" stroke="var(--white)" strokeWidth="2" strokeLinecap="square" />
        <line x1="300" y1="140" x2="300" y2="200" stroke="var(--white)" strokeWidth="2" strokeLinecap="square" />
        <line x1="260" y1="200" x2="340" y2="200" stroke="var(--white)" strokeWidth="2" strokeLinecap="square" />

        {/* Glass on table with Lime accent spot */}
        <path d="M330 115l5 25h20l5-25z" stroke="var(--white)" strokeWidth="2" />
        <rect x="338" y="125" width="14" height="12" fill="var(--lime)" />

        {/* Chair */}
        <path d="M100 90v110M140 140v60" stroke="var(--white)" strokeWidth="2" strokeLinecap="square" />
        <line x1="90" y1="140" x2="150" y2="140" stroke="var(--white)" strokeWidth="2" strokeLinecap="square" />

        {/* Seated customer */}
        <circle cx="150" cy="70" r="15" stroke="var(--white)" strokeWidth="2" />
        <path d="M130 115c0-25 40-25 40 0v55h-40z" stroke="var(--white)" strokeWidth="2" />
        <path d="M170 115l35 15l20-15" stroke="var(--white)" strokeWidth="2" strokeLinecap="square" />

        {/* Smartphone held in hand with Lime screen */}
        <rect x="220" y="95" width="22" height="38" stroke="var(--white)" strokeWidth="2" />
        <rect x="223" y="100" width="16" height="26" fill="var(--lime)" />
      </svg>
    </div>
  );
}

export function KitchenBellScene({ className = "" }) {
  return (
    <div className={`scene-wrap ${className}`} aria-label="Kitchen pass with order tickets and call bell">
      <svg viewBox="0 0 460 200" fill="none" className="scene-svg">
        {/* Pass rail bar */}
        <rect x="30" y="30" width="400" height="12" stroke="var(--white)" strokeWidth="2" />

        {/* Ticket 1 */}
        <rect x="80" y="42" width="70" height="90" stroke="var(--white)" strokeWidth="2" />
        <line x1="90" y1="58" x2="135" y2="58" stroke="var(--white)" strokeWidth="2" strokeLinecap="square" />
        <line x1="90" y1="72" x2="140" y2="72" stroke="var(--white)" strokeWidth="2" strokeLinecap="square" />
        <line x1="90" y1="86" x2="125" y2="86" stroke="var(--white)" strokeWidth="2" strokeLinecap="square" />
        {/* Ember preparing indicator */}
        <rect x="90" y="102" width="24" height="12" fill="var(--ember)" />

        {/* Ticket 2 */}
        <rect x="180" y="42" width="70" height="90" stroke="var(--white)" strokeWidth="2" />
        <line x1="190" y1="58" x2="235" y2="58" stroke="var(--white)" strokeWidth="2" strokeLinecap="square" />
        <line x1="190" y1="72" x2="240" y2="72" stroke="var(--white)" strokeWidth="2" strokeLinecap="square" />
        {/* Lime ready indicator */}
        <rect x="190" y="102" width="24" height="12" fill="var(--lime)" />

        {/* Service counter */}
        <line x1="20" y1="170" x2="440" y2="170" stroke="var(--white)" strokeWidth="2" strokeLinecap="square" />

        {/* Kitchen service bell with Lime spot */}
        <path d="M330 170h60v-6h-60z" stroke="var(--white)" strokeWidth="2" />
        <path d="M335 164c0-25 50-25 50 0z" stroke="var(--white)" strokeWidth="2" fill="var(--lime)" />
        <rect x="357" y="132" width="6" height="7" fill="var(--white)" />
      </svg>
    </div>
  );
}

export function PinKeypadScene({ className = "" }) {
  return (
    <div className={`scene-wrap ${className}`} aria-label="Pickup counter PIN verification terminal">
      <svg viewBox="0 0 420 200" fill="none" className="scene-svg">
        {/* Counter */}
        <line x1="20" y1="165" x2="400" y2="165" stroke="var(--white)" strokeWidth="2" strokeLinecap="square" />

        {/* Takeaway bag with Lime check */}
        <path d="M60 85h65l10 80h-85z" stroke="var(--white)" strokeWidth="2" />
        <path d="M80 85v-18c0-8 25-8 25 0v18" stroke="var(--white)" strokeWidth="2" strokeLinecap="square" />
        <rect x="82" y="110" width="26" height="20" fill="var(--lime)" />

        {/* PIN terminal */}
        <rect x="190" y="35" width="180" height="130" stroke="var(--white)" strokeWidth="2" />
        {/* Screen */}
        <rect x="205" y="48" width="150" height="32" stroke="var(--white)" strokeWidth="2" />
        {/* 4 PIN squares */}
        <rect x="215" y="55" width="18" height="18" fill="var(--lime)" />
        <rect x="240" y="55" width="18" height="18" fill="var(--lime)" />
        <rect x="265" y="55" width="18" height="18" fill="var(--lime)" />
        <rect x="290" y="55" width="18" height="18" fill="var(--lime)" />

        {/* Keypad buttons */}
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => (
            <rect
              key={`${r}-${c}`}
              x={215 + c * 35}
              y={92 + r * 18}
              width="26"
              height="12"
              stroke="var(--white)"
              strokeWidth="1.5"
            />
          ))
        )}
      </svg>
    </div>
  );
}

// Sector scenes:
// 1. Restaurant Table Scene
export function RestaurantSectorScene({ className = "" }) {
  return (
    <div className={`scene-wrap ${className}`} aria-label="Restaurant table and plates">
      <svg viewBox="0 0 380 200" fill="none" className="scene-svg">
        <line x1="40" y1="150" x2="340" y2="150" stroke="var(--white)" strokeWidth="2" strokeLinecap="square" />
        <circle cx="140" cy="115" r="28" stroke="var(--white)" strokeWidth="2" />
        <circle cx="140" cy="115" r="16" stroke="var(--white)" strokeWidth="2" fill="var(--ember)" />
        <circle cx="240" cy="115" r="28" stroke="var(--white)" strokeWidth="2" />
        <line x1="85" y1="90" x2="85" y2="140" stroke="var(--white)" strokeWidth="2" strokeLinecap="square" />
        <line x1="295" y1="90" x2="295" y2="140" stroke="var(--white)" strokeWidth="2" strokeLinecap="square" />
      </svg>
    </div>
  );
}

// 2. Cafe Counter Scene
export function CafeSectorScene({ className = "" }) {
  return (
    <div className={`scene-wrap ${className}`} aria-label="Espresso machine and takeaway cups">
      <svg viewBox="0 0 380 200" fill="none" className="scene-svg">
        <line x1="30" y1="160" x2="350" y2="160" stroke="var(--white)" strokeWidth="2" strokeLinecap="square" />
        {/* Espresso machine */}
        <rect x="70" y="70" width="130" height="90" stroke="var(--white)" strokeWidth="2" />
        <rect x="85" y="85" width="40" height="25" fill="var(--lime)" />
        <rect x="145" y="105" width="20" height="30" stroke="var(--white)" strokeWidth="2" />
        {/* Takeaway cup */}
        <path d="M250 90l8 70h35l8-70z" stroke="var(--white)" strokeWidth="2" />
        <line x1="245" y1="90" x2="305" y2="90" stroke="var(--white)" strokeWidth="2" strokeLinecap="square" />
      </svg>
    </div>
  );
}

// 3. Canteen Tray Queue Scene
export function CanteenSectorScene({ className = "" }) {
  return (
    <div className={`scene-wrap ${className}`} aria-label="Canteen tray line">
      <svg viewBox="0 0 380 200" fill="none" className="scene-svg">
        <line x1="30" y1="160" x2="350" y2="160" stroke="var(--white)" strokeWidth="2" strokeLinecap="square" />
        {/* Metal tray 1 */}
        <rect x="60" y="130" width="100" height="24" stroke="var(--white)" strokeWidth="2" />
        <circle cx="85" cy="142" r="7" fill="var(--ember)" />
        <circle cx="115" cy="142" r="7" stroke="var(--white)" strokeWidth="1.5" />
        <circle cx="140" cy="142" r="6" stroke="var(--white)" strokeWidth="1.5" />
        {/* Metal tray 2 */}
        <rect x="200" y="130" width="100" height="24" stroke="var(--white)" strokeWidth="2" />
        <circle cx="225" cy="142" r="7" fill="var(--lime)" />
        <circle cx="255" cy="142" r="7" stroke="var(--white)" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

// 4. Bakery Display Scene
export function BakerySectorScene({ className = "" }) {
  return (
    <div className={`scene-wrap ${className}`} aria-label="Bakery bread and pastry shelves">
      <svg viewBox="0 0 380 200" fill="none" className="scene-svg">
        {/* Shelving */}
        <rect x="50" y="40" width="280" height="130" stroke="var(--white)" strokeWidth="2" />
        <line x1="50" y1="105" x2="330" y2="105" stroke="var(--white)" strokeWidth="2" strokeLinecap="square" />
        {/* Bread loaves top */}
        <rect x="75" y="65" width="45" height="30" stroke="var(--white)" strokeWidth="2" fill="var(--ember)" />
        <rect x="135" y="65" width="45" height="30" stroke="var(--white)" strokeWidth="2" />
        <rect x="195" y="65" width="45" height="30" stroke="var(--white)" strokeWidth="2" />
        {/* Pastries bottom */}
        <circle cx="95" cy="135" r="14" stroke="var(--white)" strokeWidth="2" fill="var(--lime)" />
        <circle cx="145" cy="135" r="14" stroke="var(--white)" strokeWidth="2" />
        <circle cx="195" cy="135" r="14" stroke="var(--white)" strokeWidth="2" />
      </svg>
    </div>
  );
}

// 5. Flower Boutiques Scene
export function FlowerSectorScene({ className = "" }) {
  return (
    <div className={`scene-wrap ${className}`} aria-label="Floral buckets and wrapped bouquets">
      <svg viewBox="0 0 380 200" fill="none" className="scene-svg">
        <line x1="30" y1="170" x2="350" y2="170" stroke="var(--white)" strokeWidth="2" strokeLinecap="square" />
        {/* Bucket 1 */}
        <path d="M70 110l10 60h45l10-60z" stroke="var(--white)" strokeWidth="2" />
        {/* Stems & Flower */}
        <line x1="90" y1="110" x2="80" y2="60" stroke="var(--white)" strokeWidth="2" strokeLinecap="square" />
        <circle cx="80" cy="55" r="10" stroke="var(--white)" strokeWidth="2" fill="var(--lime)" />
        <line x1="110" y1="110" x2="120" y2="50" stroke="var(--white)" strokeWidth="2" strokeLinecap="square" />
        <circle cx="120" cy="45" r="10" stroke="var(--white)" strokeWidth="2" fill="var(--ember)" />
        {/* Wrapped bouquet right */}
        <polygon points="230,170 290,170 310,80 210,80" stroke="var(--white)" strokeWidth="2" />
        <circle cx="260" cy="65" r="14" stroke="var(--white)" strokeWidth="2" fill="var(--lime)" />
      </svg>
    </div>
  );
}

// 6. Boutique Garment Rail Scene
export function BoutiqueSectorScene({ className = "" }) {
  return (
    <div className={`scene-wrap ${className}`} aria-label="Clothing rack and shopping bags">
      <svg viewBox="0 0 380 200" fill="none" className="scene-svg">
        <line x1="30" y1="170" x2="350" y2="170" stroke="var(--white)" strokeWidth="2" strokeLinecap="square" />
        {/* Clothing rack */}
        <line x1="60" y1="40" x2="260" y2="40" stroke="var(--white)" strokeWidth="2" strokeLinecap="square" />
        <line x1="60" y1="40" x2="60" y2="170" stroke="var(--white)" strokeWidth="2" strokeLinecap="square" />
        <line x1="260" y1="40" x2="260" y2="170" stroke="var(--white)" strokeWidth="2" strokeLinecap="square" />
        {/* Hanger and dress 1 */}
        <path d="M100 45l15 15h-30z" stroke="var(--white)" strokeWidth="1.5" />
        <rect x="88" y="60" width="24" height="65" stroke="var(--white)" strokeWidth="2" fill="var(--lime)" />
        {/* Hanger and shirt 2 */}
        <path d="M160 45l15 15h-30z" stroke="var(--white)" strokeWidth="1.5" />
        <rect x="148" y="60" width="24" height="50" stroke="var(--white)" strokeWidth="2" />
        {/* Shopping bag right */}
        <rect x="290" y="110" width="45" height="60" stroke="var(--white)" strokeWidth="2" />
        <path d="M302 110v-14c0-5 18-5 18 0v14" stroke="var(--white)" strokeWidth="2" strokeLinecap="square" />
      </svg>
    </div>
  );
}

// Colombo Skyline Strip for footer (thin lime line art on pure black)
export function ColomboSkylineStrip({ className = "" }) {
  return (
    <div className={`colombo-skyline-bar ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1200 65" preserveAspectRatio="none" fill="none" className="skyline-svg">
        {/* Horizon */}
        <line x1="0" y1="63" x2="1200" y2="63" stroke="var(--line)" strokeWidth="1" strokeLinecap="square" />

        {/* Port cranes left */}
        <g stroke="var(--lime)" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="miter">
          <path d="M30 63L50 25L70 63" />
          <line x1="50" y1="25" x2="50" y2="12" />
          <line x1="50" y1="15" x2="95" y2="15" />
          <line x1="95" y1="15" x2="50" y2="25" />
        </g>

        {/* Buildings silhouette */}
        <g stroke="var(--line)" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
          <rect x="140" y="32" width="26" height="31" />
          <rect x="175" y="22" width="34" height="41" />
          <rect x="220" y="38" width="20" height="25" />
          <rect x="250" y="16" width="38" height="47" />
          <line x1="269" y1="16" x2="269" y2="6" />
        </g>

        {/* Colombo Lotus Tower in Lime */}
        <g stroke="var(--lime)" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="miter">
          <line x1="600" y1="63" x2="598" y2="24" />
          <line x1="604" y1="63" x2="606" y2="24" />
          {/* Petal bulb */}
          <polygon points="602,12 612,20 602,28 592,20" fill="var(--lime)" />
          {/* Spire */}
          <line x1="602" y1="12" x2="602" y2="2" />
        </g>

        {/* Port city commercial buildings right */}
        <g stroke="var(--line)" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
          <rect x="680" y="28" width="32" height="35" />
          <rect x="720" y="18" width="40" height="45" />
          <rect x="770" y="34" width="24" height="29" />
          <rect x="805" y="24" width="36" height="39" />
        </g>

        {/* Port crane right in Lime */}
        <g stroke="var(--lime)" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="miter">
          <path d="M1060 63L1078 28L1096 63" />
          <line x1="1078" y1="28" x2="1078" y2="16" />
          <line x1="1078" y1="18" x2="1120" y2="18" />
          <line x1="1120" y1="18" x2="1078" y2="28" />
        </g>
      </svg>
    </div>
  );
}
