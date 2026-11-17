// Frequently Asked Questions
// Sourced directly from verified knowledge entries in knowledge.js

import { knowledgeEntries } from "./knowledge";

const generalIds = [
  "how-does-it-work",
  "do-customers-install-an-app",
  "how-do-customers-pay",
  "is-there-commission",
  "why-order-if-i-still-walk-in",
  "who-sees-the-pin",
  "fake-or-prank-orders",
  "internet-or-power-drops",
  "can-we-pause-orders",
  "languages"
];

const pricingIds = [
  "what-does-it-cost",
  "is-there-commission",
  "who-pays-whatsapp-message-fees",
  "is-there-a-contract-or-lock-in",
  "can-i-try-it-first",
  "how-do-customers-pay"
];

export const generalFaq = generalIds.map(id => {
  const item = knowledgeEntries.find(k => k.id === id);
  return {
    question: item.questions[0],
    answer: item.answer
  };
});

export const pricingFaq = pricingIds.map(id => {
  const item = knowledgeEntries.find(k => k.id === id);
  return {
    question: item.questions[0],
    answer: item.answer
  };
});
