import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initAnimations = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Lenis setup (skip if reduced motion)
  if (!prefersReducedMotion) {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    window.__lenis = lenis;
  }

  // Sigil draw animation
  const sigilPaths = document.querySelectorAll('.sigil-path');
  const sigilCore = document.querySelector('.sigil-core');

  if (!prefersReducedMotion && sigilPaths.length > 0) {
    sigilPaths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
    });

    const tl = gsap.timeline({ delay: 0.5 });

    sigilPaths.forEach((path, i) => {
      tl.to(
        path,
        {
          strokeDashoffset: 0,
          duration: 2.5,
          ease: 'power2.inOut'
        },
        i * 0.3
      );
    });

    tl.to(
      sigilCore,
      {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out'
      },
      '-=0.6'
    );

    // Entry content reveal
    tl.fromTo(
      '.entry-title',
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
      1.5
    );

    tl.fromTo(
      '.entry-sub',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      2.2
    );

    tl.fromTo(
      '.entry-scroll-hint',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      3
    );
  } else if (prefersReducedMotion) {
    // Simple fade-in for reduced motion
    gsap.set(['.entry-title', '.entry-sub', '.entry-scroll-hint', '.sigil-core'], {
      opacity: 1
    });
  }

  // Entry pin + blur-out on scroll
  if (!prefersReducedMotion) {
    ScrollTrigger.create({
      trigger: '.entry-section',
      start: 'top top',
      end: '+=100%',
      pin: true,
      pinSpacing: true,
      scrub: 1,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(['.sigil', '.entry-title', '.entry-sub', '.entry-scroll-hint'], {
          scale: 1 + progress * 1.5,
          opacity: 1 - progress,
          filter: `blur(${progress * 20}px)`
        });
        gsap.set('.sigil', {
          rotation: progress * 60
        });
      }
    });
  }

  // Text split utility
  const splitLines = (el) => {
    const text = el.textContent;
    const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
    el.innerHTML = lines
      .map((line) => `<span class="line"><span class="line-inner">${line}</span></span>`)
      .join('');
  };

  document.querySelectorAll('[data-split]').forEach(splitLines);

  // Animate split text on scroll
  document.querySelectorAll('[data-split]').forEach((el) => {
    const lineInners = el.querySelectorAll('.line-inner');
    if (lineInners.length > 0) {
      gsap.set(lineInners, { yPercent: 110 });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
        onEnter: () => {
          gsap.to(lineInners, {
            yPercent: 0,
            duration: 1.2,
            ease: 'power4.out',
            stagger: 0.08
          });
        },
        onLeaveBack: () => {
          gsap.to(lineInners, {
            yPercent: 110,
            duration: 0.6,
            ease: 'power2.in',
            stagger: 0.04
          });
        }
      });
    }
  });

  // Re-scan for dynamically added content
  setTimeout(() => {
    document.querySelectorAll('[data-split]').forEach((el) => {
      if (!el.querySelector('.line')) {
        splitLines(el);
      }
    });
  }, 100);

  // Form stage scroll reveals
  if (!prefersReducedMotion) {
    gsap.utils.toArray('.form-stage').forEach((stage) => {
      const heading = stage.querySelector('h2');
      const fields = stage.querySelectorAll('.field, .oath-check, .submit-btn, .stage-index');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      });

      if (heading) {
        tl.from(heading.querySelectorAll('.line-inner'), {
          yPercent: 110,
          duration: 1.2,
          ease: 'power4.out',
          stagger: 0.08
        });
      }

      if (fields.length) {
        tl.from(fields, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1
        }, '-=0.6');
      }
    });
  }
};
