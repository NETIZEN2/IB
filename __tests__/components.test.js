import { getByText, fireEvent } from '@testing-library/dom';
import { initAnalysisPanel } from '../src/components/AnalysisPanel.js';
import { initPriorityFeed } from '../src/components/PriorityFeed.js';

describe('DOM components', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  test('initAnalysisPanel populates the panel', () => {
    document.body.innerHTML = '<div id="analysis-panel"></div>';
    initAnalysisPanel();
    expect(getByText(document.body, 'Analysis panel ready.')).toBeTruthy();
  });

  test('initPriorityFeed renders and handles interaction', () => {
    document.body.innerHTML = '<div id="priority-feed"></div>';
    initPriorityFeed();
    const feedText = getByText(document.body, 'Priority feed loaded.');
    expect(feedText).toBeTruthy();
    fireEvent.click(feedText);
    expect(getByText(document.body, 'Priority feed loaded.')).toBeTruthy();
  });
});
