import { initAnalysisPanel } from '../../src/components/AnalysisPanel.js';

test('initAnalysisPanel populates panel', () => {
  document.body.innerHTML = '<div id="analysis-panel"></div>';
  initAnalysisPanel();
  expect(document.getElementById('analysis-panel').innerHTML).toContain('Analysis panel ready.');
});
