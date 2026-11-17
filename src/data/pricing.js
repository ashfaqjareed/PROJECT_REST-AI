// Pricing plans, limits, service benefits, and terms
// Focused on 2 core simple clear plans for Sri Lankan venues: Starter and Growth
// Plus Scale for multi-branch and Enterprise for 2027

export const pricingPlans = [
  {
    id: "starter",
    name: "Starter",
    target: "For one counter or cafe getting started",
    setupFee: "Rs. 15,000",
    setupFeeNum: 15000,
    monthlyFee: "Rs. 3,500",
    monthlyFeeNum: 3500,
    period: "per month",
    limits: {
      branches: "1 branch",
      whatsappNumbers: "1 WhatsApp number",
      menuItems: "Up to 50 menu items",
      staffLogins: "2 staff logins"
    },
    serviceBenefits: [
      "Guided setup and number configuration",
      "Menu entry done for you from photos or text",
      "One printable QR poster designed for your brand",
      "One 45 minute staff walkthrough session",
      "Direct WhatsApp support in working hours",
      "2 menu updates every month"
    ],
    ctaText: "Choose Starter",
    highlight: false
  },
  {
    id: "growth",
    name: "Growth",
    target: "For a busy kitchen with higher order volume",
    setupFee: "Rs. 30,000",
    setupFeeNum: 30000,
    monthlyFee: "Rs. 8,000",
    monthlyFeeNum: 8000,
    period: "per month",
    limits: {
      branches: "1 branch",
      whatsappNumbers: "1 WhatsApp number",
      menuItems: "Up to 150 menu items",
      staffLogins: "5 staff logins"
    },
    serviceBenefits: [
      "Everything in Starter included",
      "Full QR print set (counter poster, table stickers, handout)",
      "In person training for the whole shift team",
      "6 menu updates every month",
      "Custom wording for your welcome and ready messages",
      "Monthly 20 minute check in on what is selling",
      "Priority fast replies on WhatsApp"
    ],
    ctaText: "Choose Growth",
    highlight: true
  }
];

export const enterprisePlan = {
  id: "enterprise",
  name: "Enterprise",
  statusTag: "Coming 2027",
  target: "For multi-chain hospitality brands and franchises",
  priceDisplay: "Custom Quote",
  plannedFeatures: [
    { title: "POS System Integration", tag: "Planned" },
    { title: "Delivery Partner Links", tag: "Planned" },
    { title: "Multi-Outlet Consolidated Reporting", tag: "Planned" },
    { title: "Custom Operational Workflows", tag: "Planned" }
  ],
  whatsappMessage: "Hello Ordera team, we are interested in discussing custom multi-outlet deployment for our restaurant chain."
};

export const commonProductFeatures = [
  "Tap-driven WhatsApp order catalog",
  "Random 4-digit pickup PIN with double verification",
  "Live manager and kitchen visual dashboard",
  "Zero commission on food revenue",
  "Pay-at-pickup checkout model",
  "Number blocking for abusive numbers",
  "Instant item pause and sold-out toggling"
];

export const paymentTerms = {
  settlement: "All payments are invoiced monthly. Bank payment details are shared privately on WhatsApp after both sides agree.",
  commission: "Zero percent order commission. You keep 100 percent of your food revenue.",
  refunds: "30 day cancellation anytime. No long term lock-in contracts."
};
