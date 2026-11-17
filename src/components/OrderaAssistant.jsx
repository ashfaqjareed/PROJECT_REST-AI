import React, { useState, useEffect, useRef } from "react";
import { knowledgeEntries } from "../data/knowledge";
import { siteConfig } from "../data/site";
import { ChatIcon, CloseIcon, RefreshIcon } from "./Icons";

// Stopwords
const STOPWORDS = new Set([
  "a", "about", "above", "after", "again", "all", "am", "an", "and", "any", "are",
  "as", "at", "be", "because", "been", "before", "being", "below", "between", "both",
  "but", "by", "can", "did", "do", "does", "doing", "don", "down", "during", "each",
  "few", "for", "from", "further", "had", "has", "have", "having", "he", "her", "here",
  "hers", "herself", "him", "himself", "his", "how", "i", "if", "in", "into", "is",
  "it", "its", "itself", "just", "me", "more", "most", "my", "myself", "no", "nor",
  "not", "now", "of", "off", "on", "once", "only", "or", "other", "our", "ours",
  "ourselves", "out", "over", "own", "s", "same", "she", "should", "so", "some",
  "such", "t", "than", "that", "the", "their", "theirs", "them", "themselves", "then",
  "there", "these", "they", "this", "those", "through", "to", "too", "under", "until",
  "up", "very", "was", "we", "were", "what", "when", "where", "which", "while", "who",
  "whom", "why", "will", "with", "you", "your", "yours", "yourself", "yourselves"
]);

// Synonyms map
const SYNONYMS = {
  cost: ["cost", "price", "fee", "charge", "rate", "money", "how much", "tier", "plans"],
  price: ["cost", "price", "fee", "charge", "rate", "money", "how much"],
  fee: ["cost", "price", "fee", "charge", "rate", "money"],
  charge: ["cost", "price", "fee", "charge", "rate", "money"],
  queue: ["queue", "line", "wait", "crowd", "standing", "counter line"],
  wait: ["queue", "line", "wait", "standing"],
  pin: ["pin", "code", "otp", "secret", "pickup pin", "number"],
  code: ["pin", "code", "otp", "number"],
  app: ["app", "install", "download", "application", "software"],
  install: ["app", "install", "download"],
  download: ["app", "install", "download"],
  pos: ["pos", "billing system", "cash register", "billing machine"],
  fake: ["fake", "prank", "rival", "spam", "troll", "abuse"],
  prank: ["fake", "prank", "rival", "spam", "abuse"],
  setup: ["setup", "onboarding", "launch", "start", "time", "days"],
  hours: ["time", "hours", "response", "reply", "support"],
  canteen: ["canteen", "university", "campus", "students", "lunch break"],
  restaurant: ["restaurant", "dining", "table", "dine in", "takeaway"],
  cafe: ["cafe", "coffee", "latte", "barista"],
  bakery: ["bakery", "bread", "pastries", "buns", "cakes"],
  flowers: ["flower", "bouquet", "florist", "roses"],
  boutique: ["boutique", "clothing", "retail", "garments", "sizes"]
};

