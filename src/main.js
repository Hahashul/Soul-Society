import './style.css';
import { initBackground } from './modules/background.js';
import { initCursor } from './modules/cursor.js';
import { initAnimations } from './modules/animations.js';
import { initForm } from './modules/form.js';
import initPuzzle from './modules/puzzle.js';

const init = () => {
  initBackground();
  initCursor();
  initForm();
  initAnimations();
  initPuzzle();

  if (import.meta.env.DEV) {
    console.log(
      '%c⬡ Obsidian Order initialized',
      'color: #c9a96e; font-family: serif; font-size: 14px;'
    );
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
