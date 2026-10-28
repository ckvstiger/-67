// Particle network background
const c = document.getElementById('bg'), ctx = c.getContext('2d');
let pts = [];
function resize() {
  c.width = innerWidth; c.height = innerHeight;
  pts = Array.from({ length: Math.min(110, innerWidth / 12) }, () => ({
    x: Math.random() * c.width, y: Math.random() * c.height,
    vx: (Math.random() - .5) * .5, vy: (Math.random() - .5) * .5
  }));
}
resize(); addEventListener('resize', resize);
const mouse = { x: -999, y: -999 };
addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
(function draw() {
  ctx.clearRect(0, 0, c.width, c.height);
  pts.forEach((p, i) => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > c.width) p.vx *= -1;
    if (p.y < 0 || p.y > c.height) p.vy *= -1;
    ctx.fillStyle = '#00f0ff'; ctx.beginPath(); ctx.arc(p.x, p.y, 1.6, 0, 7); ctx.fill();
    for (let j = i + 1; j < pts.length; j++) {
      const q = pts[j], d = Math.hypot(p.x - q.x, p.y - q.y);
      if (d < 120) { ctx.strokeStyle = `rgba(139,92,246,${1 - d / 120})`; ctx.lineWidth = .5;
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
    }
    const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
    if (dm < 160) { ctx.strokeStyle = `rgba(0,240,255,${1 - dm / 160})`;
      ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); }
  });
  requestAnimationFrame(draw);
})();

// Typing effect
const phrases = ['商業經營 × 電子商務 × 智慧科技', '未來的數位商管跨領域人才', '新北中和 · 南山中學'];
let pi = 0, ci = 0, del = false;
const el = document.getElementById('typed');
(function type() {
  const s = phrases[pi];
  el.textContent = s.slice(0, ci += del ? -1 : 1);
  if (!del && ci === s.length) { del = true; return setTimeout(type, 1800); }
  if (del && ci === 0) { del = false; pi = (pi + 1) % phrases.length; }
  setTimeout(type, del ? 40 : 110);
})();

// Counters
document.querySelectorAll('[data-count]').forEach(b => {
  const t = +b.dataset.count; let n = 0;
  const iv = setInterval(() => { n += Math.ceil(t / 40); if (n >= t) { n = t; clearInterval(iv); } b.textContent = n; }, 35);
});

// Scroll reveal
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('active'); e.target.querySelector('.skills')?.classList.add('active'); }
}), { threshold: .2 });
document.querySelectorAll('.reveal').forEach(s => io.observe(s));
