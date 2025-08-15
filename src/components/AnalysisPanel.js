export function initAnalysisPanel(items = []) {
  const panel = document.getElementById('analysis-panel');
  if (panel) {
    const sources = new Set(items.map(i => i.source));
    panel.innerHTML = `<p class=\"text-gray-600\">Loaded ${items.length} items from ${sources.size} sources.</p>`;
  }
}
