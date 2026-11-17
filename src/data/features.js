// Product features list
// Only "live" status items are presented as active claims.
// "planned" items are strictly labelled with the Planned tag.

export const features = [
  {
    id: "restaurant-login",
    title: "Dedicated Restaurant Login",
    description: "Each restaurant has its own secure login to manage incoming orders and counter settings.",
    status: "live"
  },
  {
    id: "pin-handover",
    title: "Pickup PIN Handover",
    description: "The 4 digit pickup PIN is only seen by the customer until food is handed over at the counter.",
    status: "live"
  },
  {
    id: "kitchen-view",
    title: "Dedicated Kitchen View",
    description: "A separate, clear kitchen screen displays active tickets and lets cooks mark food ready in one tap.",
    status: "live"
  },
  {
    id: "double-alert",
    title: "Double Alert on New Orders",
    description: "A clear double pulse notifies the manager immediately when a new ticket arrives.",
    status: "live"
  },
  {
    id: "revenue-view",
    title: "Daily Revenue Summary",
    description: "Track completed orders, daily takings, and export sales records without complex spreadsheets.",
    status: "live"
  },
  {
    id: "block-number",
    title: "Block Malicious Numbers",
    description: "Instantly block abusive or prank numbers from placing future orders through WhatsApp.",
    status: "live"
  },
  {
    id: "item-unavailable",
    title: "Mark Items Sold Out",
    description: "Mark any dish or drink unavailable in one tap to prevent orders for items that ran out.",
    status: "live"
  },
  {
    id: "maintenance-mode",
    title: "Polite Maintenance Mode",
    description: "Pause incoming orders gracefully during kitchen rushes with a polite custom pause message.",
    status: "live"
  },
  {
    id: "order-numbers",
    title: "Sequential Order Numbers",
    description: "Every order receives a clean sequential reference like OR-1001 so busy counters run smoothly.",
    status: "live"
  },
  {
    id: "zero-commission",
    title: "Zero Order Commission",
    description: "Keep 100 percent of your direct customer revenue without percentage cuts or hidden fees.",
    status: "live"
  },
  {
    id: "feedback-request",
    title: "Automated Feedback Request",
    description: "Sends a polite satisfaction check 10 minutes after pickup to collect customer ratings.",
    status: "planned" // Planned feature
  },
  {
    id: "multilingual-support",
    title: "Sinhala and Tamil Menu Options",
    description: "Native language menu categories and tap options alongside English for local customers.",
    status: "planned" // Planned feature
  }
];
