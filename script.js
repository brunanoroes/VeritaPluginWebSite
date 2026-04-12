/* ═══════════════════════════════════════════════
   VeritaPlugin — Landing Page Script
   ═══════════════════════════════════════════════ */

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

// ── Hamburger menu ─────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.navbar__links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Scroll-reveal (simple IntersectionObserver) ─
const revealEls = document.querySelectorAll(
  '.flow__step, .card, .step, .about'
);

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`;
  observer.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  // trigger already-visible elements
  revealEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('revealed');
    }
  });
});

// inject .revealed styles dynamically
const style = document.createElement('style');
style.textContent = '.revealed { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);
