import gsap from 'gsap';

const REVEAL_KEY = 'obsidian-21-revealed';
const SOLVED_KEY = 'obsidian-21-solved';

export const revealTwentyOne = () => {
  const hidden21 = document.getElementById('hidden-21');
  if (!hidden21) return;

  localStorage.setItem(REVEAL_KEY, 'true');
  hidden21.hidden = false;
  hidden21.tabIndex = 0;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    hidden21.classList.add('is-revealed');
  } else {
    setTimeout(() => {
      hidden21.classList.add('is-revealed');
    }, 50);
  }
};

const initPuzzle = () => {
  const hidden21 = document.getElementById('hidden-21');
  const overlay = document.getElementById('ritual-overlay');
  const closeBtn = document.getElementById('ritual-close');
  const ritualForm = document.getElementById('ritual-form');
  const ritualAnswer = document.getElementById('ritual-answer');
  const ritualError = document.getElementById('ritual-error');
  const ritualReward = document.getElementById('ritual-reward');
  const cipherDisplay = document.querySelector('.cipher-display');
  const ritualSub = document.querySelector('.ritual-sub');
  const ritualSub2 = document.querySelector('.ritual-sub-2');
  const ritualKey = document.querySelector('.ritual-key');
  const ritualSigil = document.querySelector('.ritual-sigil');

  if (!hidden21 || !overlay) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isRevealed = localStorage.getItem(REVEAL_KEY) === 'true';
  const isSolved = localStorage.getItem(SOLVED_KEY) === 'true';

  // Restore state on page load
  if (isRevealed) {
    hidden21.hidden = false;
    hidden21.tabIndex = 0;
    hidden21.classList.add('is-revealed');
    
    if (isSolved) {
      hidden21.classList.add('solved');
    }
  }

  const lockScroll = () => {
    if (window.__lenis) {
      window.__lenis.stop();
    }
    document.body.style.overflow = 'hidden';
  };

  const unlockScroll = () => {
    if (window.__lenis) {
      window.__lenis.start();
    }
    document.body.style.overflow = '';
  };

  const openOverlay = () => {
    overlay.hidden = false;
    requestAnimationFrame(() => {
      overlay.classList.add('is-open');
    });
    lockScroll();

    // If already solved, show reward state immediately
    if (isSolved && ritualReward) {
      if (cipherDisplay) cipherDisplay.hidden = true;
      if (ritualSub) ritualSub.hidden = true;
      if (ritualSub2) ritualSub2.hidden = true;
      if (ritualKey) ritualKey.hidden = true;
      if (ritualForm) ritualForm.hidden = true;
      ritualReward.hidden = false;
    }

    setTimeout(() => {
      if (ritualAnswer && !isSolved) ritualAnswer.focus();
    }, 500);
  };

  const closeOverlay = () => {
    overlay.classList.remove('is-open');
    setTimeout(() => {
      overlay.hidden = true;
    }, 500);
    unlockScroll();
    hidden21.focus();
  };

  // Discovery: click on the "21"
  hidden21.addEventListener('click', openOverlay);
  hidden21.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openOverlay();
    }
  });

  // Close: button, Escape, or backdrop click
  if (closeBtn) {
    closeBtn.addEventListener('click', closeOverlay);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeOverlay();
    }
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeOverlay();
    }
  });

  // Validation
  if (ritualForm) {
    ritualForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const answer = (ritualAnswer.value || '').trim().toUpperCase().replace(/[\s\-\.\,]/g, '');

      const validAnswers = ['ART', 'ARTS', 'THEART'];
      const isValid = validAnswers.includes(answer);

      if (!isValid) {
        if (ritualError) {
          ritualError.textContent = 'The word eludes you.';
          ritualError.hidden = false;
          requestAnimationFrame(() => {
            ritualError.classList.add('visible');
          });
        }
        gsap.fromTo(ritualAnswer, { x: -8 }, { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
        ritualAnswer.focus();
        return;
      }

      // Valid — hide error
      if (ritualError) {
        ritualError.classList.remove('visible');
        setTimeout(() => {
          ritualError.hidden = true;
        }, 300);
      }

      // Mark as solved
      localStorage.setItem(SOLVED_KEY, 'true');
      hidden21.classList.add('solved');

      // Reward sequence
      if (prefersReducedMotion) {
        if (cipherDisplay) cipherDisplay.hidden = true;
        if (ritualSub) ritualSub.hidden = true;
        if (ritualSub2) ritualSub2.hidden = true;
        if (ritualKey) ritualKey.hidden = true;
        if (ritualForm) ritualForm.hidden = true;
        if (ritualReward) ritualReward.hidden = false;
      } else {
        const tl = gsap.timeline();

        tl.to([ritualSub, ritualSub2, cipherDisplay, ritualKey, ritualForm], {
          opacity: 0,
          y: -20,
          duration: 0.5,
          stagger: 0.08,
          onComplete: () => {
            if (cipherDisplay) cipherDisplay.hidden = true;
            if (ritualSub) ritualSub.hidden = true;
            if (ritualSub2) ritualSub2.hidden = true;
            if (ritualKey) ritualKey.hidden = true;
            if (ritualForm) ritualForm.hidden = true;
          }
        });

        tl.call(() => {
          if (ritualReward) ritualReward.hidden = false;
        });

        tl.to(ritualSigil, {
          rotation: 360,
          duration: 2,
          ease: 'power2.inOut'
        }, '-=0.3');

        // Redraw sigil
        tl.call(() => {
          const sigilPaths = ritualSigil.querySelectorAll('.sigil-path');
          sigilPaths.forEach((path) => {
            const length = path.getTotalLength();
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;
          });

          gsap.to(sigilPaths, {
            strokeDashoffset: 0,
            duration: 2,
            ease: 'power2.inOut',
            stagger: 0.3
          });
        }, null, '-=1.8');

        tl.fromTo('.reward-text', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.5');

        tl.fromTo('.reward-link', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(2)' }, '-=0.6');

        tl.fromTo('.reward-mark', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(2)' }, '-=0.4');

        tl.to('.reward-mark', {
          boxShadow: '0 0 20px rgba(201,169,110,0.6)',
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        }, '+=1.5');
      }
    });
  }
};

export default initPuzzle;
