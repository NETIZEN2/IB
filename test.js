import assert from 'assert';
import { getAnalysis, registerPlugin } from './src/analysis/index.js';

async function run() {
  const text = 'Barack Obama visited Paris. It was an amazing trip but the weather was terrible.';
  const result = await getAnalysis(text);
  assert(result.entities.includes('Barack Obama'), 'Entity extraction failed');
  assert(typeof result.sentiment.score === 'number', 'Sentiment score missing');
  assert(result.summary.startsWith('Barack Obama'), 'Summary incorrect');
  registerPlugin({
    name: 'wordCount',
    analyze: async t => t.split(/\s+/).length
  });
  const resultWithPlugin = await getAnalysis('Hello world');
  assert(resultWithPlugin.wordCount === 2, 'Plugin interface failed');
  console.log('All tests passed');
}

run();
