import { renderNetworkGraph } from '../visualizations/networkGraph.js';
import { renderSentimentTimeline } from '../visualizations/sentimentTimeline.js';
import { networkData, sentimentData } from '../visualizations/fixtures.js';

export function initAnalysisPanel() {
  const panel = document.getElementById('analysis-panel');
  if (panel) {
    panel.innerHTML = `
      <div id="network-graph" class="mb-4"></div>
      <canvas id="sentiment-timeline" height="200"></canvas>
    `;

    const networkEl = panel.querySelector('#network-graph');
    renderNetworkGraph(networkEl, networkData);

    const timelineCtx = panel
      .querySelector('#sentiment-timeline')
      .getContext('2d');
    renderSentimentTimeline(timelineCtx, sentimentData);
  }
}
