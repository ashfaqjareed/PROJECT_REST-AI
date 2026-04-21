// Ordera Bot Intelligence Core - v3.0 (Adaptive Learning Engine)
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

// Adaptive Knowledge Base
let adaptivePatterns = JSON.parse(localStorage.getItem('ordera_adaptive')) || {};

let state = 'START';
let userName = '';
let cart = [];

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
    }, 1000 + Math.random() * 500);
};

const findMenuItem = (input) => {
    const low = input.toLowerCase();
    
    // Check Adaptive Patterns first (Learned behavior)
    if (adaptivePatterns[low]) {
        console.log(`[Ordera Adaptive]: Using learned pattern for "${low}" -> ${adaptivePatterns[low]}`);
        return menu.find(m => m.n === adaptivePatterns[low]);
    }

    for (const item of menu) {
        if (low.includes(item.n.toLowerCase())) return item;
    }
    for (const item of menu) {
        if (item.keys.some(k => low.includes(k))) return item;
    }
    return null;
};

const learnPattern = (input, confirmedItemName) => {
    const low = input.toLowerCase();
    adaptivePatterns[low] = confirmedItemName;
    localStorage.setItem('ordera_adaptive', JSON.stringify(adaptivePatterns));
    console.log(`[Ordera Adaptive]: New pattern learned: "${low}" maps to ${confirmedItemName}`);
};

const showMenu = () => {
    const list = menu.map(m => `• ${m.n} — Rs. ${m.p}`).join('<br>');
    typeBot(`Please observe our selection at [Elite Cuisines]:<br><br>${list}<br><br>Which item shall I initialize for you?`);
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
        showMenu();
        state = 'ORDER';
        return;
    }

    if (state === 'START') {
        typeBot("Greetings. I am the Ordera Bot Adaptive Intelligence [Elite Cuisines - Demo]. May I ask for your name?");
        state = 'NAME';
    } else if (state === 'NAME') {
        userName = val;
        typeBot(`Thank you, ${userName}. System uplink established.`);
        setTimeout(() => showMenu(), 800);
        state = 'ORDER';
    } else if (state === 'ORDER') {
        const item = findMenuItem(val);
        if (item) {
            cart.push(item);
            learnPattern(val, item.n); // Learn the mapping
            const total = cart.reduce((s, i) => s + i.p, 0);
            typeBot(`Acknowledged. ${item.n} added to buffer. System has learned this preference. Total: Rs. ${total}. Shall we 'Confirm'?`);
        } else if (low.includes('confirm') || low.includes('yes') || low.includes('fine')) {
            if (cart.length === 0) {
                typeBot("The buffer is vacant. Please select an item.");
            } else {
                typeBot(`Validated. Order for ${userName} pushed to kitchen.`);
                pushKDS();
                cart = [];
            }
        } else {
            typeBot("I'm adapting to your input... Please specify an item from the menu so I can calibrate.");
        }
    }
};

const pushKDS = () => {
    const id = Math.floor(Math.random() * 9000) + 1000;
    const t = `<div class="ticket" id="t-${id}">
        <div style="font-size:10px; color:var(--text-dim);">REF: #${id}</div>
        <div style="font-weight:700; color:var(--accent);">${userName.toUpperCase()}</div>
        <div style="font-size:13px;">${cart.map(i => `• ${i.n}`).join('<br>')}</div>
    </div>`;
    const area = document.getElementById('demoKDS');
    if (area) {
        if (area.innerText.includes('Awaiting')) area.innerHTML = '';
        area.insertAdjacentHTML('afterbegin', t);
    }
};

setTimeout(() => {
    if (state === 'START') typeBot("Adaptive System Standby. State 'Hello' to begin.");
}, 1000);
