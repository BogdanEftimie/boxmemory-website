// ─── Theme Toggle ───
const themeToggle = document.querySelector('.theme-toggle');
const THEME_KEY = 'boxmemory-theme';

const SCREENSHOTS = {
    light: 'assets/main_menu_screenshot.png',
    dark:  'assets/main_menu_screenshot_dark.png',
};

function updateScreenshot(theme) {
    const img = document.getElementById('phone-screenshot');
    if (img) img.src = SCREENSHOTS[theme] ?? SCREENSHOTS.light;
}

// Restore saved theme
const savedTheme = localStorage.getItem(THEME_KEY);
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateScreenshot(savedTheme);
} else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    document.documentElement.setAttribute('data-theme', 'light');
    updateScreenshot('light');
} else {
    updateScreenshot('dark');
}

themeToggle?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(THEME_KEY, next);
    updateScreenshot(next);
});

// ─── Mobile Nav Toggle ───
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle?.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks?.classList.toggle('active');
});

// Close mobile nav on link click
navLinks?.querySelectorAll('a')?.forEach(link => {
    link.addEventListener('click', () => {
        navToggle?.classList.remove('active');
        navLinks?.classList.remove('active');
    });
});

// ─── Navbar Scroll Effect ───
const nav = document.querySelector('.nav');

const handleScroll = () => {
    if (window.scrollY > 50) {
        nav?.classList.add('scrolled');
    } else {
        nav?.classList.remove('scrolled');
    }
};

window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

// ─── FAQ Accordion ───
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        const isActive = item.classList.contains('active');

        // Close all
        document.querySelectorAll('.faq-item').forEach(faq => {
            faq.classList.remove('active');
            faq.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
        });

        // Toggle current
        if (!isActive) {
            item.classList.add('active');
            button.setAttribute('aria-expanded', 'true');
        }
    });
});

// ─── Smooth Scroll for Anchor Links ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ─── Intersection Observer for Fade-in Animations ───
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .step, .privacy-badge, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Stagger feature cards
document.querySelectorAll('.feature-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.08}s`;
});

document.querySelectorAll('.privacy-badge').forEach((badge, i) => {
    badge.style.transitionDelay = `${i * 0.1}s`;
});

document.querySelectorAll('.faq-item').forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.06}s`;
});
