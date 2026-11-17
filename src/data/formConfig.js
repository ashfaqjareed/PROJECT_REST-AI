// Google Form submission configuration and mapping for 14 onboarding steps
// Paste full pre-filled link when available. Until then, fallback to direct form and WhatsApp.

// FORM LINK: [PASTE LINK HERE]
// FOUNDER TO CONFIRM: paste the pre-filled Google Form link here when ready.
export const PASTED_GOOGLE_FORM_LINK = null;

export const FALLBACK_GOOGLE_FORM_URL = "https://forms.gle/3M1nWcrCstnnkMfF7";

export const sriLankanMobileRegex = /^(?:0|94|\+94)?7\d{8}$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Parses a Google Form pre-filled link into a submission URL and parameter map
 */
export function parseGoogleFormUrl(fullUrl) {
  if (!fullUrl) return null;
  try {
    const url = new URL(fullUrl);
    const actionUrl = fullUrl.split("?")[0].replace(/\/viewform$/, "/formResponse");
    const params = new URLSearchParams(url.search);
    const entries = [];
    for (const [key] of params.entries()) {
      if (key.startsWith("entry.")) {
        entries.push(key);
      }
    }
    return {
      actionUrl,
      entries
    };
  } catch {
    return null;
  }
}

// Default entry keys mapped to the 14 onboarding steps
export const formFieldMapping = {
  ownerName: "entry.1000001", // FOUNDER TO CONFIRM
  email: "entry.1000002",     // FOUNDER TO CONFIRM
  city: "entry.1000003",      // FOUNDER TO CONFIRM
  whatsapp: "entry.1000004",  // FOUNDER TO CONFIRM
  businessName: "entry.1000005", // FOUNDER TO CONFIRM
  businessType: "entry.1000006", // FOUNDER TO CONFIRM
  currentOrderFlow: "entry.1000007", // FOUNDER TO CONFIRM
  menuSize: "entry.1000008",  // FOUNDER TO CONFIRM
  separateNumber: "entry.1000009", // FOUNDER TO CONFIRM
  busiestTime: "entry.1000010", // FOUNDER TO CONFIRM
  dashboardDevices: "entry.1000011", // FOUNDER TO CONFIRM
  branches: "entry.1000012",  // FOUNDER TO CONFIRM
  planInterest: "entry.1000013", // FOUNDER TO CONFIRM
  startDate: "entry.1000014", // FOUNDER TO CONFIRM
  contactMethod: "entry.1000015", // FOUNDER TO CONFIRM
  bestTime: "entry.1000016",  // FOUNDER TO CONFIRM
  notes: "entry.1000017"      // FOUNDER TO CONFIRM
};
