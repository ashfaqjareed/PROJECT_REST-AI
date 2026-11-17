// Comprehensive knowledge base for the Ordera Assistant and FAQ components
// All operational statements strictly align with verified platform capabilities
// Flag uncertain items with FOUNDER TO CONFIRM comments

export const knowledgeEntries = [
  {
    id: "how-does-it-work",
    topic: "how it works",
    questions: [
      "How does it work?",
      "How does Ordera work?",
      "Explain the ordering process",
      "What is the workflow?"
    ],
    keywords: ["how", "work", "process", "workflow", "order", "flow", "steps", "system"],
    answer: "Customers message your WhatsApp number and tap their order from your menu. Your manager accepts the order and sends it to the kitchen display. The cook marks it ready, and the customer receives a ready notification with a 4 digit pickup PIN to collect their food.",
    related: ["do-customers-install-an-app", "who-sees-the-pin", "how-do-customers-pay"]
  },
  {
    id: "do-customers-install-an-app",
    topic: "app installation",
    questions: [
      "Do customers install an app?",
      "Do I need to download an app?",
      "Is there an Android or iOS app for customers?",
      "Do guests have to install anything?"
    ],
    keywords: ["app", "install", "download", "playstore", "appstore", "application"],
    answer: "No. Customers only use WhatsApp, which they already have installed on their phone. There is zero app download for your customers.",
    related: ["how-does-it-work", "why-order-if-i-still-walk-in"]
  },
  {
    id: "how-do-customers-pay",
    topic: "payment",
    questions: [
      "How do customers pay?",
      "Can customers pay online?",
      "What payment methods are supported at counter?"
    ],
    keywords: ["pay", "payment", "cash", "card", "settlement", "lankaqr", "money"],
    answer: "Customers pay at pickup, in person at your counter using cash, card, or your local LankaQR payment method when showing their 4 digit PIN.",
    related: ["is-there-commission", "how-does-it-work"]
  },
  {
    id: "is-there-commission",
    topic: "commission",
    questions: [
      "Is there commission?",
      "Do you take a percentage of our food sales?",
      "What is the commission per order?",
      "Are there transaction fees on orders?"
    ],
    keywords: ["commission", "percentage", "cut", "fee", "per order", "charge", "sales"],
    answer: "No commission on orders. You keep 100 percent of your customer revenue. You pay only a predictable flat monthly subscription.",
    related: ["what-does-it-cost", "who-pays-whatsapp-message-fees"]
  },
  {
    id: "why-order-if-i-still-walk-in",
    topic: "value proposition",
    questions: [
      "Why order if I still walk in?",
      "Why not just order at the counter?",
      "What is the point of ordering ahead if I have to collect?"
    ],
    keywords: ["why", "walk in", "queue", "wait", "benefit", "canteen", "time"],
    answer: "You order from your seat, class, or desk, skip the ordering queue and the bill queue, and walk in when the food is ready. The food is set aside for you, so popular dishes never run out while you stand in line.",
    related: ["how-does-it-work", "canteens"]
  },
  {
    id: "who-sees-the-pin",
    topic: "pickup pin security",
    questions: [
      "Who sees the PIN?",
      "Can the manager see the PIN before pickup?",
      "How does the PIN handover prevent errors?"
    ],
    keywords: ["pin", "code", "pickup pin", "handover", "security", "four digit", "secret"],
    answer: "Only the customer sees the random 4 digit PIN on their WhatsApp screen. The manager never sees it until the customer shows it at the counter. The manager enters it into the dashboard to verify and hand over the food.",
    related: ["fake-or-prank-orders", "how-does-it-work"]
  },
  {
    id: "fake-or-prank-orders",
    topic: "prank prevention",
    questions: [
      "What about fake or prank orders?",
      "Can rivals spam fake orders?",
      "How do we prevent prank orders?"
    ],
    keywords: ["fake", "prank", "spam", "rival", "troll", "abuse", "block"],
    answer: "Only the manager sees incoming orders and sends them to the kitchen, so unverified tickets never reach the cooks. The manager can also block abusive phone numbers permanently in one tap.",
    related: ["can-we-block-a-number", "who-sees-the-pin"]
  },
  {
    id: "internet-or-power-drops",
    topic: "connectivity issues",
    questions: [
      "What happens if internet or power drops?",
      "What if Wi-Fi cuts out at the counter?",
      "Does Ordera work when offline?"
    ],
    keywords: ["internet", "wifi", "power", "offline", "disconnect", "electricity", "drops"],
    answer: "Orders pause until connection returns. During an outage, customers place orders directly at the counter as usual. Once reconnected, pending orders appear on your dashboard.",
    related: ["can-we-pause-orders"]
  },
  {
    id: "late-or-no-show-customers",
    topic: "unclaimed food",
    questions: [
      "What if a customer is late or never shows up?",
      "How do we handle uncollected food orders?",
      "Do we get penalized for no-show orders?"
    ],
    keywords: ["late", "no show", "uncollected", "abandoned", "not picking up"],
    answer: "You agree on a pickup policy at setup (e.g. food held for 20 minutes). If a customer repeatedly fails to collect, you can block their number from future ordering. (FOUNDER TO CONFIRM).",
    related: ["fake-or-prank-orders"]
  },
  {
    id: "do-you-replace-our-pos",
    topic: "pos integration",
    questions: [
      "Do you replace our POS system?",
      "Does Ordera integrate with our existing billing machine?",
      "Do we have to throw away our cash register?"
    ],
    keywords: ["pos", "billing system", "cash register", "replace", "integration"],
    answer: "No, Ordera does not replace your POS. It sits in front of it as your digital ordering desk. Direct automated POS integration is Planned for our Enterprise tier in 2027.",
    related: ["what-is-enterprise", "how-do-customers-pay"]
  },
  {
    id: "how-long-is-setup",
    topic: "setup duration",
    questions: [
      "How long is setup?",
      "How many days to launch?",
      "How quickly can we go live?"
    ],
    keywords: ["setup", "how long", "time", "days", "onboarding", "launch", "go live"],
    answer: "Setup takes approximately 2 working days. We configure your menu, link your WhatsApp number, set up your dashboard, and run test orders with you before opening to customers. (FOUNDER TO CONFIRM).",
    related: ["what-does-it-cost", "how-do-i-start"]
  },
  {
    id: "what-does-it-cost",
    topic: "pricing",
    questions: [
      "What does it cost?",
      "What are your prices?",
      "How much is the monthly fee?",
      "Tell me about the pricing plans"
    ],
    keywords: ["cost", "price", "plans", "pricing", "fee", "how much", "rate", "starter", "growth", "scale"],
    answer: "Starter is Rs. 15,000 setup then Rs. 3,500/month. Growth is Rs. 30,000 setup then Rs. 8,000/month for busy kitchens. Scale is Rs. 55,000 setup then Rs. 16,000/month for multi-outlet groups. (FOUNDER TO CONFIRM).",
    related: ["who-pays-whatsapp-message-fees", "is-there-commission"]
  },
  {
    id: "who-pays-whatsapp-message-fees",
    topic: "meta fees",
    questions: [
      "Who pays WhatsApp message fees?",
      "Are there charges from Meta?",
      "How much does WhatsApp charge per order?"
    ],
    keywords: ["meta", "whatsapp fees", "message fees", "charges", "conversation cost"],
    answer: "Meta bills message conversation fees directly to the restaurant's own WhatsApp Business account. Meta includes 1,000 free service conversations per month. Beyond that, the rate for Sri Lanka is about $0.0020 per message (roughly Rs. 7 per complete order). (FOUNDER TO CONFIRM).",
    related: ["what-does-it-cost", "is-there-commission"]
  },
  {
    id: "does-the-restaurant-need-a-separate-number",
    topic: "phone number requirement",
    questions: [
      "Does the restaurant need a separate number?",
      "Can I use my personal WhatsApp number?",
      "Do I need a new SIM card?"
    ],
    keywords: ["separate number", "sim card", "phone number", "personal whatsapp", "whatsapp business"],
    answer: "We recommend a dedicated SIM card and phone number for the restaurant counter so customer orders do not mix with personal family chats. (FOUNDER TO CONFIRM).",
    related: ["how-does-it-work", "how-long-is-setup"]
  },
  {
    id: "can-we-pause-orders",
    topic: "maintenance mode",
    questions: [
      "Can we pause orders during a heavy rush?",
      "Can we stop taking orders temporarily?",
      "Is there a pause button?"
    ],
    keywords: ["pause", "stop", "maintenance", "rush", "overwhelmed", "busy"],
    answer: "Yes. Maintenance mode pauses incoming orders with one tap on your manager dashboard. The bot politely tells customers that ordering is temporarily paused.",
    related: ["can-we-mark-items-sold-out"]
  },
  {
    id: "can-we-mark-items-sold-out",
    topic: "item availability",
    questions: [
      "Can we mark items sold out?",
      "What if a curry or drink runs out?",
      "How do we disable unavailable items?"
    ],
    keywords: ["sold out", "unavailable", "ran out", "out of stock", "disable item"],
    answer: "Yes. Any menu item can be marked unavailable in one tap from your dashboard. It immediately disappears from customer selection.",
    related: ["can-we-pause-orders", "can-we-edit-the-menu"]
  },
  {
    id: "can-we-edit-the-menu",
    topic: "menu editing",
    questions: [
      "Can we edit the menu ourselves?",
      "How do we update prices?",
      "How do menu changes work?"
    ],
    keywords: ["edit menu", "update prices", "change menu", "add dishes"],
    answer: "Item availability can be toggled instantly. Price updates and new item additions are submitted to our support team on WhatsApp and updated for you as part of your monthly plan. (FOUNDER TO CONFIRM).",
    related: ["what-does-it-cost", "support"]
  },
  {
    id: "languages",
    topic: "supported languages",
    questions: [
      "Which languages are supported?",
      "Can customers order in Sinhala?",
      "Is Tamil supported?"
    ],
    keywords: ["language", "sinhala", "tamil", "english", "multilingual"],
    answer: "English is live today. Sinhala and Tamil options are in active development and tagged Planned.",
    related: ["how-does-it-work"]
  },
  {
    id: "is-it-ai",
    topic: "architecture",
    questions: [
      "Is it AI?",
      "Is Ordera an AI chatbot?",
      "Does it use natural language processing?"
    ],
    keywords: ["ai", "chatbot", "chatgpt", "nlp", "robot"],
    answer: "No, every step is a tap. Ordera is a button-driven ordering desk. There is no guessing what the customer typed, so orders arrive clean and accurate every single time.",
    related: ["how-does-it-work"]
  },
  {
    id: "who-owns-customer-numbers",
    topic: "data privacy",
    questions: [
      "Who owns customer numbers?",
      "Do you sell our customer data?",
      "Is our customer list private?"
    ],
    keywords: ["privacy", "data", "customer numbers", "who owns", "database"],
    answer: "The restaurant owns all customer numbers and order history. Ordera never sells, markets to, or shares your customer data with third parties.",
    related: ["is-there-commission"]
  },
  {
    id: "support",
    topic: "customer support",
    questions: [
      "What kind of support is provided?",
      "How do we contact you if there is an issue?",
      "What are your support hours?"
    ],
    keywords: ["support", "help", "hours", "contact", "whatsapp support", "issue"],
    answer: "Support is handled directly on WhatsApp during regular working hours (8:30 AM to 6:30 PM, Monday to Saturday). Priority support is included on Growth and Scale plans. (FOUNDER TO CONFIRM).",
    related: ["what-does-it-cost"]
  },
  {
    id: "is-there-a-contract-or-lock-in",
    topic: "contract commitment",
    questions: [
      "Is there a contract or lock-in?",
      "Are we tied to a 12 month contract?",
      "Can we cancel anytime?"
    ],
    keywords: ["contract", "lock in", "commitment", "cancel", "term", "month to month"],
    answer: "No long-term lock-in. All plans operate on a month to month agreement. You can stop anytime before your next billing cycle begins with zero penalty. (FOUNDER TO CONFIRM).",
    related: ["what-does-it-cost"]
  },
  {
    id: "can-i-try-it-first",
    topic: "trials",
    questions: [
      "Can I try it first?",
      "Is there a trial period?",
      "Can we test it before paying setup?"
    ],
    keywords: ["try", "trial", "test", "demo", "free trial"],
    answer: "You can explore the interactive order simulator on our website anytime. Live restaurant pilot runs are arranged with our onboarding team on WhatsApp. (FOUNDER TO CONFIRM).",
    related: ["how-does-it-work", "how-do-i-start"]
  },
  {
    id: "which-businesses-is-it-for",
    topic: "target sectors",
    questions: [
      "Which businesses is it for?",
      "Can bakeries or flower shops use Ordera?",
      "Who can use this platform?"
    ],
    keywords: ["sectors", "restaurants", "cafes", "canteens", "bakeries", "flower shops", "boutiques"],
    answer: "Ordera is built for restaurants, cafes, and university canteens first, with bakeries right beside them. Flower boutiques and retail clothing boutiques are coming next.",
    related: ["what-is-enterprise"]
  },
  {
    id: "what-is-enterprise",
    topic: "enterprise tier",
    questions: [
      "What is Enterprise?",
      "When is Enterprise launching?",
      "What features are in the Enterprise tier?"
    ],
    keywords: ["enterprise", "2027", "chains", "franchise", "multi outlet"],
    answer: "Our Enterprise tier is coming in 2027. Planned capabilities include direct POS integration, delivery partner coordination, consolidated multi-outlet reporting, and custom operational workflows.",
    related: ["do-you-replace-our-pos", "what-does-it-cost"]
  },
  {
    id: "who-made-it",
    topic: "founder and studio",
    questions: [
      "Who made Ordera?",
      "Where is Ordera based?",
      "Who built this system?"
    ],
    keywords: ["who made", "founder", "northstar", "colombo", "sri lanka", "company"],
    answer: "Ordera is a product of Sri Lanka, made by NorthStar Devs in Colombo.",
    related: ["how-does-it-work"]
  },
  {
    id: "how-do-customers-find-us",
    topic: "customer acquisition",
    questions: [
      "How do customers find our WhatsApp ordering link?",
      "How do guests start ordering?",
      "Do we get QR codes?"
    ],
    keywords: ["qr code", "find us", "poster", "table stickers", "link", "flyer"],
    answer: "We design custom printable QR posters and table stickers for your restaurant. Customers scan the QR code with their phone camera to open your WhatsApp order desk immediately.",
    related: ["what-does-it-cost", "how-does-it-work"]
  },
  {
    id: "can-i-see-it-working",
    topic: "demonstration",
    questions: [
      "Can I see it working?",
      "Where can I test the demo?",
      "Show me a live demonstration"
    ],
    keywords: ["demo", "see it working", "test order", "simulator", "video"],
    answer: "You can try an order right now using the live order simulator on our Home page or How It Works page. Nothing is sent, and no account is needed.",
    related: ["how-does-it-work"]
  },
  {
    id: "how-do-i-start",
    topic: "getting started",
    questions: [
      "How do I start?",
      "How do I sign up?",
      "What are the next steps to onboard?"
    ],
    keywords: ["start", "sign up", "onboard", "register", "join", "begin"],
    answer: "Tap Get Started at the top of the page to fill out our quick 14-question onboarding flow, or message us directly on WhatsApp at 076 832 5949.",
    related: ["how-long-is-setup", "what-does-it-cost"]
  }
];
