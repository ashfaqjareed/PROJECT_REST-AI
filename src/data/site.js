// Site configuration and operational metrics
// All operational estimates carry FOUNDER TO CONFIRM comments

export const siteConfig = {
  name: "Ordera",
  tagline: "Order from your seat. Walk in when it is ready.",
  description: "Ordera turns WhatsApp into your restaurant's order desk. Customers tap their order, your kitchen sees it, and the food is handed over with a 4 digit PIN. No app to install. No commission on orders.",
  phoneDisplay: "076 832 5949",
  phoneRaw: "0768325949",
  telLink: "tel:0768325949",
  whatsappNumber: "94768325949",
  whatsappLink: "https://wa.me/94768325949",
  parentStudioName: "NorthStar Devs",
  parentStudioLink: "https://northstardevs.vercel.app/",

  // Setup turnaround in working days
  setupWorkingDays: 2, // FOUNDER TO CONFIRM: target working days required for complete configuration

  // Onboarding steps breakdown
  onboardingSteps: [
    { step: "01", title: "First Talk", days: "Day 1", description: "WhatsApp discussion on menu layout and counter setup." },
    { step: "02", title: "Menu Entry", days: "Day 1", description: "We enter your dishes, prices, and photos for you." },
    { step: "03", title: "Number Linking", days: "Day 2", description: "Connect your official WhatsApp ordering desk." },
    { step: "04", title: "Staff Walkthrough", days: "Day 2", description: "Run test tickets together on phone or tablet." },
    { step: "05", title: "Go Live", days: "Day 2", description: "Display your QR posters and accept clean orders." }
  ],

  // Observed canteen queue comparison (in minutes)
  // One university canteen break, observed. Times are illustrative.
  queueComparison: {
    context: "One university canteen break, observed. Times are illustrative.",
    studentNote: "Students often get one hour between classes. Ordera gives the queue time back.",
    today: {
      orderQueueMinutes: 8, // FOUNDER TO CONFIRM: standing in line to place order
      billQueueMinutes: 5,  // FOUNDER TO CONFIRM: waiting at cashier for token/bill
      pickupWaitMinutes: 10, // FOUNDER TO CONFIRM: waiting at collection counter
      totalMinutes: 23
    },
    withOrdera: {
      orderMinutes: 1,      // Tapping order from seat or desk
      readyWaitMinutes: 0,  // Productive time doing coursework/work until notified
      pinHandoverMinutes: 2, // Walk in, show 4 digit PIN, collect food
      totalMinutes: 2
    }
  },

  // Meta WhatsApp messaging economics
  messaging: {
    metaRateUsd: 0.0020, // FOUNDER TO CONFIRM: current Meta utility conversation rate for Sri Lanka
    freeTierMonthlyMessages: 1000, // Meta provides 1,000 service conversations free per month
    usdToLkr: 300, // FOUNDER TO CONFIRM: exchange rate estimate for LKR conversions
    messagesPerOrder: 12 // FOUNDER TO CONFIRM: average bot and customer interactions per completed order
  },

  // Support response commitment
  supportResponseTime: "within 24 hours", // FOUNDER TO CONFIRM: standard intake response time

  // Page-specific velocity ticker phrases
  tickerPhrases: {
    home: [
      "NO APP TO INSTALL",
      "NO COMMISSION ON ORDERS",
      "PICKUP PIN HANDOVER",
      "KITCHEN SCREEN",
      "ORDER IN ONE TAP",
      "MADE IN SRI LANKA"
    ],
    howItWorks: [
      "EVERY STEP IS A TAP",
      "NO WRONG PICKUPS",
      "COOKS SEE CLEAN TICKETS",
      "INSTANT REVENUE SUMMARY",
      "COLOMBO TECH"
    ],
    pricing: [
      "FAIR FLAT MONTHLY",
      "ZERO COMMISSION FOREVER",
      "NO SURPRISE FEES",
      "MONTH TO MONTH",
      "KEEP YOUR REVENUE"
    ],
    onboard: [
      "FAST SETUP",
      "NO TECH SKILLS NEEDED",
      "WE ENTER YOUR MENU",
      "TEST ORDERS TOGETHER",
      "READY IN DAYS"
    ]
  }
};
