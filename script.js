/* ═══════════════════════════════════════════════
   VeritaPlugin — Landing Page Script
   ═══════════════════════════════════════════════ */

// ── Mobile menu ────────────────────────────────
const hamburger  = document.getElementById('hamburger');
const navLinks   = document.querySelector('.navbar__links');
const navbar     = document.querySelector('.navbar');

// Create overlay element
const overlay = document.createElement('div');
overlay.className = 'nav-overlay';
document.body.appendChild(overlay);

function openMenu() {
  navLinks.classList.add('open');
  hamburger.classList.add('open');
  overlay.classList.add('visible');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  navLinks.classList.remove('open');
  hamburger.classList.remove('open');
  overlay.classList.remove('visible');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  navLinks.classList.contains('open') ? closeMenu() : openMenu();
});

overlay.addEventListener('click', closeMenu);

// Close on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});

// ── Navbar scroll shadow ───────────────────────
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── Active nav link on scroll ──────────────────
const sections = document.querySelectorAll('section[id], div[id]');
const navAnchors = document.querySelectorAll('.navbar__links a[href^="#"]');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-30% 0px -60% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// ── Browser tabs ──────────────────────────────
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    const container = btn.closest('.browser-tabs');

    container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    container.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    container.querySelector(`#tab-${target}`).classList.add('active');
  });
});

// ── URL pill copy-to-clipboard ─────────────────
document.querySelectorAll('.url-pill').forEach(pill => {
  pill.addEventListener('click', () => {
    const text = pill.dataset.copy;
    navigator.clipboard.writeText(text).then(() => {
      pill.classList.add('copied');
      const original = pill.textContent;
      pill.textContent = 'Copiado!';
      setTimeout(() => {
        pill.textContent = original;
        pill.classList.remove('copied');
      }, 1800);
    });
  });
});

// ── Code-block copy button ─────────────────────
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.target;
    const text = document.getElementById(targetId)?.textContent ?? '';
    navigator.clipboard.writeText(text).then(() => {
      btn.classList.add('copied');
      const svgOriginal = btn.innerHTML;
      btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>';
      setTimeout(() => {
        btn.innerHTML = svgOriginal;
        btn.classList.remove('copied');
      }, 1800);
    });
  });
});

// ── Scroll-reveal ──────────────────────────────
const revealEls = document.querySelectorAll(
  '.flow__step, .card, .step, .about, .repo-card'
);

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.45s ease ${(i % 6) * 0.07}s, transform 0.45s ease ${(i % 6) * 0.07}s`;
  revealObserver.observe(el);
});

// Reveal already-visible elements on load
window.addEventListener('load', () => {
  revealEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) el.classList.add('revealed');
  });
});

// Inject revealed style
const style = document.createElement('style');
style.textContent = '.revealed { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);
