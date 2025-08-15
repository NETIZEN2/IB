import fs from 'fs';

// Syntax check for inline scripts
const html = fs.readFileSync('index.html', 'utf8');
const regex = /<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
let match;
while ((match = regex.exec(html)) !== null) {
  try {
    new Function(match[1]);
  } catch (err) {
    console.error('Syntax error in script:', err.message);
    process.exit(1);
  }
}

// Minimal DOM stubs
global.window = {
  document: {
    elements: {},
    createElement(tag) {
      const el = { tagName: tag.toUpperCase(), style: {}, children: [], appendChild(child) { this.children.push(child); }, setAttribute() {} };
      return el;
    },
    createElementNS(ns, tag) {
      return this.createElement(tag);
    },
    getElementById(id) {
      if (!this.elements[id]) {
        this.elements[id] = { id, style: {}, children: [], appendChild(child) { this.children.push(child); }, setAttribute() {} };
      }
      return this.elements[id];
    },
    querySelector(sel) { return this.getElementById(sel.replace('#', '')); }
  },
  navigator: {}
};

global.document = global.window.document;

global.window.HTMLCanvasElement = function () {};
global.window.HTMLCanvasElement.prototype.getContext = () => ({});

// Stub libraries
function d3Obj() {
  return {
    append() { return d3Obj(); },
    attr() { return this; },
    selectAll() { return this; },
    data() { return this; },
    join() { return this; },
    call() { return this; },
    text() { return this; }
  };
}

window.d3 = {
  select() { return d3Obj(); },
  forceSimulation() { return { force() { return this; }, on() {} }; },
  forceLink() { return { id() { return this; }, distance() { return this; } }; },
  forceManyBody() { return { strength() { return this; } }; },
  forceCenter() { return {}; },
  drag() { return { on() { return this; } }; }
};

window.Chart = class {
  constructor() {}
};

window.L = {
  map() { return { setView() { return this; } }; },
  tileLayer() { return { addTo() { return this; } }; },
  marker() { return { addTo() { return { bindPopup() {} }; } }; }
};

const { renderNetworkGraph } = await import('./src/components/NetworkGraph.js');
const { renderTimelineChart } = await import('./src/components/TimelineChart.js');
const { renderGeoMap } = await import('./src/components/GeoMap.js');

try {
  renderNetworkGraph({ nodes: [{ id: 'a' }, { id: 'b' }], links: [{ source: 'a', target: 'b' }] }, '#graph');
  renderTimelineChart('timeline-canvas', { labels: ['Jan'], data: [1] });
  renderGeoMap('map', [{ lat: 0, lng: 0, label: 'Origin' }]);
  console.log('Visualization modules executed');
} catch (err) {
  console.error('Visualization test failed', err);
  process.exit(1);
}
