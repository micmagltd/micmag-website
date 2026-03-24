/* ── NAV: transparent over hero, solid on scroll ── */
const nav    = document.getElementById('nav');
const hero   = document.getElementById('hero');
let   heroH  = hero ? hero.offsetHeight : 600;

function updateNav() {
  const atTop     = window.scrollY < 40;
  const overHero  = window.scrollY < heroH - 60;

  nav.classList.toggle('solid', !atTop);
  nav.classList.toggle('dark-mode', atTop || overHero && atTop);

  // default: transparent on hero (white text), solid once past
  if (atTop) {
    nav.classList.remove('solid');
  }
}

window.addEventListener('scroll', updateNav, { passive: true });
window.addEventListener('resize', () => { heroH = hero ? hero.offsetHeight : 600; });
updateNav();

/* ── MOBILE BURGER / DRAWER ── */
const burger = document.getElementById('burger');
const drawer = document.getElementById('drawer');
let drawerOpen = false;

burger.addEventListener('click', () => {
  drawerOpen = !drawerOpen;
  drawer.classList.toggle('open', drawerOpen);
  burger.classList.toggle('open', drawerOpen);
  burger.setAttribute('aria-expanded', drawerOpen);
});

document.querySelectorAll('.drawer__link').forEach(link => {
  link.addEventListener('click', () => {
    drawerOpen = false;
    drawer.classList.remove('open');
    burger.classList.remove('open');
  });
});

document.addEventListener('click', e => {
  if (drawerOpen && !drawer.contains(e.target) && !burger.contains(e.target)) {
    drawerOpen = false;
    drawer.classList.remove('open');
    burger.classList.remove('open');
  }
});

/* ── SCROLL REVEAL ── */
const reveals = document.querySelectorAll('.reveal');

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (!entry.isIntersecting) return;
    // Stagger siblings in the same parent
    const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal:not(.visible)'));
    const idx = siblings.indexOf(entry.target);
    setTimeout(() => {
      entry.target.classList.add('visible');
    }, idx * 80);
    revealObs.unobserve(entry.target);
  });
}, { threshold: 0.08 });

reveals.forEach(el => revealObs.observe(el));

/* ── ACTIVE NAV LINK ── */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__links a');

const activeObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    navLinks.forEach(a => {
      const match = a.getAttribute('href') === `#${id}`;
      a.style.opacity = match ? '1' : '';
      a.style.color   = match ? 'var(--dark-mid)' : '';
    });
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => activeObs.observe(s));

/* ── WAITLIST FORM ── */
const form       = document.getElementById('waitlistForm');
const submitBtn  = document.getElementById('submitBtn');
const btnText    = document.getElementById('btnText');
const btnSpinner = document.getElementById('btnSpinner');
const formView   = document.getElementById('formView');
const successView = document.getElementById('successView');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }

    // Loading state
    btnText.textContent   = 'Reserving…';
    btnSpinner.style.display = 'inline-block';
    submitBtn.disabled    = true;
    submitBtn.style.opacity = '0.8';

    const payload = {
      firstName: document.getElementById('firstName').value.trim(),
      email:     document.getElementById('email').value.trim(),
      platform:  document.getElementById('platform').value,
    };

    try {
      // ─── Replace YOUR_FORM_ID with your Formspree form ID ───
      // Sign up free at formspree.io → get your ID → paste below
      const FORMSPREE_ID = 'YOUR_FORM_ID';

      if (FORMSPREE_ID === 'YOUR_FORM_ID') {
        // Demo mode — simulated success
        await new Promise(r => setTimeout(r, 1400));
        const stored = JSON.parse(localStorage.getItem('micmag_waitlist') || '[]');
        stored.push({ ...payload, ts: new Date().toISOString() });
        localStorage.setItem('micmag_waitlist', JSON.stringify(stored));
        console.info('📬 MicMag waitlist signup (local):', payload);
        showSuccess();
        return;
      }

      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body:    JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      showSuccess();

    } catch (err) {
      console.error('Form error:', err);
      submitBtn.disabled    = false;
      submitBtn.style.opacity = '1';
      btnSpinner.style.display = 'none';
      btnText.textContent   = 'Try again';
    }
  });
}

function showSuccess() {
  formView.style.opacity  = '0';
  formView.style.transition = 'opacity 0.3s';
  setTimeout(() => {
    formView.style.display   = 'none';
    successView.style.display = 'block';
    successView.style.opacity = '0';
    requestAnimationFrame(() => {
      successView.style.transition = 'opacity 0.5s';
      successView.style.opacity    = '1';
    });
  }, 300);
}

/* ── SMOOTH PARALLAX ON HERO IMAGE (subtle) ── */
const heroBg = document.querySelector('.hero__bg-img');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < heroH) {
      heroBg.style.transform = `translateY(${y * 0.25}px)`;
    }
  }, { passive: true });
}
