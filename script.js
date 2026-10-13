/* ── PORTFOLIO SCRIPT ───────────────────────────────────────── */

/* ── 1. NAVBAR – scroll effect & active link highlight ──────── */
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

function onScroll() {
  // Sticky style
  navbar.classList.toggle('scrolled', window.scrollY > 50);

  // Active nav link
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}
window.addEventListener('scroll', onScroll, { passive: true });


/* ── 2. HAMBURGER MENU ──────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  hamburger.innerHTML = open
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
  document.body.style.overflow = open ? 'hidden' : '';
});

// Close menu when a link is clicked
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.style.overflow = '';
  });
});


/* ── 3. TYPED TEXT EFFECT ───────────────────────────────────── */
const typedEl = document.getElementById('typed');
const phrases = [
  'Full-Stack Developer',
  'UI/UX Enthusiast',
  'Open-Source Contributor',
  'Problem Solver',
];
let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;
let typingTimer;

function type() {
  const current = phrases[phraseIndex];

  if (isDeleting) {
    typedEl.textContent = current.slice(0, --charIndex);
  } else {
    typedEl.textContent = current.slice(0, ++charIndex);
  }

  // Add blinking cursor via CSS – just control the text here
  let delay = isDeleting ? 60 : 110;

  if (!isDeleting && charIndex === current.length) {
    delay = 1800;          // pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 400;
  }

  typingTimer = setTimeout(type, delay);
}

// Add cursor style inline so it needs no extra CSS
typedEl.style.cssText += `
  border-right: 2px solid var(--cyan, #00e5ff);
  padding-right: 3px;
  animation: blink 0.8s step-end infinite;
`;
// Inject keyframe for blink
const blinkStyle = document.createElement('style');
blinkStyle.textContent = `@keyframes blink { 50% { border-color: transparent; } }`;
document.head.appendChild(blinkStyle);

type();


/* ── 4. SCROLL-REVEAL (IntersectionObserver) ────────────────── */
// Add .fade-in to every major child inside sections
document.querySelectorAll(
  '.about-text, .about-stats, .stat-card, .skill-category, ' +
  '.project-card, .contact-info, .contact-form, .hero-content, .hero-image'
).forEach(el => el.classList.add('fade-in'));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);   // fire once
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.fade-in').forEach(el => revealObserver.observe(el));


/* ── 5. ANIMATED STAT COUNTERS ──────────────────────────────── */
function animateCounter(el) {
  const target   = +el.dataset.target;
  const duration = 1500;
  const step     = target / (duration / 16);
  let   current  = 0;

  const tick = () => {
    current += step;
    if (current < target) {
      el.textContent = Math.floor(current);
      requestAnimationFrame(tick);
    } else {
      el.textContent = target;
    }
  };
  tick();
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);

document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));


/* ── 6. SKILL BAR ANIMATION ─────────────────────────────────── */
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });
        barObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll('.skill-category').forEach(el => barObserver.observe(el));


/* ── 7. PROJECT FILTER ──────────────────────────────────────── */
const filterBtns   = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      // Animate in/out
      if (match) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeUp 0.4s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// Inject fadeUp keyframe
const fadeUpStyle = document.createElement('style');
fadeUpStyle.textContent = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(fadeUpStyle);


/* ── 8. CONTACT FORM – Formspree ────────────────────────────── */
const form       = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name    = form.name.value.trim();
  const email   = form.email.value.trim();
  const subject = form.subject.value.trim();
  const message = form.message.value.trim();

  // Basic client-side validation
  if (!name || !email || !subject || !message) {
    setStatus('Please fill in all fields.', 'error');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setStatus('Please enter a valid email address.', 'error');
    return;
  }

  const submitBtn = form.querySelector('[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' },
    });

    if (response.ok) {
      setStatus('Message sent! I\'ll get back to you soon. 🚀', 'success');
      form.reset();
    } else {
      const data = await response.json();
      const errMsg = data?.errors?.map(e => e.message).join(', ')
                     || 'Something went wrong. Please try again.';
      setStatus(errMsg, 'error');
    }
  } catch {
    setStatus('Network error. Check your connection and try again.', 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
  }
});

function setStatus(msg, type) {
  formStatus.textContent = msg;
  formStatus.className   = `form-status ${type}`;
  setTimeout(() => {
    formStatus.textContent = '';
    formStatus.className   = 'form-status';
  }, 6000);
}


/* ── 9. SMOOTH SCROLL for anchor links ─────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 70; // navbar height
    window.scrollTo({
      top: target.offsetTop - offset,
      behavior: 'smooth',
    });
  });
});


/* ── 10. CURSOR GLOW EFFECT (subtle, desktop only) ──────────── */
if (window.matchMedia('(pointer: fine)').matches) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
  document.addEventListener('mouseleave', () => glow.style.opacity = '0');
  document.addEventListener('mouseenter', () => glow.style.opacity = '1');
}
