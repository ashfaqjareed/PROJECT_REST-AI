import React, { useState, useEffect, useRef, useCallback } from "react";
import { sampleMenuCategories, sampleVenue } from "../data/sampleMenu";
import { FoodIcon, PlayIcon, PauseIcon, RefreshIcon } from "./Icons";

const STEPS = {
  WELCOME: "WELCOME",
  CATEGORIES: "CATEGORIES",
  ITEMS: "ITEMS",
  CART: "CART",
  CONFIRMED: "CONFIRMED",
  READY: "READY",
  DONE: "DONE"
};

function generatePin() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

// Quote-style bullet line: 2px lime bar on left with text beside it
function QuoteBullet({ children }) {
  return (
    <div className="quote-bullet-line">
      <span className="quote-lime-bar" aria-hidden="true" />
      <span className="quote-text">{children}</span>
    </div>
  );
}

function BottomSheet({ title, rows, onSelect, onClose, sending = false }) {
  return (
    <div className="night-sheet-overlay" role="dialog" aria-modal="true" aria-label={title}>
      <div className="night-bottom-sheet chamfer-card">
        <div className="sheet-header">
          <span className="sheet-title font-mono">{title}</span>
          <button type="button" onClick={onClose} className="sheet-close-x font-mono" aria-label="Close sheet">
            ✕
          </button>
        </div>

        <div className="sheet-list">
          {rows.map((row, i) => (
            <div
              key={i}
              className={`sheet-row-item ${row.disabled ? "disabled" : ""}`}
              role="button"
              tabIndex={row.disabled ? -1 : 0}
              aria-disabled={row.disabled}
              onClick={() => !row.disabled && onSelect(row)}
              onKeyDown={(e) => {
                if (!row.disabled && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  onSelect(row);
                }
              }}
            >
              {row.icon && (
                <div className="sheet-item-icon">
                  <FoodIcon type={row.icon} size={20} />
                </div>
              )}
              <span className="sheet-item-name">{row.label}</span>
              {row.price && !row.disabled && (
                <span className="sheet-item-price font-mono">{row.price}</span>
              )}
              {row.disabled && (
                <span className="sheet-unavailable-badge font-mono">Unavailable</span>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="sheet-cancel-btn font-mono"
        >
          {sending ? "SEND" : "CANCEL"}
        </button>
      </div>
    </div>
  );
}

export function OrderSimulator({ defaultMode = "manual" }) {
  const [mode, setMode] = useState(defaultMode); // "watch" or "manual"
  const [step, setStep] = useState(STEPS.WELCOME);
  const [chatMessages, setChatMessages] = useState([]);
  const [sheet, setSheet] = useState(null);
  const [cart, setCart] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [pin, setPin] = useState("7419");
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);
  const [dashStep, setDashStep] = useState("empty"); // "empty", "new", "accepted", "kitchen", "ready", "done"
  const [dashTab, setDashTab] = useState("orders");
  const [mobileTab, setMobileTab] = useState("customer");
  const [autoPlaying, setAutoPlaying] = useState(false);
  const [flashDouble, setFlashDouble] = useState(false);
  const [shakePin, setShakePin] = useState(false);
  const [handedOver, setHandedOver] = useState(false);
  const [autoStepIndex, setAutoStepIndex] = useState(0);

  const autoTimerRef = useRef(null);
  const chatEndRef = useRef(null);
  const containerRef = useRef(null);

  const orderNum = "OR-1001";
  const orderDate = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  const orderTime = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

  const totalAmount = cart.reduce((s, it) => s + it.price * it.qty, 0);
  const totalDisplay = `Rs. ${totalAmount.toLocaleString()}`;

  const addBotMsg = useCallback((content) => {
    setChatMessages((prev) => [...prev, { type: "bot", content, id: Date.now() + Math.random() }]);
  }, []);

  const addCustomerMsg = useCallback((text) => {
    setChatMessages((prev) => [...prev, { type: "customer", content: text, id: Date.now() + Math.random() }]);
  }, []);

  const scrollToEnd = () => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 40);
  };

  useEffect(() => {
    scrollToEnd();
  }, [chatMessages]);

  const showWelcome = useCallback(() => {
    setChatMessages([
      {
        type: "bot",
        id: 1,
        content: "welcome"
      }
    ]);
  }, []);

  const reset = useCallback(() => {
    setChatMessages([]);
    setStep(STEPS.WELCOME);
    setCart([]);
    setSheet(null);
    setCurrentCategory(null);
    setPin("7419");
    setPinInput("");
    setPinError(false);
    setDashStep("empty");
    setDashTab("orders");
    setAutoStepIndex(0);
    setHandedOver(false);
    setTimeout(() => showWelcome(), 100);
  }, [showWelcome]);

  useEffect(() => {
    showWelcome();
  }, [showWelcome]);

  // Autoplay script
  const autoSteps = [
    () => handleListSelect({ label: "Order Food" }),
    () => handleListSelect({ label: "Main Course", catId: "main-course" }),
    () => {
      const cat = sampleMenuCategories.find(c => c.id === "main-course");
      const item = cat?.items.find(it => it.available);
      if (item) handleItemSelect(item, "main-course");
    },
    () => handleReplyBtn({ label: "Confirm Order", action: "confirm" }),
    () => {
      setDashStep("new");
      setFlashDouble(true);
      setTimeout(() => setFlashDouble(false), 500);
    },
    () => setDashStep("accepted"),
    () => { setDashStep("kitchen"); setDashTab("kitchen"); },
    () => handleMarkReady(),
    () => {
      // Simulate counter typing correct PIN
      setPinInput(pin);
      setTimeout(() => {
        setHandedOver(true);
        setDashStep("done");
        addBotMsg({ type: "done" });
      }, 700);
    }
  ];

  useEffect(() => {
    if (!autoPlaying) {
      clearInterval(autoTimerRef.current);
      return;
    }

    autoTimerRef.current = setInterval(() => {
      setAutoStepIndex((prev) => {
        if (prev >= autoSteps.length) {
          setAutoPlaying(false);
          clearInterval(autoTimerRef.current);
          return prev;
        }
        try {
          autoSteps[prev]();
        } catch {
          // No-op
        }
        return prev + 1;
      });
    }, 1800);

    return () => clearInterval(autoTimerRef.current);
  }, [autoPlaying, pin]);

  function openMainMenu() {
    setSheet({
      title: "Select An Option",
      rows: [
        { label: "Order Food" },
        { label: "View Menu" },
        { label: "My Order Status" },
        { label: "Restaurant Info" },
        { label: "Help" }
      ],
      onSelect: handleListSelect,
      type: "main"
    });
  }

  function handleListSelect(row) {
    setSheet(null);
    if (row.label === "Order Food") {
      addCustomerMsg("Order Food");
      setStep(STEPS.CATEGORIES);
      setTimeout(() => {
        setSheet({
          title: "Browse Categories",
          rows: [
            ...sampleMenuCategories.map(c => ({ label: c.name, catId: c.id })),
            { label: "Back" },
            { label: "Main Menu" }
          ],
          onSelect: handleCategorySelect,
          type: "categories"
        });
      }, 300);
      addBotMsg("categories");
    } else {
      addCustomerMsg(row.label);
      addBotMsg(`Selected ${row.label}. Tap Order Food to place an order.`);
    }
  }

  function handleCategorySelect(row) {
    setSheet(null);
    if (row.label === "Back" || row.label === "Main Menu") {
      addCustomerMsg(row.label);
      openMainMenu();
      return;
    }
    addCustomerMsg(row.label);
    const cat = sampleMenuCategories.find(c => c.id === row.catId || c.name === row.label);
    if (!cat) return;
    setCurrentCategory(cat);
    setStep(STEPS.ITEMS);
    addBotMsg({ type: "items-header", catName: cat.name });
    setTimeout(() => {
      setSheet({
        title: cat.name,
        rows: [
          ...cat.items.map(it => ({
            label: it.name,
            price: it.priceDisplay,
            icon: it.icon,
            itemId: it.id,
            disabled: !it.available
          })),
          { label: "Back to Categories" }
        ],
        onSelect: (r) => handleItemSelect(
          cat.items.find(it => it.id === r.itemId),
          cat.id,
          r
        ),
        type: "items"
      });
    }, 300);
  }

  function handleItemSelect(item, catId, row) {
    setSheet(null);
    if (!item || (row && row.label === "Back to Categories")) {
      setSheet({
        title: "Browse Categories",
        rows: [
          ...sampleMenuCategories.map(c => ({ label: c.name, catId: c.id })),
          { label: "Back" },
          { label: "Main Menu" }
        ],
        onSelect: handleCategorySelect,
        type: "categories"
      });
      return;
    }

    addCustomerMsg(item.name);
    setCart((prev) => {
      const existing = prev.find(x => x.id === item.id);
      if (existing) {
        return prev.map(x => x.id === item.id ? { ...x, qty: x.qty + 1 } : x);
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, priceDisplay: item.priceDisplay, qty: 1 }];
    });
    setStep(STEPS.CART);
    addBotMsg({ type: "cart", itemName: item.name });
  }

  function handleReplyBtn(opt) {
    if (opt.action === "add-more") {
      addCustomerMsg("Add More");
      const cat = currentCategory || sampleMenuCategories[0];
      setSheet({
        title: cat.name,
        rows: [
          ...cat.items.map(it => ({
            label: it.name,
            price: it.priceDisplay,
            icon: it.icon,
            itemId: it.id,
            disabled: !it.available
          })),
          { label: "Back to Categories" }
        ],
        onSelect: (r) => handleItemSelect(
          cat.items.find(it => it.id === r.itemId),
          cat.id,
          r
        ),
        type: "items"
      });
    } else if (opt.action === "edit-cart") {
      addCustomerMsg("Edit Cart");
      setSheet({
        title: "Your Cart",
        rows: cart.map(it => ({
          label: `${it.qty}x ${it.name}`,
          itemId: it.id,
          price: it.priceDisplay
        })),
        onSelect: (r) => {
          setSheet(null);
          addCustomerMsg(`Remove ${r.label}`);
          setCart(prev => prev.filter(x => x.id !== r.itemId));
          if (cart.length <= 1) setStep(STEPS.CATEGORIES);
        },
        type: "edit"
      });
    } else if (opt.action === "confirm") {
      addCustomerMsg("Confirm Order");
      setStep(STEPS.CONFIRMED);
      const freshPin = generatePin();
      setPin(freshPin);
      addBotMsg({ type: "confirmed" });
      setTimeout(() => {
        setDashStep("new");
        setFlashDouble(true);
        setTimeout(() => setFlashDouble(false), 300);
        setTimeout(() => setFlashDouble(true), 450);
        setTimeout(() => setFlashDouble(false), 750);
      }, 400);
    }
  }

  function handleMarkReady() {
    setDashStep("ready");
    setDashTab("kitchen");
    addBotMsg({ type: "ready", pin });
    setStep(STEPS.READY);
  }

  function handlePinSubmit() {
    if (pinInput.trim() === pin) {
      setHandedOver(true);
      setDashStep("done");
      addBotMsg({ type: "done" });
      setStep(STEPS.DONE);
      setPinError(false);
    } else {
      setShakePin(true);
      setTimeout(() => setShakePin(false), 350);
      setPinError(true);
    }
  }

  function renderMessage(msg) {
    if (msg.type === "customer") {
      return (
        <div className="sim-bubble sim-bubble-customer">
          {msg.content}
        </div>
      );
    }

    const c = msg.content;

    if (c === "welcome") {
      return (
        <div className="sim-bubble sim-bubble-bot">
          <div className="sim-bubble-title">Welcome Back, Nimal</div>
          <button
            type="button"
            className="sim-list-trigger font-mono"
            onClick={openMainMenu}
          >
            <span>Select An Option</span>
            <span className="arrow-small">▼</span>
          </button>
        </div>
      );
    }

    if (c === "categories") {
      return (
        <div className="sim-bubble sim-bubble-bot">
          <div className="sim-bubble-title">Select A Menu Category</div>
          <button
            type="button"
            className="sim-list-trigger font-mono"
            onClick={() => setSheet({
              title: "Browse Categories",
              rows: [
                ...sampleMenuCategories.map(cat => ({ label: cat.name, catId: cat.id })),
                { label: "Back" },
                { label: "Main Menu" }
              ],
              onSelect: handleCategorySelect,
              type: "categories"
            })}
          >
            <span>Browse Categories</span>
            <span className="arrow-small">▼</span>
          </button>
        </div>
      );
    }

    if (typeof c === "object" && c.type === "items-header") {
      return (
        <div className="sim-bubble sim-bubble-bot">
          <div>{c.catName} Items Loaded. Tap to Select.</div>
        </div>
      );
    }

    if (typeof c === "object" && c.type === "cart") {
      const currentCart = cart.length > 0 ? cart : [{ name: c.itemName, qty: 1, priceDisplay: "" }];
      const total = currentCart.reduce((s, it) => s + (it.price || 0) * it.qty, 0);
      return (
        <div className="sim-bubble sim-bubble-bot">
          <div className="sim-bubble-title">Added to Your Cart</div>
          {currentCart.map((it, i) => (
            <QuoteBullet key={i}>
              {it.qty}x {it.name} {it.priceDisplay ? `(${it.priceDisplay})` : ""}
            </QuoteBullet>
          ))}
          {total > 0 && (
            <div className="sim-cart-total font-mono">
              Total: Rs. {total.toLocaleString()}
            </div>
          )}
          <div className="sim-reply-buttons">
            {[
              { label: "Add More", action: "add-more" },
              { label: "Edit Cart", action: "edit-cart" },
              { label: "Confirm Order", action: "confirm" }
            ].map((btn, idx) => (
              <button
                key={idx}
                type="button"
                className="sim-reply-btn font-mono"
                onClick={() => handleReplyBtn(btn)}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (typeof c === "object" && c.type === "confirmed") {
      return (
        <div className="sim-bubble sim-bubble-bot">
          <div className="sim-bubble-title highlight-lime-text">Order Received</div>
          <div className="sim-order-meta font-mono">
            {orderNum} • {orderDate} at {orderTime}
          </div>
          {cart.map((it, i) => (
            <QuoteBullet key={i}>
              {it.qty}x {it.name} - {it.priceDisplay}
            </QuoteBullet>
          ))}
          <div className="sim-cart-total font-mono">
            Total: {totalDisplay}
          </div>
          <div className="sim-status-tag font-mono">
            Preparing Your Order
          </div>
        </div>
      );
    }

    if (typeof c === "object" && c.type === "ready") {
      return (
        <div className="sim-bubble sim-bubble-bot sim-bubble-ready">
          <div className="sim-bubble-title highlight-lime-text">Your Order Is Ready</div>
          <p className="sim-ready-instructions">
            Please show this 4 digit PIN at the counter to collect your order:
          </p>
          <div className="sim-pin-display font-mono">
            {c.pin}
          </div>
          <div className="sim-pin-note font-mono">
            This PIN Is Only for You.
          </div>
        </div>
      );
    }

    if (typeof c === "object" && c.type === "done") {
      return (
        <div className="sim-bubble sim-bubble-bot">
          <div className="sim-bubble-title">Thank You, Nimal. See You Again!</div>
        </div>
      );
    }

    return <div className="sim-bubble sim-bubble-bot">{String(c)}</div>;
  }

  return (
    <div ref={containerRef} className="order-simulator-container">
      {/* Top Controls Bar */}
      <div className="sim-top-controls">
        <div className="sim-mode-toggle">
          <button
            type="button"
            className={`sim-mode-btn font-mono ${mode === "watch" ? "active" : ""}`}
            onClick={() => { setMode("watch"); reset(); }}
          >
            Watch It Play
          </button>
          <button
            type="button"
            className={`sim-mode-btn font-mono ${mode === "manual" ? "active" : ""}`}
            onClick={() => { setMode("manual"); setAutoPlaying(false); }}
          >
            Try It Yourself
          </button>
        </div>

        {mode === "watch" && (
          <button
            type="button"
            className="sim-ctrl-icon-btn"
            onClick={() => setAutoPlaying(p => !p)}
            aria-label={autoPlaying ? "Pause autoplay" : "Start autoplay"}
          >
            {autoPlaying ? <PauseIcon size={14} /> : <PlayIcon size={14} />}
          </button>
        )}

        <button
          type="button"
          className="sim-ctrl-icon-btn"
          onClick={reset}
          aria-label="Reset simulator"
        >
          <RefreshIcon size={14} />
        </button>

        <span className="sim-venue-tag font-mono">{sampleVenue.badge}</span>
      </div>

      {/* Mobile Tab Switcher */}
      <div className="sim-mobile-tab-switch">
        <button
          type="button"
          className={`mobile-tab-btn font-mono ${mobileTab === "customer" ? "active" : ""}`}
          onClick={() => setMobileTab("customer")}
        >
          CUSTOMER PHONE
        </button>
        <button
          type="button"
          className={`mobile-tab-btn font-mono ${mobileTab === "manager" ? "active" : ""}`}
          onClick={() => setMobileTab("manager")}
        >
          MANAGER DASHBOARD
        </button>
      </div>

      {/* Simulator Two-Panel Body */}
      <div className="sim-panels-grid">
        {/* Panel 1: Flat rectangular phone frame with chamfered corner */}
        <div className={`sim-phone-panel ${mobileTab !== "customer" ? "hide-on-mobile" : ""}`}>
          <div className="night-phone-frame chamfer-card">
            <div className="phone-top-bar">
              <span className="phone-contact-dot" aria-hidden="true" />
              <div className="phone-contact-info">
                <span className="phone-contact-name">Sample Cafe</span>
                <span className="phone-contact-type font-mono">WhatsApp Order Desk</span>
              </div>
            </div>

            <div className="phone-chat-scroll">
              {chatMessages.map((msg) => (
                <div key={msg.id}>{renderMessage(msg)}</div>
              ))}
              <div ref={chatEndRef} />
            </div>
          </div>
        </div>

        {/* Panel 2: Manager Dashboard Card */}
        <div className={`sim-dashboard-panel ${mobileTab !== "manager" ? "hide-on-mobile" : ""}`}>
          <div className="night-dash-card chamfer-card">
            <div className="dash-top-row">
              <div className="dash-title font-mono">RESTAURANT DASHBOARD</div>
              <div className="dash-tabs-switch">
                <button
                  type="button"
                  className={`dash-tab-btn font-mono ${dashTab === "orders" ? "active" : ""}`}
                  onClick={() => setDashTab("orders")}
                >
                  ORDERS
                </button>
                <button
                  type="button"
                  className={`dash-tab-btn font-mono ${dashTab === "kitchen" ? "active" : ""}`}
                  onClick={() => setDashTab("kitchen")}
                >
                  KITCHEN
                </button>
              </div>
            </div>

            {dashStep === "empty" && (
              <div className="dash-empty-state font-mono">
                [WAITING FOR ORDERS]
                <br />
                <span className="dash-empty-sub">Tap "Order Food" on the phone to place a sample ticket.</span>
              </div>
            )}

            {dashStep !== "empty" && dashTab === "orders" && (
              <div className={`dash-ticket-box ${flashDouble ? "ticket-flash" : ""}`}>
                <div className="dash-ticket-header font-mono">
                  <span className="ticket-id">{orderNum}</span>
                  <span className={`ticket-badge status-${dashStep === "new" ? "new" : dashStep === "done" ? "done" : "active"}`}>
                    {dashStep === "new" ? "NEW" : dashStep === "accepted" ? "ACCEPTED" : dashStep === "kitchen" ? "IN KITCHEN" : dashStep === "ready" ? "READY" : "HANDED OVER"}
                  </span>
                </div>

                <div className="dash-ticket-items">
                  {cart.map((it, i) => (
                    <div key={i} className="dash-ticket-row font-mono">
                      <span>{it.qty}x {it.name}</span>
                      <span>{it.priceDisplay}</span>
                    </div>
                  ))}
                  <div className="dash-ticket-total font-mono">
                    <span>TOTAL</span>
                    <span>{totalDisplay}</span>
                  </div>
                </div>

                {dashStep === "new" && (
                  <div className="dash-action-buttons">
                    <button
                      type="button"
                      className="dash-btn btn-lime font-mono"
                      onClick={() => setDashStep("accepted")}
                    >
                      ACCEPT ORDER
                    </button>
                    <button
                      type="button"
                      className="dash-btn btn-white font-mono"
                      onClick={() => { setDashStep("kitchen"); setDashTab("kitchen"); }}
                    >
                      SEND TO KITCHEN
                    </button>
                  </div>
                )}

                {dashStep === "accepted" && (
                  <div className="dash-action-buttons">
                    <button
                      type="button"
                      className="dash-btn btn-lime font-mono"
                      onClick={() => { setDashStep("kitchen"); setDashTab("kitchen"); }}
                    >
                      SEND TO KITCHEN
                    </button>
                  </div>
                )}

                {(dashStep === "ready" || dashStep === "done") && !handedOver && (
                  <div className="dash-pin-entry">
                    <div className="pin-prompt font-mono">ENTER CUSTOMER 4-DIGIT PIN:</div>
                    {pinError && (
                      <div className="pin-error-text font-mono">PIN Does Not Match</div>
                    )}
                    <div className={`pin-input-group ${shakePin ? "shake-pin" : ""}`}>
                      <input
                        type="text"
                        maxLength={4}
                        value={pinInput}
                        onChange={(e) => {
                          setPinInput(e.target.value.replace(/\D/g, "").slice(0, 4));
                          setPinError(false);
                        }}
                        className="dash-pin-box font-mono"
                        placeholder="----"
                        aria-label="4 digit pickup PIN"
                      />
                      <button
                        type="button"
                        onClick={handlePinSubmit}
                        className="dash-btn btn-lime font-mono"
                      >
                        VERIFY PIN
                      </button>
                    </div>
                  </div>
                )}

                {handedOver && (
                  <div className="handed-over-badge font-mono">
                    ✓ HANDED OVER
                  </div>
                )}

                <div className="dash-ticket-note font-mono">
                  Feedback Is Requested 10 Minutes Later (Planned)
                </div>
              </div>
            )}

            {dashStep !== "empty" && dashTab === "kitchen" && (
              <div className="dash-kitchen-box">
                <div className="kitchen-ticket-header font-mono">
                  <span>{orderNum}</span>
                  <span className={`ticket-badge ${dashStep === "ready" || dashStep === "done" ? "status-done" : "status-active"}`}>
                    {dashStep === "ready" || dashStep === "done" ? "READY" : "COOKING"}
                  </span>
                </div>
                <div className="dash-ticket-items">
                  {cart.map((it, i) => (
                    <div key={i} className="dash-ticket-row font-mono">
                      <span>{it.qty}x {it.name}</span>
                    </div>
                  ))}
                </div>
                {dashStep !== "ready" && dashStep !== "done" && (
                  <button
                    type="button"
                    onClick={handleMarkReady}
                    className="dash-btn btn-lime font-mono full-width"
                  >
                    MARK READY
                  </button>
                )}
                {(dashStep === "ready" || dashStep === "done") && (
                  <div className="ready-indicator font-mono">
                    ✓ NOTIFICATION SENT TO CUSTOMER
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Sheet for Menus */}
      {sheet && (
        <BottomSheet
          title={sheet.title}
          rows={sheet.rows}
          onSelect={sheet.onSelect}
          onClose={() => setSheet(null)}
          sending={sheet.type === "items" || sheet.type === "categories" || sheet.type === "main"}
        />
      )}
    </div>
  );
}
