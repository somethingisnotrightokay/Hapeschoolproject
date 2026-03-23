// ---- NAV + FOOTER + ALL EASTER EGGS ----
(function () {

  const pages = [
    { href: 'index.html',      label: 'Home' },
    { href: 'program.html',    label: 'Program' },
    { href: 'guidelines.html', label: 'Guidelines & Barriers' },
    { href: 'goals.html',      label: 'Goals & Evaluation' },
    { href: 'reflection.html', label: 'About' },
    { href: 'sources.html',    label: 'Sources' },
  ];

  // Inject nav - clear first to prevent duplicates from caching
  const nav = document.getElementById('main-nav');
  if (nav) {
    nav.innerHTML = '';
    const logo = document.createElement('a');
    logo.href = 'index.html';
    logo.className = 'nav-logo';
    logo.innerHTML = 'Wyn<span>Health</span> Rover';
    nav.appendChild(logo);
    const ul = document.createElement('ul');
    pages.forEach(pg => {
      const li = document.createElement('li');
      const a  = document.createElement('a');
      a.href = pg.href;
      a.textContent = pg.label;
      if (window.currentPage === pg.href) a.className = 'active';
      li.appendChild(a);
      ul.appendChild(li);
    });
    nav.appendChild(ul);
  }

  // Inject footer
  const footer = document.getElementById('main-footer');
  if (footer) {
    footer.innerHTML = `
      <div class="footer-logo">Wyn<span>Health</span> Rover</div>
      <p>Created by Aaryav &middot; Wyndham, VIC &middot; 2025 &middot; Year 8 HAPE Assignment</p>
      <p class="footer-secret" title="shhh">&nbsp;&nbsp;no students were harmed in the making of this website&nbsp;&nbsp;&middot;&nbsp;&nbsp;<a href="clownface.html" style="color:inherit;text-decoration:none;">👀</a>&nbsp;&nbsp;</p>
    `;
  }

  // Fade on scroll
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
  }, { threshold: 0.07 });
  document.querySelectorAll('.fade').forEach(el => obs.observe(el));

  // Stat counters
  function countUp(el) {
    const target = parseInt(el.dataset.target);
    const post   = el.dataset.post || '';
    const dur    = 1400;
    const start  = performance.now();
    function step(now) {
      const pct  = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - pct, 3);
      el.textContent = Math.round(ease * target).toLocaleString() + post;
      if (pct < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  const statObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('[data-target]').forEach(countUp);
        statObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.25 });
  const statsEl = document.getElementById('stats');
  if (statsEl) statObs.observe(statsEl);

  // ---------- EASTER EGGS ----------

  // 1. KONAMI CODE (fixed: restart logic corrected)
  const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let ki = 0;
  document.addEventListener('keydown', e => {
    if (e.key === konami[ki]) {
      ki++;
      if (ki === konami.length) {
        ki = 0;
        launchClowns();
      }
    } else {
      // If wrong key, check if it matches the START of the sequence before resetting
      ki = (e.key === konami[0]) ? 1 : 0;
    }
  });

  // 2. Triple-click h1 -> van drives across
  document.querySelectorAll('h1').forEach(h => {
    let hc = 0, ht;
    h.addEventListener('click', () => {
      clearTimeout(ht);
      hc++;
      ht = setTimeout(() => { hc = 0; }, 600);
      if (hc >= 3) { hc = 0; driveVan(); }
    });
  });

  // 3. Disagree button -> clownface page
  document.querySelectorAll('.disagree-btn').forEach(btn => {
    btn.addEventListener('click', () => { window.location.href = 'clownface.html'; });
  });

  // 4. Van click (10x)
  let vanClicks = 0;
  document.querySelectorAll('.van-click').forEach(el => {
    el.addEventListener('click', () => {
      vanClicks++;
      if (vanClicks >= 10) {
        vanClicks = 0;
        el.style.transition = 'transform 0.4s';
        el.style.transform = 'rotate(720deg) scale(1.4)';
        setTimeout(() => { el.style.transform = ''; }, 700);
        toast('ok I get it, stop clicking me 😭');
      }
    });
  });

  // 5. Aaryav click (3x)
  let ac = 0;
  document.querySelectorAll('.aaryav-click').forEach(el => {
    el.addEventListener('click', () => {
      ac++;
      if (ac >= 3) { ac = 0; toast("yes that's me, please stop clicking 😭"); }
    });
  });

  // 6. Mobile 30s idle toast
  if (window.innerWidth < 700) {
    setTimeout(() => toast('still reading? respect. 👀'), 30000);
  }

  // 7. Type "rover" anywhere -> van drives across
  let typed = '';
  document.addEventListener('keypress', e => {
    typed = (typed + e.key).slice(-5);
    if (typed.toLowerCase() === 'rover') { typed = ''; driveVan(); }
  });

  // 8. Alt + click any stat number -> counts to 67 and back
  document.querySelectorAll('.stat-num').forEach(el => {
    el.addEventListener('click', e => {
      if (e.altKey) {
        const orig = el.textContent;
        let n = 0, going = true;
        const interval = setInterval(() => {
          if (going) { n++; el.textContent = n; if (n >= 67) going = false; }
          else { n--; el.textContent = n; if (n <= 0) { clearInterval(interval); el.textContent = orig; } }
        }, 30);
      }
    });
  });

  // ---------- HELPERS ----------

  function toast(msg) {
    const d = document.createElement('div');
    d.textContent = msg;
    d.style.cssText = 'position:fixed;bottom:24px;right:24px;background:#ff4500;color:white;padding:12px 18px;border-radius:8px;font-weight:bold;z-index:9998;font-size:1rem;box-shadow:0 4px 16px rgba(0,0,0,0.5);';
    document.body.appendChild(d);
    setTimeout(() => d.remove(), 3200);
  }

  function launchClowns() {
    const overlay = document.getElementById('clown-overlay');
    if (!overlay) return;
    overlay.innerHTML = '';
    overlay.style.display = 'block';
    for (let i = 0; i < 35; i++) {
      setTimeout(() => {
        const d = document.createElement('div');
        d.className = 'clown-emoji';
        d.textContent = '🤡';
        d.style.left = Math.random() * window.innerWidth + 'px';
        d.style.top  = Math.random() * window.innerHeight + 'px';
        overlay.appendChild(d);
        setTimeout(() => d.remove(), 3000);
      }, i * 70);
    }
    setTimeout(() => { overlay.style.display = 'none'; overlay.innerHTML = ''; }, 5500);
  }

  function driveVan() {
    const van = document.createElement('div');
    van.textContent = '🚐';
    van.style.cssText = 'position:fixed;bottom:60px;left:-80px;font-size:3rem;z-index:9998;transition:left 1.8s ease-in-out;pointer-events:none;';
    document.body.appendChild(van);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => { van.style.left = (window.innerWidth + 100) + 'px'; });
    });
    setTimeout(() => van.remove(), 2200);
    toast('🚐 vroom');
  }

})();
