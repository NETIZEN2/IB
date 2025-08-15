import { renderNetworkGraph } from './NetworkGraph.js';
import { renderTimelineChart } from './TimelineChart.js';
import { renderGeoMap } from './GeoMap.js';

document.addEventListener('DOMContentLoaded', () => {
  const analysisPanel = document.getElementById('analysis-panel');
  const container = document.createElement('div');
  container.innerHTML = `
    <div id="viz-tabs" class="flex gap-2 border-b-2 border-black p-2">
      <button class="control-btn active" data-tab="graph">Network</button>
      <button class="control-btn" data-tab="timeline">Timeline</button>
      <button class="control-btn" data-tab="map">Map</button>
    </div>
    <div id="graph" class="h-64"></div>
    <div id="timeline" class="h-64 hidden"><canvas id="timeline-canvas"></canvas></div>
    <div id="map" class="h-64 hidden"></div>
  `;
  analysisPanel.appendChild(container);

  renderNetworkGraph({
    nodes: [{ id: 'A' }, { id: 'B' }, { id: 'C' }],
    links: [
      { source: 'A', target: 'B' },
      { source: 'B', target: 'C' }
    ]
  }, '#graph');

  renderTimelineChart('timeline-canvas', {
    labels: ['Jan', 'Feb', 'Mar'],
    data: [3, 5, 2]
  });

  renderGeoMap('map', [
    { lat: 0, lng: 0, label: 'Null Island' },
    { lat: 51.5, lng: -0.09, label: 'London' }
  ]);

  container.querySelectorAll('#viz-tabs button').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('#viz-tabs button').forEach(b => b.classList.remove('active'));
      container.querySelectorAll('#graph, #timeline, #map').forEach(p => p.classList.add('hidden'));
      btn.classList.add('active');
      const target = btn.dataset.tab;
      container.querySelector(`#${target}`).classList.remove('hidden');
    });
  });
});
