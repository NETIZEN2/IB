import assert from 'assert';
import { scoreItem } from '../src/analysis/dispatcher.js';

const item = {
  text: 'Urgent issue needs immediate attention',
  metrics: { current: 200, average: 100 }
};

const failingClient = {
  score: async () => { throw new Error('AI down'); }
};

const run = async () => {
  let logged = false;
  const originalError = console.error;
  console.error = () => { logged = true; };

  try {
    await scoreItem(item, { aiClient: failingClient });
    assert.fail('Expected scoreItem to throw');
  } catch (err) {
    assert(logged, 'Failure was not logged');
    assert.strictEqual(err.fallbackScore, 2);
  } finally {
    console.error = originalError;
  }

  console.log('Dispatcher failure handling tests passed');
};

await run();
