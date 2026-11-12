(() => {
  const root = document.documentElement;
  const body = document.body;
  const sun = document.querySelector('#sun');
  const moon = document.querySelector('#moon');
  const stars = document.querySelector('#stars');
  const meta = document.querySelector('meta[name="theme-color"]');
  const year = document.querySelector('#current-year');
  if (year) year.textContent = String(new Date().getFullYear());

  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
  const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const mix = (a, b, t) => {
    const x = hex(a);
    const y = hex(b);
    return '#' + x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, '0')).join('');
  };

  const keys = [
    { h: 5.5,  top: '#ffcdb9', bot: '#ffe8d2', hb: '#efbfa8', hf: '#e3a692' },
    { h: 7.5,  top: '#ffe1b8', bot: '#fff1d8', hb: '#e8cfa6', hf: '#d6b88e' },
    { h: 10,   top: '#e3f3e6', bot: '#fffaec', hb: '#c4e1c8', hf: '#a9d1b3' },
    { h: 12.5, top: '#d8f0ea', bot: '#fffdf4', hb: '#bddfd0', hf: '#9fcfba' },
    { h: 15.5, top: '#f9cf86', bot: '#fde9bf', hb: '#d9b970', hf: '#c2a257' },
    { h: 17.4, top: '#f6b27a', bot: '#fbd3a0', hb: '#cc8c5e', hf: '#b3724b' },
    { h: 18.3, top: '#e07a64', bot: '#f4a77c', hb: '#93505a', hf: '#763e52' },
    { h: 19.3, top: '#4a2a5e', bot: '#8a4468', hb: '#2f1f48', hf: '#211648' },
    { h: 21,   top: '#1b1d4a', bot: '#3a3566', hb: '#13153a', hf: '#0c0e28' },
    { h: 24,   top: '#090b22', bot: '#171a45', hb: '#080a1d', hf: '#04050f' }
  ];

  const palette = (h) => {
    if (h <= keys[0].h) return keys[0];
    for (let i = 0; i < keys.length - 1; i++) {
      const a = keys[i];
      const b = keys[i + 1];
      if (h <= b.h) {
        const t = (h - a.h) / (b.h - a.h);
        return { top: mix(a.top, b.top, t), bot: mix(a.bot, b.bot, t), hb: mix(a.hb, b.hb, t), hf: mix(a.hf, b.hf, t) };
      }
    }
    return keys[keys.length - 1];
  };

  for (let i = 0; i < 90; i++) {
    const s = document.createElement('i');
    const size = Math.random() < 0.15 ? 2.6 : Math.random() < 0.5 ? 1.8 : 1.2;
    s.style.cssText = 'left:' + (Math.random() * 100).toFixed(2) + '%;top:' + (Math.random() * 100).toFixed(2) + '%;width:' + size + 'px;height:' + size + 'px;opacity:' + (0.35 + Math.random() * 0.65).toFixed(2);
    if (i % 6 === 0) { s.className = 'tw'; s.style.animationDelay = (-Math.random() * 4).toFixed(1) + 's'; }
    stars.appendChild(s);
  }

  const sections = [...document.querySelectorAll('main > section[data-h1]')];
  let tops = [];
  const measure = () => {
    tops = sections.map((el) => ({
      y: el.getBoundingClientRect().top + window.scrollY,
      h: el.offsetHeight,
      h1: Number(el.dataset.h1),
      h2: Number(el.dataset.h2)
    }));
  };

  const hourAt = (yc) => {
    if (!tops.length) return 5.7;
    if (yc <= tops[0].y) return tops[0].h1;
    for (let i = 0; i < tops.length; i++) {
      const cur = tops[i];
      const next = tops[i + 1];
      const end = next ? next.y : cur.y + cur.h;
      if (yc < end) {
        const to = next ? next.h1 : cur.h2;
        return cur.h1 + (to - cur.h1) * clamp((yc - cur.y) / (end - cur.y), 0, 1);
      }
    }
    return tops[tops.length - 1].h2;
  };

  const label = (h) => {
    const total = Math.round(h * 60);
    const hh = Math.floor(total / 60) % 24;
    const mm = total % 60;
    const h12 = hh % 12 === 0 ? 12 : hh % 12;
    return h12 + ':' + String(mm).padStart(2, '0') + ' ' + (hh < 12 ? 'a.m.' : 'p.m.');
  };

  let ticking = false;
  const update = () => {
    ticking = false;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const h = hourAt(window.scrollY + vh * 0.45);
    const p = palette(h);
    const st = root.style;
    st.setProperty('--sky-top', p.top);
    st.setProperty('--sky-bot', p.bot);
    st.setProperty('--hill-back', p.hb);
    st.setProperty('--hill-front', p.hf);
    const night = clamp((h - 18.8) / 2, 0, 1);
    st.setProperty('--night', night.toFixed(3));

    const horizon = vh * 0.86;
    const sp = (h - 6) / 12;
    const elev = Math.sin(Math.PI * sp);
    const sx = vw * (0.14 + 0.72 * clamp(sp, 0, 1));
    const sy = horizon - elev * vh * 0.62 + (sp < 0 || sp > 1 ? Math.abs(elev) * vh * 0.2 : 0);
    sun.style.transform = 'translate3d(' + sx.toFixed(1) + 'px,' + sy.toFixed(1) + 'px,0)';
    sun.style.opacity = String(1 - clamp((h - 18.4) / 0.5, 0, 1));

    const mq = (h - 18.6) / 9;
    const mx = vw * (0.14 + 0.72 * clamp(mq, 0, 1));
    const my = horizon - Math.sin(Math.PI * clamp(mq, 0, 1)) * vh * 0.58;
    moon.style.transform = 'translate3d(' + mx.toFixed(1) + 'px,' + my.toFixed(1) + 'px,0)';

    const dark = h >= 18.75;
    body.dataset.tone = dark ? 'dark' : 'light';
    if (meta) meta.setAttribute('content', p.top);
    window.__hour = h;
  };

  const request = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', () => { measure(); request(); });
  window.addEventListener('load', () => { measure(); update(); });
  measure();
  update();
})();
