import { renderHeader } from './components/layout/Header.js';
import { renderPriorityFeed } from './components/layout/PriorityFeed.js';
import { renderAnalysisPanel } from './components/layout/AnalysisPanel.js';
import { initPriorityFeed } from './components/PriorityFeed.js';
import { initAnalysisPanel } from './components/AnalysisPanel.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (app) {
    app.innerHTML = `
      <div class="w-1/2 flex flex-col h-full">
        ${renderHeader()}
        ${renderPriorityFeed()}
      </div>
      ${renderAnalysisPanel()}
    `;
  }
  initPriorityFeed();
  initAnalysisPanel();
});
