import gsap from 'gsap';

export const initCursor = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if ('ontouchstart' in window || window.matchMedia('(hover: none)').matches) {
    document.body.style.cursor = 'auto';
    return;
  }

  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  document.body.appendChild(cursor);

  const cursorDot = document.createElement('div');
  cursorDot.className = 'cursor-dot';
  document.body.appendChild(cursorDot);

  const cursorDuration = prefersReducedMotion ? 0 : 0.6;
  const dotDuration = prefersReducedMotion ? 0 : 0.1;

  const onMouseMove = (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: cursorDuration,
      ease: 'power3.out'
    });
    gsap.to(cursorDot, {
      x: e.clientX,
      y: e.clientY,
      duration: dotDuration,
      ease: 'none'
    });
  };

  window.addEventListener('mousemove', onMouseMove, { passive: true });

  const interactiveSelector = 'a, button, input, textarea, label, .oath-check';

  const onMouseOver = (e) => {
    if (e.target.closest(interactiveSelector)) {
      cursor.classList.add('cursor-hover');
    }
  };

  const onMouseOut = (e) => {
    if (e.target.closest(interactiveSelector)) {
      cursor.classList.remove('cursor-hover');
    }
  };

  document.addEventListener('mouseover', onMouseOver, { passive: true });
  document.addEventListener('mouseout', onMouseOut, { passive: true });

  const onMouseDown = () => {
    gsap.to(cursor, {
      scale: 0.8,
      duration: 0.2
    });
  };

  const onMouseUp = () => {
    gsap.to(cursor, {
      scale: 1,
      duration: 0.2
    });
  };

  document.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mouseup', onMouseUp);
};
