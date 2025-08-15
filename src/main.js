import { initPriorityFeed } from './components/PriorityFeed.js';
import { initAnalysisPanel } from './components/AnalysisPanel.js';

function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

function toggleTheme() {
  const current = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', next);
  applyTheme(next);
  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.setAttribute('aria-checked', next === 'dark');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initPriorityFeed();
  initAnalysisPanel();

  const storedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(storedTheme);

  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
    themeToggle.setAttribute('aria-checked', storedTheme === 'dark');
  }

  document.addEventListener('keydown', (e) => {
    if (e.altKey) {
      switch (e.key) {
        case 's':
          e.preventDefault();
          document.getElementById('rfi-search-input')?.focus();
          break;
        case 'e':
          e.preventDefault();
          document.getElementById('export-btn')?.click();
          break;
        case 't':
          e.preventDefault();
          toggleTheme();
          break;
      }
    }
  });

  const filterControls = document.getElementById('filter-controls');
  if (filterControls) {
    filterControls.addEventListener('click', (e) => {
      const button = e.target.closest('button[data-sort]');
      if (!button) return;
      filterControls.querySelectorAll('button[data-sort]').forEach((btn) => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-pressed', 'true');
    });
  }
});
