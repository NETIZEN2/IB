import { initPriorityFeed } from './components/PriorityFeed.js';
import { initAnalysisPanel } from './components/AnalysisPanel.js';
import { fetchFromSources } from './data/index.js';
import { sources } from './data/sampleConfig.js';

document.addEventListener('DOMContentLoaded', async () => {
  const items = await fetchFromSources(sources);
  initPriorityFeed(items);
  initAnalysisPanel(items);
});
