/* ============================================================
   CYRAN'S INTERACTIVE PORTFOLIO
   ============================================================ */

/* 1. SCROLL PROGRESS */
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = (scrollTop / docHeight) * 100;
  if (scrollProgress) scrollProgress.style.width = pct + '%';
});

/* 2. BACK TO TOP */
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 400);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* 3. THEME TOGGLE */
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const savedTheme = localStorage.getItem('cyran-theme');
if (savedTheme === 'light') {
  document.body.classList.add('light-mode');
  if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
}
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('cyran-theme', isLight ? 'light' : 'dark');
    themeIcon.classList.replace(isLight ? 'fa-moon' : 'fa-sun', isLight ? 'fa-sun' : 'fa-moon');
  });
}

/* 4. PARTICLES */
const particleContainer = document.getElementById('particles');
if (particleContainer) {
  for (let i = 0; i < 25; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 8 + 4;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (Math.random() * 15 + 10) + 's';
    p.style.animationDelay = (Math.random() * 15) + 's';
    particleContainer.appendChild(p);
  }
}

/* 5. TYPING EFFECT */
const typingNameEl = document.getElementById('typingName');
const typingRoleEl = document.getElementById('typingRole');
const nameText = 'Cyran Mae Secorata';
const roleText = 'Aspiring Data Analyst & IT Professional';

function typeText(el, text, speed, callback) {
  if (!el) return;
  let i = 0;
  el.textContent = '';
  (function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else if (callback) callback();
  })();
}
if (typingNameEl && typingRoleEl) {
  setTimeout(() => {
    typeText(typingNameEl, nameText, 80, () => {
      typeText(typingRoleEl, roleText, 40);
    });
  }, 400);
}

/* 6. SCROLL REVEAL */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.glass-card, .metric-box, .featured-skill').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

/* 7. PROGRESS BARS */
const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const target = bar.dataset.progress || '0';
      bar.style.transition = 'width 1.4s ease-out';
      bar.style.width = target + '%';
      progressObserver.unobserve(bar);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.progress-bar[data-progress]').forEach(bar => {
  progressObserver.observe(bar);
});

/* 8. COUNTERS */
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      let current = 0;
      const step = Math.max(1, Math.floor(target / 60));
      const interval = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(interval); }
        el.textContent = current.toLocaleString() + suffix;
      }, 20);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(c => counterObserver.observe(c));

/* 9. 3D TILT */
document.querySelectorAll('.glass-card').forEach(card => {
  card.classList.add('tilt');
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

/* 10. RIPPLE */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top  = (e.clientY - rect.top  - size / 2) + 'px';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});

/* 11. PROJECT FILTER */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.display = match ? 'block' : 'none';
    });
  });
});

/* 12. PROJECT SEARCH */
const projectSearch = document.getElementById('projectSearch');
if (projectSearch) {
  projectSearch.addEventListener('input', function () {
    const val = this.value.toLowerCase();
    document.querySelectorAll('.project-card').forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(val) ? 'block' : 'none';
    });
  });
}

/* 13. AI LOG SEARCH */
const aiSearch = document.getElementById('aiSearch');
if (aiSearch) {
  aiSearch.addEventListener('keyup', function () {
    const val = this.value.toLowerCase();
    document.querySelectorAll('#aiTableBody tr').forEach(row => {
      row.style.display = row.textContent.toLowerCase().includes(val) ? '' : 'none';
    });
  });
}

/* 14. CHARACTER COUNTER */
const messageInput = document.getElementById('messageInput');
const charCount = document.getElementById('charCount');
if (messageInput && charCount) {
  messageInput.addEventListener('input', () => {
    charCount.textContent = messageInput.value.length;
    charCount.style.color = messageInput.value.length > 450 ? '#FFC24B' : '';
  });
}

/* 15. CONTACT FORM */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (form.checkValidity()) {
      showToast('Message sent successfully! (demo)');
      form.reset();
      if (charCount) charCount.textContent = '0';
      form.classList.remove('was-validated');
    } else {
      form.classList.add('was-validated');
    }
  });
}

/* 16. TOAST */
function showToast(message) {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed; bottom: 30px; right: 30px;
    background: linear-gradient(135deg, #00D4AA, #4A9EFF);
    color: #fff; padding: 14px 24px; border-radius: 10px;
    font-weight: 600; z-index: 9999;
    box-shadow: 0 0 25px rgba(0,212,170,0.5);
    transition: opacity 0.5s, transform 0.5s;
    transform: translateY(20px);
  `;
  document.body.appendChild(toast);
  requestAnimationFrame(() => { toast.style.transform = 'translateY(0)'; });
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateY(20px)'; }, 2500);
  setTimeout(() => toast.remove(), 3000);
}

/* 17. ACTIVE NAV */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.custom-navbar .nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (scrollY >= top) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
});

/* 18. SMOOTH SCROLL */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (targetId.length > 1) {
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

console.log('%c Cyran\'s Portfolio Loaded', 'color:#00D4AA; font-size:16px; font-weight:bold;');
