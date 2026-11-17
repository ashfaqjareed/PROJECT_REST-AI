// Sector configurations and content
// Status: "Live First" for food venues, "Coming Next" for retail and flower boutiques

export const sectors = [
  {
    slug: "restaurants",
    name: "Restaurants",
    status: "Live First",
    headline: "Cut the front desk rush. Keep every order in sync with the kitchen.",
    problems: [
      "Guests queue or crowd the host station just to place takeaway and dine-in orders.",
      "Floor staff shout orders across noisy kitchens, leading to costly food errors.",
      "Constant phone calls for takeaway orders interrupt counter staff during peak rush.",
      "Pickup mix-ups happen when names sound similar across crowded dining rooms.",
      "A popular dish runs out in the kitchen and the counter keeps taking orders for it."
    ],
    sixMoves: [
      { step: "01", title: "Customer Taps", desc: "Customer scans table QR or messages your WhatsApp to tap through the food menu." },
      { step: "02", title: "Ticket Lands", desc: "Order appears instantly on the manager screen with clear table or takeaway tags." },
      { step: "03", title: "Kitchen Sync", desc: "One tap transfers the ticket directly to the chef's kitchen display." },
      { step: "04", title: "Cooks Prepare", desc: "Cooks mark tickets ready as soon as the plate is hot." },
      { step: "05", title: "PIN Sent", desc: "Customer receives a WhatsApp ready ping with a 4 digit pickup PIN." },
      { step: "06", title: "Clean Handover", desc: "Food is handed over only when the customer shows their matching PIN." }
    ],
    estimatorPreset: {
      ordersPerDay: 80,
      avgBill: 2200,
      lostCustomersPerDay: 10,
      recoveredPerDay: 6,
      daysOpen: 30,
      planId: "growth"
    },
    planFit: "Growth",
    faq: [
      {
        question: "Can we use Ordera for both dine-in and takeaway?",
        answer: "Yes. Customers can select dine-in with their table number or takeaway directly in the WhatsApp menu tap flow."
      },
      {
        question: "How do we stop orders when the kitchen is overwhelmed?",
        answer: "Turn on maintenance mode from your manager dashboard with one tap. Incoming customers are politely informed ordering is temporarily paused."
      },
      {
        question: "What happens if a popular curry or meat dish runs out?",
        answer: "Mark the item unavailable in your dashboard. It disappears immediately from customer view so no one can order it."
      }
    ]
  },
  {
    slug: "cafes",
    name: "Cafes",
    status: "Live First",
    headline: "Skip the counter queue. Fresh coffee and brunch ready when they walk in.",
    problems: [
      "Morning rush creates long queues out the door between 8AM and 10AM.",
      "Regulars wait 15 minutes in line just to place their everyday coffee order.",
      "Crowds block the pickup counter, making it hard to hear names called over espresso steam.",
      "Specialty drinks or oat milk run out mid-morning and orders have to be refunded.",
      "Baristas get interrupted by phone calls while pulling shots."
    ],
    sixMoves: [
      { step: "01", title: "Customer Taps", desc: "Office workers order coffee and breakfast from their desk before leaving." },
      { step: "02", title: "Ticket Lands", desc: "Barista screen shows the drink queue in clean chronological sequence." },
      { step: "03", title: "Barista Accepts", desc: "Drink marked accepted and queued for brewing." },
      { step: "04", title: "Brew & Plate", desc: "Barista pulls shots and marks the order ready in one tap." },
      { step: "05", title: "PIN Generated", desc: "Customer gets WhatsApp notification as they walk through the door." },
      { step: "06", title: "Grab & Go", desc: "PIN confirmed at counter and coffee handed over in seconds." }
    ],
    estimatorPreset: {
      ordersPerDay: 120,
      avgBill: 1200,
      lostCustomersPerDay: 18,
      recoveredPerDay: 11,
      daysOpen: 28,
      planId: "growth"
    },
    planFit: "Growth",
    faq: [
      {
        question: "Can customers specify milk preferences or ice levels?",
        answer: "Yes. Items can have selectable tap options for dairy alternatives and beverage temperature."
      },
      {
        question: "How do regulars order quickly each morning?",
        answer: "WhatsApp remembers their interaction, and recent options appear at the top of their chat options."
      },
      {
        question: "Does the cafe need a tablet behind the counter?",
        answer: "Any tablet, laptop, or smartphone with a modern web browser can run the barista screen."
      }
    ]
  },
  {
    slug: "canteens",
    name: "University Canteens",
    status: "Live First",
    headline: "End the three-queue chain. Students get their lunch hour back.",
    problems: [
      "The triple queue chain: queue to order, queue for the cashier token, queue at food collection.",
      "Daily lunch packets and specials run out while students stand 20 minutes in line.",
      "Students only get a 45 to 60 minute break between lectures.",
      "Massive cash counter bottleneck creates arguments and delays.",
      "Hungry students skip lunch entirely because lines are too long."
    ],
    sixMoves: [
      { step: "01", title: "Order in Class", desc: "Students tap their rice and curry order 15 minutes before the lecture ends." },
      { step: "02", title: "Canteen Screen", desc: "Canteen staff see lunch packets required for the upcoming break." },
      { step: "03", title: "Portion & Pack", desc: "Staff pack the food and set it on the collection rack." },
      { step: "04", title: "Mark Ready", desc: "Staff tap ready on the screen." },
      { step: "05", title: "PIN Sent", desc: "Student receives 4 digit pickup PIN on WhatsApp." },
      { step: "06", title: "Walk In & Eat", desc: "Student shows PIN at pickup window, pays, and sits down immediately." }
    ],
    estimatorPreset: {
      ordersPerDay: 250,
      avgBill: 600,
      lostCustomersPerDay: 40,
      recoveredPerDay: 28,
      daysOpen: 24,
      planId: "scale"
    },
    planFit: "Scale",
    faq: [
      {
        question: "What if rice packets sell out during midday rush?",
        answer: "The canteen manager marks that specific packet sold out in one tap, so no further orders can be accepted."
      },
      {
        question: "How do students pay at pickup?",
        answer: "Students pay cash or LankaQR directly at the pickup window when showing their 4 digit PIN."
      },
      {
        question: "Can multiple food counters run on one account?",
        answer: "Yes. The Scale plan supports multiple logins for short-eats, juice, and main lunch counters."
      }
    ]
  },
  {
    slug: "bakeries",
    name: "Bakeries",
    status: "Live First",
    headline: "Reserve fresh bread and evening pastries before the display case empties.",
    problems: [
      "Popular breads, buns, and savouries sell out before commuters finish work.",
      "Evening rush creates counter crowds where orders are scribbled on paper napkins.",
      "Confusion over custom requests and pack quantities.",
      "Customers leave empty-handed when their favourite item ran out ten minutes earlier.",
      "Custom cake inquiries get mixed with ordinary counter orders."
    ],
    sixMoves: [
      { step: "01", title: "Reserve by Day", desc: "Customers reserve bread and savouries from office or home." },
      { step: "02", title: "Baker Prepares", desc: "Bakery counter packs the reserved items into named takeaway bags." },
      { step: "03", title: "Set Aside", desc: "Bags placed on the pickup counter shelf with order number OR-XXXX." },
      { step: "04", title: "Mark Ready", desc: "Staff tap ready once the items are bagged." },
      { step: "05", title: "PIN Delivered", desc: "WhatsApp sends customer their pickup PIN." },
      { step: "06", title: "Fast Pickup", desc: "Customer drops by during commute, shows PIN, and collects." }
    ],
    estimatorPreset: {
      ordersPerDay: 90,
      avgBill: 950,
      lostCustomersPerDay: 15,
      recoveredPerDay: 9,
      daysOpen: 30,
      planId: "starter"
    },
    planFit: "Starter",
    faq: [
      {
        question: "Can customers order specialty cakes through Ordera?",
        answer: "Standard catalog items and baked goods are live today. Multi-tier custom cake orders with custom messages are Planned."
      },
      {
        question: "Can we set cut-off times for fresh bread batches?",
        answer: "Yes. Category schedules allow you to show evening loaves only when they come out of the oven."
      },
      {
        question: "Can we block customers who never collect their reservations?",
        answer: "Yes. The manager dashboard includes a one-tap number block for persistent non-collectors."
      }
    ]
  },
  {
    slug: "flower-boutiques",
    name: "Flower Boutiques",
    status: "Coming Next",
    headline: "Organise bouquet orders. No missed messages on Valentine's or Mother's Day.",
    problems: [
      "Same-day bouquet orders get buried beneath hundreds of casual WhatsApp chat inquiries.",
      "Missed messages during peak celebration days like Valentine's and graduation weeks.",
      "Pickup mix-ups between similar rose arrangements.",
      "Confusion over delivery addresses versus counter pickup requests.",
      "Staff spend hours typing prices and sending photos repeatedly."
    ],
    sixMoves: [
      { step: "01", title: "Catalog Tap", desc: "Customer views bouquet catalog with fixed prices and photos on WhatsApp (Planned)." },
      { step: "02", title: "Pickup Slot", desc: "Customer chooses collection time and date slot (Planned)." },
      { step: "03", title: "Florist Crafting", desc: "Florist screen displays upcoming floral arrangements." },
      { step: "04", title: "Arrangement Ready", desc: "Florist tags the bouquet ready with photo confirmation." },
      { step: "05", title: "Pickup PIN", desc: "Customer receives PIN and collection reminder." },
      { step: "06", title: "Bouquet Handover", desc: "Customer verifies PIN and collects their fresh arrangement." }
    ],
    estimatorPreset: {
      ordersPerDay: 35,
      avgBill: 4500,
      lostCustomersPerDay: 8,
      recoveredPerDay: 5,
      daysOpen: 26,
      planId: "starter"
    },
    planFit: "Starter",
    faq: [
      {
        question: "Is the flower boutique module live today?",
        answer: "Flower boutique support is tagged Coming Next. We are currently accepting early registration for boutique owners."
      },
      {
        question: "Will it support custom card messages with bouquets?",
        answer: "Yes. The planned release includes dedicated note fields for gift tags and message cards."
      },
      {
        question: "How do I join the early testing group?",
        answer: "Tap Join The Early List to register your flower shop details."
      }
    ]
  },
  {
    slug: "boutiques",
    name: "Boutiques",
    status: "Coming Next",
    headline: "Turn 'is this available' chats into confirmed counter reservations.",
    problems: [
      "Staff waste time answering repetitive 'what sizes are in stock' questions in WhatsApp DMs.",
      "Items held informally on chat result in lost sales when customers never show up.",
      "Stock questions get buried across personal staff phone numbers.",
      "Customers travel across Colombo only to find their size was sold an hour ago.",
      "No clean way to hold a garment for same-day counter trial."
    ],
    sixMoves: [
      { step: "01", title: "Item Selection", desc: "Customer views ready-to-wear items and sizes in the WhatsApp catalog (Planned)." },
      { step: "02", title: "Hold Request", desc: "Customer requests a 4-hour hold for in-store fitting." },
      { step: "03", title: "Staff Confirms", desc: "Boutique attendant pulls the garment from the rack." },
      { step: "04", title: "Held at Counter", desc: "Item marked held in the boutique dashboard." },
      { step: "05", title: "PIN Sent", desc: "Customer receives hold PIN valid until the time limit." },
      { step: "06", title: "Fitting & Sale", desc: "Customer arrives, provides PIN, tries on the garment, and pays." }
    ],
    estimatorPreset: {
      ordersPerDay: 25,
      avgBill: 6500,
      lostCustomersPerDay: 6,
      recoveredPerDay: 4,
      daysOpen: 26,
      planId: "starter"
    },
    planFit: "Starter",
    faq: [
      {
        question: "Is boutique reserve-for-pickup live today?",
        answer: "This is tagged Coming Next. Our core platform focuses on food counters first; retail reservations are scheduled for subsequent rollout."
      },
      {
        question: "How long can an item be held?",
        answer: "The planned feature allows the boutique to configure automatic hold expiration (e.g. 2 to 4 hours)."
      },
      {
        question: "Can we join the pilot program?",
        answer: "Yes. Tap Join The Early List and specify your retail boutique details."
      }
    ]
  }
];
