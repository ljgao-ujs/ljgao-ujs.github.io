// Decorative effects preserve the native cursor and never gate access to content.
(() => {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const art = document.querySelector('.sound-art');
  const cards = document.querySelectorAll('.research-card');
  const progress = document.querySelector('.reading-progress');
  const follower = document.createElement('div');
  follower.className = 'cursor-spectrum-trail';
  follower.setAttribute('aria-hidden', 'true');
  const samples = [];
  const maxSamples = 48, sampleSpacing = 6, trailLifetime = 650;
  const bars = Array.from({ length: maxSamples }, () => {
    const bar = document.createElement('i');
    follower.append(bar);
    return bar;
  });
  document.body.append(follower);
  const interactiveSelector = 'a, button, summary';
  let pointerFrame = 0, scrollFrame = 0;
  let lastPointer = null;
  let traveled = 0;
  const ripples = new Set();
  let revealObserver;
  const animations = new Set();
  const pointerEnabled = () => finePointer.matches && !reducedMotion.matches;

  function drawSpectrum(now) {
    while (samples.length && now - samples[0].time >= trailLifetime) samples.shift();
    if (!samples.length) {
      follower.classList.remove('visible');
      pointerFrame = 0;
      return;
    }
    bars.forEach((bar, index) => {
      const sample = samples[index];
      if (!sample) { bar.style.opacity = '0'; return; }
      const life = Math.max(0, 1 - (now - sample.time) / trailLifetime);
      const pulse = 0.7 + 0.3 * Math.abs(Math.sin(now * 0.01 + sample.phase));
      const height = 3 + sample.amplitude * life * pulse;
      bar.style.height = `${height.toFixed(2)}px`;
      bar.style.transform = `translate3d(${sample.x.toFixed(2)}px, ${(sample.y + 12).toFixed(2)}px, 0) translate(-50%, -50%)`;
      bar.style.opacity = (life * 0.65).toFixed(3);
    });
    follower.classList.add('visible');
    pointerFrame = requestAnimationFrame(drawSpectrum);
  }
  function hideFollower() {
    lastPointer = null;
    samples.length = 0;
    traveled = 0;
    bars.forEach(bar => { bar.style.opacity = '0'; });
    follower.classList.remove('visible', 'over-control');
    cancelAnimationFrame(pointerFrame);
    pointerFrame = 0;
  }
  document.addEventListener('pointermove', event => {
    if (!pointerEnabled() || event.pointerType !== 'mouse') return;
    const now = performance.now();
    const point = { x: event.clientX, y: event.clientY, time: now };
    if (!lastPointer || now - lastPointer.time > trailLifetime) {
      samples.length = 0;
      traveled = 0;
      samples.push({ ...point, phase: 0, amplitude: 7 });
      lastPointer = point;
    } else {
      const dx = point.x - lastPointer.x, dy = point.y - lastPointer.y;
      const distance = Math.hypot(dx, dy);
      // Spatial sampling keeps the bars evenly spaced at different mouse rates.
      const steps = Math.floor(distance / sampleSpacing);
      if (steps > 0) {
        const speed = Math.min(1, distance / Math.max(8, now - lastPointer.time) / 2);
        const origin = lastPointer;
        for (let i = Math.max(1, steps - maxSamples + 1); i <= steps; i++) {
          const t = i * sampleSpacing / distance;
          const phase = (traveled + i * sampleSpacing) * 0.25;
          samples.push({ x: origin.x + dx * t, y: origin.y + dy * t,
            time: origin.time + (now - origin.time) * t, phase,
            amplitude: 5 + (8 + speed * 18) * Math.abs(Math.sin(phase)) });
        }
        const t = steps * sampleSpacing / distance;
        lastPointer = { x: origin.x + dx * t, y: origin.y + dy * t,
          time: origin.time + (now - origin.time) * t };
        traveled += steps * sampleSpacing;
      }
    }
    if (samples.length > maxSamples) samples.splice(0, samples.length - maxSamples);
    follower.classList.toggle('over-control', !!event.target.closest(interactiveSelector));
    if (!pointerFrame) pointerFrame = requestAnimationFrame(drawSpectrum);
  }, { passive: true });
  document.documentElement.addEventListener('pointerleave', hideFollower);
  window.addEventListener('blur', hideFollower);
  document.addEventListener('keydown', event => { if (event.key === 'Tab') hideFollower(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) hideFollower(); });
  document.addEventListener('pointerdown', event => {
    if (!pointerEnabled() || event.pointerType !== 'mouse' || event.button !== 0) return;
    if (event.target.closest('input, textarea, select, [contenteditable="true"]')) return;
    if (ripples.size >= 6) {
      const oldest = ripples.values().next().value;
      oldest.remove();
      ripples.delete(oldest);
    }
    const ripple = document.createElement('span');
    ripple.className = 'sound-ripple';
    ripple.setAttribute('aria-hidden', 'true');
    ripple.style.left = `${event.clientX}px`;
    ripple.style.top = `${event.clientY}px`;
    for (let i = 0; i < 3; i++) {
      const ring = document.createElement('i');
      ring.style.setProperty('--ring-delay', `${i * 100}ms`);
      ripple.append(ring);
    }
    document.body.append(ripple);
    ripples.add(ripple);
    setTimeout(() => { ripple.remove(); ripples.delete(ripple); }, 1100);
  }, { passive: true });

  function resetCard(card) {
    card.classList.remove('pointer-active');
    card.style.removeProperty('--tilt-x');
    card.style.removeProperty('--tilt-y');
  }
  cards.forEach(card => {
    card.addEventListener('pointermove', event => {
      if (!pointerEnabled() || event.pointerType !== 'mouse') return;
      const rect = card.getBoundingClientRect();
      const dx = (event.clientX - rect.left) / rect.width - 0.5;
      const dy = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty('--spot-x', `${(dx + 0.5) * 100}%`);
      card.style.setProperty('--spot-y', `${(dy + 0.5) * 100}%`);
      card.style.setProperty('--tilt-x', `${-dy * 4}deg`);
      card.style.setProperty('--tilt-y', `${dx * 4}deg`);
      card.classList.add('pointer-active');
    }, { passive: true });
    card.addEventListener('pointerleave', () => resetCard(card));
  });
  function resetArt() {
    art.classList.remove('is-listening');
    art.style.removeProperty('--sound-x');
    art.style.removeProperty('--sound-y');
  }
  art.addEventListener('pointermove', event => {
    if (!pointerEnabled() || event.pointerType !== 'mouse') return;
    const rect = art.getBoundingClientRect();
    art.style.setProperty('--sound-x', `${((event.clientX - rect.left) / rect.width - 0.5) * 18}px`);
    art.style.setProperty('--sound-y', `${((event.clientY - rect.top) / rect.height - 0.5) * 12}px`);
    art.classList.add('is-listening');
  }, { passive: true });
  art.addEventListener('pointerleave', resetArt);

  function updateProgress() {
    const distance = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0})`;
    scrollFrame = 0;
  }
  function queueProgress() {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateProgress);
  }
  window.addEventListener('scroll', queueProgress, { passive: true });
  window.addEventListener('resize', queueProgress, { passive: true });
  if ('ResizeObserver' in window) new ResizeObserver(queueProgress).observe(document.body);
  updateProgress();

  function configureMotion() {
    hideFollower(); cards.forEach(resetCard); resetArt();
    ripples.forEach(ripple => ripple.remove());
    ripples.clear();
    revealObserver?.disconnect();
    animations.forEach(animation => animation.cancel());
    animations.clear();
    if (reducedMotion.matches || !('IntersectionObserver' in window)) return;
    // Content stays visible if an observer or animation is unavailable.
    revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const animation = entry.target.animate([
        { opacity: 0.35, translate: '0 20px' },
        { opacity: 1, translate: '0 0' }
      ], { duration: 650, easing: 'cubic-bezier(.2,.65,.3,1)' });
      animations.add(animation);
      animation.onfinish = () => animations.delete(animation);
      revealObserver.unobserve(entry.target);
    }), { threshold: 0.12 });
    document.querySelectorAll('.section-heading, .about-content, .research-card, .projects, .timeline, .experience-aside, .contact-inner').forEach(element => revealObserver.observe(element));
  }
  reducedMotion.addEventListener('change', configureMotion);
  finePointer.addEventListener('change', () => { hideFollower(); cards.forEach(resetCard); resetArt(); });
  configureMotion();
})();
