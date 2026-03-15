// ---- SHARED NAV INJECTION ----
// Each page sets window.currentPage before loading this script
(function() {
  const pages = [
    { href: 'index.html',      label: 'Home' },
    { href: 'program.html',    label: 'Program' },
    { href: 'guidelines.html', label: 'Guidelines & Barriers' },
    { href: 'goals.html',      label: 'Goals & Evaluation' },
    { href: 'reflection.html', label: 'About' },
    { href: 'sources.html',    label: 'Sources' },
  ];

  const nav = document.getElementById('main-nav');
  if (nav) {
    const logo = document.createElement('a');
    logo.href = 'index.html';
    logo.className = 'nav-logo';
    logo.innerHTML = 'Wyn<span>Health</span> Rover';
    nav.appendChild(logo);

    const ul = document.createElement('ul');
    pages.forEach(p => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = p.href;
      a.textContent = p.label;
      if (window.currentPage === p.href) a.className = 'active';
      li.appendChild(a);
      ul.appendChild(li);
    });
    nav.appendChild(ul);
  }

  // ---- SHARED FOOTER INJECTION ----
  const footer = document.getElementById('main-footer');
  if (footer) {
    footer.innerHTML = `
      <div class="footer-logo">Wyn<span>Health</span> Rover</div>
      <p>Created by Aaryav &middot; Wyndham, Victoria &middot; 2025 &middot; HPE Assignment</p>
      <p class="footer-secret" title="...">&nbsp;&nbsp;no students were harmed in the making of this website&nbsp;&nbsp;&middot;&nbsp;&nbsp;<a href="clownface.html" style="color:inherit;text-decoration:none;">&#128064;</a></p>
    `;
  }

  // ---- FADE IN ON SCROLL ----
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
  }, { threshold: 0.08 });
  document.querySelectorAll('.fade').forEach(el => obs.observe(el));

  // ---- STAT COUNTERS ----
  function countUp(el) {
    const target = parseInt(el.dataset.target);
    const dur = 1500;
    const start = performance.now();
    function step(now) {
      const p = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      const val = Math.round(ease * target);
      el.textContent = (el.dataset.suffix || '') + val.toLocaleString() + (el.dataset.post || '');
      if (p < 1) requestAnimationFrame(step);
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
  }, { threshold: 0.3 });
  const statsEl = document.getElementById('stats');
  if (statsEl) statObs.observe(statsEl);

  // ---- KONAMI CODE → CLOWNFACE RAIN ----
  const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let ki = 0;
  document.addEventListener('keydown', e => {
    if (e.key === konami[ki]) { ki++; } else { ki = 0; }
    if (ki === konami.length) {
      ki = 0;
      launchClowns();
    }
  });

  // ---- "CLICK HERE IF YOU DISAGREE" button → clownface ----
  document.querySelectorAll('.disagree-btn').forEach(btn => {
    btn.addEventListener('click', () => launchClowns());
  });

  function launchClowns() {
    const overlay = document.getElementById('clown-overlay');
    if (!overlay) return;
    overlay.innerHTML = '';
    overlay.style.display = 'block';
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const d = document.createElement('div');
        d.className = 'clown-emoji';
        d.textContent = '🤡';
        d.style.left = Math.random() * window.innerWidth + 'px';
        d.style.top = Math.random() * window.innerHeight + 'px';
        overlay.appendChild(d);
        setTimeout(() => d.remove(), 3000);
      }, i * 80);
    }
    setTimeout(() => { overlay.style.display = 'none'; }, 5500);
  }

  // ---- VAN CLICK EASTER EGG (10 clicks) ----
  let vanClicks = 0;
  document.querySelectorAll('.van-click').forEach(el => {
    el.addEventListener('click', () => {
      vanClicks++;
      if (vanClicks >= 10) {
        vanClicks = 0;
        el.style.transition = 'transform 0.3s';
        el.style.transform = 'rotate(720deg) scale(1.5)';
        setTimeout(() => { el.style.transform = ''; }, 600);
        const msg = document.createElement('div');
        msg.textContent = "ok I get it, stop clicking me 😭";
        msg.style.cssText = 'position:fixed;bottom:30px;right:30px;background:#ff4500;color:white;padding:12px 18px;border-radius:8px;font-weight:bold;z-index:9999;font-size:0.95rem;';
        document.body.appendChild(msg);
        setTimeout(() => msg.remove(), 3000);
      }
    });
  });

  // ---- AARYAV CLICK EASTER EGG (3 clicks) ----
  let aaryavClicks = 0;
  document.querySelectorAll('.aaryav-click').forEach(el => {
    el.addEventListener('click', () => {
      aaryavClicks++;
      if (aaryavClicks >= 3) {
        aaryavClicks = 0;
        const msg = document.createElement('div');
        msg.textContent = "yes that's me, please stop clicking 😭";
        msg.style.cssText = 'position:fixed;bottom:30px;right:30px;background:#ff4500;color:white;padding:12px 18px;border-radius:8px;font-weight:bold;z-index:9999;font-size:0.95rem;';
        document.body.appendChild(msg);
        setTimeout(() => msg.remove(), 3000);
      }
    });
  });

  // ---- MOBILE: "still reading? respect." after 30s ----
  if (window.innerWidth < 700) {
    setTimeout(() => {
      const msg = document.createElement('div');
      msg.textContent = "still reading? respect. 👀";
      msg.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#16213e;border:1px solid #ff4500;color:#ff4500;padding:10px 18px;border-radius:8px;font-size:0.88rem;z-index:9999;';
      document.body.appendChild(msg);
      setTimeout(() => msg.remove(), 4000);
    }, 30000);
  }

})();
