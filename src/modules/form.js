import gsap from 'gsap';

export const initForm = () => {
  const form = document.getElementById('recruitment-form');
  const confirmation = document.getElementById('confirmation');
  const errorEl = document.querySelector('.form-error');

  if (!form || !confirmation) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    form.classList.add('form-attempted');

    // Validation
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const name = (data.name || '').trim();
    const alias = (data.alias || '').trim();
    const age = parseInt(data.age, 10);
    const why = (data.why || '').trim();
    const skill = (data.skill || '').trim();
    const oath1 = formData.has('oath1');
    const oath2 = formData.has('oath2');
    const oath3 = formData.has('oath3');

    let errorMessage = '';
    let firstInvalidField = null;

    if (!name || !alias || !why || !skill) {
      errorMessage = 'All names must be given.';
      firstInvalidField = !name ? form.querySelector('#name') :
                          !alias ? form.querySelector('#alias') :
                          !why ? form.querySelector('#why') :
                          form.querySelector('#skill');
    } else if (isNaN(age) || age < 13 || age > 120) {
      errorMessage = 'Age must be between 13 and 120.';
      firstInvalidField = form.querySelector('#age');
    } else if (!oath1 || !oath2 || !oath3) {
      errorMessage = 'The oath is not optional.';
      firstInvalidField = !oath1 ? form.querySelector('input[name="oath1"]') :
                          !oath2 ? form.querySelector('input[name="oath2"]') :
                          form.querySelector('input[name="oath3"]');
    }

    if (errorMessage) {
      errorEl.textContent = errorMessage;
      errorEl.hidden = false;
      requestAnimationFrame(() => {
        errorEl.classList.add('visible');
      });
      gsap.fromTo(errorEl, { x: -6 }, { x: 0, duration: 0.4, ease: 'elastic.out(1, 0.3)' });
      if (firstInvalidField) firstInvalidField.focus();
      return;
    }

    // Valid — hide error
    errorEl.classList.remove('visible');
    setTimeout(() => { errorEl.hidden = true; }, 300);

    // Capture data
    console.log('[Obsidian Order] Submission:', JSON.stringify(data, null, 2));

    // Sealing animation
    try {
      if (prefersReducedMotion) {
        form.style.display = 'none';
        confirmation.hidden = false;
        const confirmText = confirmation.querySelector('.confirmation-text');
        if (confirmText) confirmText.style.opacity = '1';
      } else {
        const tl = gsap.timeline();

        tl.to('.form-stage', {
          opacity: 0,
          y: -40,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power2.in',
          onComplete: () => {
            form.style.display = 'none';
            confirmation.hidden = false;
          }
        });

        tl.call(() => {
          const sigilPaths = confirmation.querySelectorAll('.sigil-path');
          const sigilCore = confirmation.querySelector('.sigil-core');

          sigilPaths.forEach((path) => {
            const length = path.getTotalLength();
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;
          });

          const sigilTl = gsap.timeline();

          sigilPaths.forEach((path, i) => {
            sigilTl.to(
              path,
              {
                strokeDashoffset: 0,
                duration: 2,
                ease: 'power2.inOut'
              },
              i * 0.3
            );
          });

          sigilTl.to(
            sigilCore,
            {
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out'
            },
            '-=0.6'
          );

          sigilTl.fromTo(
            '.confirmation-text',
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
          );

          sigilTl.to('.confirmation-text', {
            textShadow: '0 0 24px rgba(201,169,110,0.6), 0 0 48px rgba(139,0,0,0.3)',
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          });

          sigilTl.call(() => {
            if (window.__lenis) {
              window.__lenis.scrollTo('#confirmation', { duration: 1.5 });
            }

            // If user already solved the puzzle, show the mark
            if (localStorage.getItem('obsidian-21-solved') === 'true') {
              const markEl = document.createElement('p');
              markEl.className = 'confirmation-mark';
              markEl.textContent = 'You carry the mark of the twenty-first.';
              confirmation.appendChild(markEl);

              if (!prefersReducedMotion) {
                gsap.fromTo(markEl, { opacity: 0, y: 10 }, { opacity: 0.75, y: 0, duration: 0.8, delay: 0.5 });
              } else {
                markEl.style.opacity = '0.75';
              }
            }
          });
        });
      }

      // Safety fallback
      setTimeout(() => {
        const confirmText = confirmation.querySelector('.confirmation-text');
        if (confirmText && getComputedStyle(confirmText).opacity === '0') {
          confirmText.style.opacity = '1';
          confirmation.hidden = false;
          form.style.display = 'none';
        }
      }, 4000);

    } catch (err) {
      console.error('[Obsidian Order] Animation error:', err);
      form.style.display = 'none';
      confirmation.hidden = false;
      const confirmText = confirmation.querySelector('.confirmation-text');
      if (confirmText) confirmText.style.opacity = '1';
    }
  });
};
