// Ordera Bot Intelligence Core - v4.0 (Advanced Neural Intake)
let menu = [
    { n: 'Chicken Kottu', p: 850, keys: ['chicken', 'kottu', 'kothu', 'chiken'] },
    { n: 'Seafood Fried Rice', p: 1250, keys: ['seafood', 'rice', 'fried rice', 'sea food'] },
    { n: 'Beef Burger', p: 950, keys: ['beef', 'burger', 'beaf'] },
    { n: 'Egg Hoppers', p: 450, keys: ['hopper', 'hoper', 'egg'] },
    { n: 'Lamprais', p: 1100, keys: ['lamprais', 'lumpris', 'rice packet'] },
    { n: 'Iced Milo', p: 350, keys: ['milo', 'melo', 'iced'] },
    { n: 'Masala Tea', p: 150, keys: ['tea', 'masala', 'the'] },
    { n: 'Vegetable Rotti', p: 80, keys: ['rotti', 'roti', 'veg'] },
    { n: 'Fish Cutlets', p: 250, keys: ['cutlet', 'cutlat', 'fish'] },
    { n: 'Chicken Biryani', p: 1350, keys: ['biryani', 'briyani', 'buryani', 'chicken'] }
];

let state = 'START';
let userName = '';
let cart = []; // Array of { name, quantity, price }

const addMsg = (txt, type) => {
    const d = document.createElement('div');
    d.className = `msg msg-${type}`;
    d.innerHTML = txt;
    const area = document.getElementById('chatArea');
    if (area) {
        area.appendChild(d);
        area.scrollTop = 9999;
    }
};

const typeBot = (txt, cb) => {
    addMsg('<div class="typing-dots"><span></span><span></span><span></span></div>', 'bot');
    const area = document.getElementById('chatArea');
    const last = area.lastChild;

    setTimeout(() => {
        last.innerHTML = txt;
        area.scrollTop = 9999;
        if (cb) cb();
    }, 800 + Math.random() * 400);
};

const parseInput = (input) => {
    const low = input.toLowerCase();
    const words = low.split(/[\s,]+/);
    const results = [];
    
    let currentMode = 'ADD';
    let currentQty = 1;
    
    words.forEach((word) => {
        if (['remove', 'delete', 'cancel', 'drop'].includes(word)) {
            currentMode = 'REMOVE';
            return;
        }
        if (['add', 'want', 'get', 'need', 'more'].includes(word)) {
            currentMode = 'ADD';
            return;
        }

        const num = parseInt(word);
        if (!isNaN(num)) {
            currentQty = num;
            return;
        }
        
        const item = menu.find(m => 
            word.length > 2 && (m.n.toLowerCase().includes(word) || m.keys.some(k => k.includes(word)))
        );
        
        if (item) {
            results.push({ item, qty: currentQty, mode: currentMode });
            currentQty = 1;
        }
    });
    
    return results;
};

const updateCart = (actions) => {
    actions.forEach(action => {
        const existing = cart.find(c => c.name === action.item.n);
        if (action.mode === 'ADD') {
            if (existing) {
                existing.quantity += action.qty;
            } else {
                cart.push({ name: action.item.n, quantity: action.qty, price: action.item.p });
            }
        } else {
            if (existing) {
                existing.quantity = Math.max(0, existing.quantity - action.qty);
                if (existing.quantity === 0) {
                    cart = cart.filter(c => c.name !== action.item.n);
                }
            }
        }
    });
};

const getCartSummary = () => {
    if (cart.length === 0) return "Your cart is currently empty.";
    const items = cart.map(c => `${c.quantity}x ${c.name}`).join(', ');
    const total = cart.reduce((s, i) => s + (i.price * i.quantity), 0);
    return `Current Order: ${items}. Total: Rs. ${total}.`;
};

window.handleChat = (e) => {
    e.preventDefault();
    const inp = document.getElementById('chatInput');
    const val = inp.value.trim();
    if (!val) return;
    addMsg(val, 'user');
    inp.value = '';

    const low = val.toLowerCase();

    if (low.includes('menu')) {
        const list = menu.map(m => `• ${m.n} — Rs. ${m.p}`).join('<br>');
        typeBot(`Our curated selection:<br><br>${list}<br><br>What would you like to add?`);
        state = 'ORDER';
        return;
    }

    if (state === 'START') {
        typeBot("System ready. Identification required. Please provide your name.");
        state = 'NAME';
    } else if (state === 'NAME') {
        userName = val;
        typeBot(`Welcome, ${userName}. How can I assist with your order today?`);
        state = 'ORDER';
    } else if (state === 'ORDER') {
        const actions = parseInput(val);
        
        if (actions.length > 0) {
            updateCart(actions);
            const summary = getCartSummary();
            typeBot(`${summary}<br><br>Would you like to <b>Add</b>, <b>Delete</b>, or <b>Confirm</b>?`);
        } else if (low.includes('confirm') || low.includes('yes') || low.includes('done')) {
            if (cart.length === 0) {
                typeBot("Cart is empty. Please specify items to initialize.");
            } else {
                typeBot(`Order validated for ${userName}. Dispatching to kitchen...`);
                pushKDS();
                cart = [];
            }
        } else if (low.includes('no') || low.includes('clear')) {
            cart = [];
            typeBot("Cart cleared. System reset to standby.");
        } else {
            typeBot("I didn't quite catch that. You can say things like 'Add 2 Kottu' or 'Remove 1 Burger'. Would you like to Add, Delete, or Confirm?");
        }
    }
};

const pushKDS = () => {
    const id = Math.floor(Math.random() * 9000) + 1000;
    const t = `<div class="ticket" id="t-${id}">
        <div style="font-size:10px; color:var(--text-dim);">REF: #${id}</div>
        <div style="font-weight:700; color:var(--accent);">${userName.toUpperCase()}</div>
        <div style="font-size:13px;">${cart.map(i => `• ${i.quantity}x ${i.name}`).join('<br>')}</div>
    </div>`;
    const area = document.getElementById('demoKDS');
    if (area) {
        if (area.innerText.includes('Awaiting')) area.innerHTML = '';
        area.insertAdjacentHTML('afterbegin', t);
    }
};

setTimeout(() => {
    if (state === 'START') typeBot("Ordera Neural Engine Online. Say 'Hello' to begin.");
}, 1000);

