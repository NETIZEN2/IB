import { keywordMatch, trendDetector, scoreItem } from '../src/analysis/dispatcher.js';

const item = {
  text: 'Urgent issue needs immediate attention',
  metrics: { current: 200, average: 100 }
};

describe('rule-based analysis', () => {
  test('keywordMatch finds both keywords', () => {
    expect(keywordMatch(item, ['urgent', 'issue'])).toBe(1);
  });

  test('trendDetector detects upward trend', () => {
    expect(trendDetector(item)).toBe(1);
  });

  test('scoreItem uses rules when no aiClient provided', async () => {
    await expect(scoreItem(item)).resolves.toBe(2);
  });

  test('scoreItem falls back to rules when aiClient fails', async () => {
    const failingClient = { score: async () => { throw new Error('AI down'); } };
    await expect(scoreItem(item, { aiClient: failingClient })).resolves.toBe(2);
  });
});
