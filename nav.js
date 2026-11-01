/**
 * Ordera Bot - Global Navigation & System State Configuration
 * Controls Header & Footer dynamic states globally across all pages.
 */

// Global System Configuration
window.ORDERABOT_CONFIG = {
    // Switch WhatsApp API Status manually: true = Online / Active, false = Offline / Maintenance
    whatsAppApiActive: true,

    // Real-time API Latency / Meta info
    apiRegion: "LK-COLOMBO-1",
    apiUptime: "99.98%",
    
    // Official Links
    googleFormUrl: "https://forms.gle/3M1nWcrCstnnkMfF7",
    whatsAppNumber: "+94 076 832 5949",
    whatsAppSupportUrl: "https://wa.me/94768325949"
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll effect on Navigation bar
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                nav.classList.add('nav-scrolled');
            } else {
                nav.classList.remove('nav-scrolled');
            }
        });
    }

    // 2. Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navCenter = document.querySelector('.nav-center');
    
    if (navToggle && navCenter) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navCenter.classList.contains('open');
            if (isOpen) {
                navCenter.classList.remove('open');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            } else {
                navCenter.classList.add('open');
                navToggle.classList.add('active');
                navToggle.setAttribute('aria-expanded', 'true');
            }
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target)) {
                navCenter.classList.remove('open');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Close on nav link click
        navCenter.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navCenter.classList.remove('open');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 3. Dynamic WhatsApp API Status Pill
    const updateApiStatusIndicator = () => {
        const statusPills = document.querySelectorAll('.nav-status');
        const isActive = window.ORDERABOT_CONFIG.whatsAppApiActive;

        statusPills.forEach(pill => {
            const pulse = pill.querySelector('.nav-status-pulse');
            const text = pill.querySelector('.nav-status-text');

            if (isActive) {
                pill.classList.remove('status-offline');
                pill.classList.add('status-online');
                pill.setAttribute('title', `WhatsApp Live • ${window.ORDERABOT_CONFIG.apiRegion} • Uptime: ${window.ORDERABOT_CONFIG.apiUptime}`);
                if (pulse) pulse.style.background = '#25D366';
                if (pulse) pulse.style.boxShadow = '0 0 10px #25D366, 0 0 20px rgba(37, 211, 102, 0.5)';
                if (text) text.textContent = 'WhatsApp Live';
            } else {
                pill.classList.remove('status-online');
                pill.classList.add('status-offline');
                pill.setAttribute('title', 'WhatsApp Offline for Maintenance');
                if (pulse) pulse.style.background = '#FF4343';
                if (pulse) pulse.style.boxShadow = '0 0 10px #FF4343, 0 0 20px rgba(255, 67, 67, 0.5)';
                if (text) text.textContent = 'WhatsApp Offline';
            }
        });
    };

    updateApiStatusIndicator();

    // 4. Logo smooth scroll to top on same page click for HEADER LOGO ONLY
    const headerLogoLinks = document.querySelectorAll('header a.logo, nav a.logo');
    headerLogoLinks.forEach(logoLink => {
        logoLink.addEventListener('click', (e) => {
            const href = logoLink.getAttribute('href');
            if (href === '#' || (href === 'index.html' && (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === ''))) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
});
