import assert from 'assert';
import { keywordMatch, trendDetector, scoreItem } from '../src/analysis/dispatcher.js';

const item = {
  text: 'Urgent issue needs immediate attention',
  metrics: { current: 200, average: 100 }
};

// keywordMatch should find both 'urgent' and 'issue'
assert.strictEqual(keywordMatch(item, ['urgent', 'issue']), 1);
// trendDetector should see current > average
assert.strictEqual(trendDetector(item), 1);

const run = async () => {
  // dispatcher without AI client uses rules
  const score = await scoreItem(item);
  assert.strictEqual(score, 2);

  // dispatcher with failing AI client falls back to rules
  const failingClient = { score: async () => { throw new Error('AI down'); } };
  const fallbackScore = await scoreItem(item, { aiClient: failingClient });
  assert.strictEqual(fallbackScore, 2);

  console.log('Rule tests passed');
};

await run();
