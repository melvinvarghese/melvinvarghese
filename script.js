(() => {
  const year = document.querySelector('#current-year');
  if (year) year.textContent = String(new Date().getFullYear());

  const body = document.body;
  const marker = document.querySelector('#gauge-marker');
  const gauge = document.querySelector('.gauge');
  const depthNum = document.querySelector('#depth-num');
  const stops = [...document.querySelectorAll('.gauge-stops a')];
  const sections = [...document.querySelectorAll('[data-from]')];
  const darkFrom = document.querySelector('#twilight');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
  const fmt = (n) => Math.round(n).toLocaleString('en');

  const placeStops = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    document.querySelectorAll('.gauge-stops li').forEach((li) => {
      const a = li.querySelector('a');
      const target = a && document.querySelector(a.getAttribute('href'));
      if (!target || max <= 0) return;
      const top = target.getBoundingClientRect().top + window.scrollY;
      li.style.setProperty('--at', clamp(top / max, 0, 1).toFixed(4));
    });
  };

  let ticking = false;
  const update = () => {
    ticking = false;
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const progress = max > 0 ? clamp(window.scrollY / max, 0, 1) : 0;
    if (marker && gauge) marker.style.top = (progress * 100) + '%';

    const mid = window.innerHeight * 0.5;
    let depth = 0;
    let current = sections[0];
    for (const el of sections) {
      const r = el.getBoundingClientRect();
      const from = Number(el.dataset.from);
      const to = Number(el.dataset.to);
      if (r.top <= mid) {
        current = el;
        const t = r.height > 0 ? clamp((mid - r.top) / r.height, 0, 1) : 1;
        depth = from + (to - from) * t;
      }
    }
    if (depthNum) depthNum.textContent = fmt(depth);

    const dark = darkFrom ? darkFrom.getBoundingClientRect().top <= window.innerHeight * 0.35 : false;
    body.dataset.tone = dark ? 'dark' : 'light';
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', dark ? '#083f47' : '#e9fbf6');

    const id = current && current.id;
    stops.forEach((a) => {
      const on = id && a.getAttribute('href') === '#' + (id === 'about' ? 'surface' : id);
      a.setAttribute('aria-current', on ? 'true' : 'false');
    });
  };

  const request = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', () => { placeStops(); request(); });
  window.addEventListener('load', placeStops);
  placeStops();
  update();

  if (!reduced && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.plate.lit').forEach((plate) => {
      plate.addEventListener('pointermove', (e) => {
        const r = plate.getBoundingClientRect();
        plate.style.setProperty('--px', (e.clientX - r.left) + 'px');
        plate.style.setProperty('--py', (e.clientY - r.top) + 'px');
      });
    });
  }
})();