// Levenshtein distance for typo tolerance
function editDistance(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

function matchQuery(rawInput, lastTopic) {
  const clean = rawInput.toLowerCase().replace(/[^\w\s]/g, " ").trim();
  const rawTokens = clean.split(/\s+/).filter(Boolean);
  const queryTokens = rawTokens.filter(t => !STOPWORDS.has(t) || t === "cost" || t === "app" || t === "pin");

  // Expand with synonyms
  const expanded = new Set(queryTokens);
  queryTokens.forEach(t => {
    if (SYNONYMS[t]) {
      SYNONYMS[t].forEach(s => expanded.add(s));
    }
  });

  // Score each entry
  const scored = knowledgeEntries.map((entry) => {
    let score = 0;
    const entryText = `${entry.topic} ${entry.questions.join(" ")} ${entry.keywords.join(" ")}`.toLowerCase();
    const entryTokens = entryText.split(/\s+/).filter(Boolean);

    // Direct token overlap
    expanded.forEach(token => {
      if (entry.keywords.includes(token)) score += 3;
      if (entry.topic.includes(token)) score += 2.5;
      if (entryTokens.includes(token)) score += 1.5;

      // Typo tolerance (edit distance <= 1 for tokens > 4 chars)
      if (token.length > 4) {
        entryTokens.forEach(et => {
          if (et.length > 4 && editDistance(token, et) <= 1) {
            score += 1;
          }
        });
      }
    });

    // Topic memory boost: if follow-up refers to prior topic
    if (lastTopic && entry.topic === lastTopic) {
      score += 1.5;
    }

    return { entry, score };
  });

  scored.sort((a, b) => b.score - a.score);

  const best = scored[0];
  if (best && best.score >= 2.5) {
    return {
      matched: true,
      entry: best.entry,
      score: best.score,
      relatedEntries: (best.entry.related || [])
        .map(rid => knowledgeEntries.find(k => k.id === rid))
        .filter(Boolean)
        .slice(0, 3)
    };
  }

  // Low confidence fallback
  return {
    matched: false,
    closestQuestions: scored.slice(0, 3).map(s => s.entry.questions[0])
  };
}

const INITIAL_CHIPS = [
  "How Does It Work",
  "What Does It Cost",
  "Do Customers Install An App",
  "How Do Customers Pay",
  "How Long Is Setup",
  "Is There Commission"
];

export function OrderaAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [lastTopic, setLastTopic] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          sender: "bot",
          text: "Hello. I am the Ordera Assistant. I answer questions directly from our documented FAQ.",
          chips: INITIAL_CHIPS
        }
      ]);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // ESC to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSend = (text) => {
    const query = (text || inputVal).trim();
    if (!query) return;

    // Add user message
    const userMsgId = Date.now();
    setMessages(prev => [...prev, { id: userMsgId, sender: "user", text: query }]);
    setInputVal("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const result = matchQuery(query, lastTopic);

      if (result.matched) {
        setLastTopic(result.entry.topic);
        const relatedChips = result.relatedEntries.map(e => e.questions[0]);
        setMessages(prev => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: "bot",
            text: result.entry.answer,
            chips: relatedChips
          }
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: "bot",
            text: "I do not have a written answer for that. You can ask our team directly on WhatsApp or select one of the closest questions below.",
            chips: result.closestQuestions,
            fallbackQuery: query
          }
        ]);
      }
    }, 400);
  };

  const handleReset = () => {
    setMessages([
      {
        id: Date.now(),
        sender: "bot",
        text: "Conversation reset. How can I help you?",
        chips: INITIAL_CHIPS
      }
    ]);
    setLastTopic(null);
  };

  return (
    <>
      {/* Floating launcher key */}
      <button
        type="button"
        className="assistant-launcher-btn font-mono"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Ask Ordera Assistant"
        aria-expanded={isOpen}
      >
        <span className="launcher-led" aria-hidden="true" />
        <ChatIcon size={16} />
        <span className="launcher-text">ASK ORDERA</span>
      </button>

      {/* Slide-in Dark Panel */}
      {isOpen && (
        <div
          className="night-assistant-panel chamfer-card"
          role="dialog"
          aria-label="Ordera Assistant"
          aria-modal="true"
        >
          {/* Header */}
          <div className="assistant-header">
            <div className="assistant-title-group">
              <span className="assistant-name font-display">ORDERA ASSISTANT</span>
              <span className="assistant-sub font-mono">Answers From Our FAQ</span>
            </div>
            <div className="assistant-header-actions">
              <button
                type="button"
                onClick={handleReset}
                className="assistant-icon-btn font-mono"
                aria-label="Reset conversation"
                title="Reset conversation"
              >
                <RefreshIcon size={14} />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="assistant-icon-btn"
                aria-label="Close assistant"
              >
                <CloseIcon size={16} />
              </button>
            </div>
          </div>

          {/* Conversation history */}
          <div className="assistant-body" aria-live="polite">
            {messages.map((m) => (
              <div key={m.id} className={`assistant-bubble-row ${m.sender}`}>
                <div className={`assistant-bubble ${m.sender}`}>
                  <p className="assistant-bubble-text">{m.text}</p>

                  {/* Fallback WhatsApp button if low confidence */}
                  {m.fallbackQuery && (
                    <div style={{ marginTop: "0.75rem" }}>
                      <a
                        href={`https://wa.me/94768325949?text=${encodeURIComponent(`Hi Ordera, I have a question: ${m.fallbackQuery}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="assistant-wa-direct-btn font-mono"
                      >
                        Ask on WhatsApp →
                      </a>
                    </div>
                  )}

                  {/* Related suggestion chips */}
                  {m.chips && m.chips.length > 0 && (
                    <div className="assistant-chips-container">
                      {m.chips.map((chip, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className="assistant-chip font-mono"
                          onClick={() => handleSend(chip)}
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="assistant-bubble-row bot">
                <div className="assistant-bubble bot typing">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Input Composer */}
          <form
            className="assistant-footer-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask a question about Ordera..."
              className="assistant-input"
              aria-label="Ask a question"
            />
            <button
              type="submit"
              className="assistant-send-btn font-mono"
              disabled={!inputVal.trim()}
              aria-label="Send message"
            >
              SEND
            </button>
          </form>
        </div>
      )}
    </>
  );
}
