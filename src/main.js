import { initPriorityFeed } from './components/PriorityFeed.js';
import { initAnalysisPanel } from './components/AnalysisPanel.js';

document.addEventListener('DOMContentLoaded', async () => {
  const [{ renderHeader }, { renderPriorityFeed }, { renderAnalysisPanel }] = await Promise.all([
    import('./components/layout/Header.js'),
    import('./components/layout/PriorityFeed.js'),
    import('./components/layout/AnalysisPanel.js')
  ]);

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
