import { readFileSync } from 'fs';
import { networkData, sentimentData } from './src/visualizations/fixtures.js';

const html = readFileSync('index.html', 'utf8');

const inlineScriptRegex = /<script\b(?![^>]*\bsrc=)[^>]*>[\s\S]*?<\/script>/i;
const inlineStyleRegex = /<style[\s\S]*?>[\s\S]*?<\/style>/i;
const distScriptRegex = /<script[^>]*src="dist\/[^\"]+"[^>]*><\/script>/i;
const distStyleRegex = /<link[^>]*rel="stylesheet"[^>]*href="dist\/[^\"]+"[^>]*>/i;

if (inlineScriptRegex.test(html)) {
  console.error('Inline scripts detected');
  process.exit(1);
}

if (inlineStyleRegex.test(html)) {
  console.error('Inline styles detected');
  process.exit(1);
}

if (!distScriptRegex.test(html)) {
  console.error('Compiled script not referenced');
  process.exit(1);
}

if (!distStyleRegex.test(html)) {
  console.error('Compiled stylesheet not referenced');
  process.exit(1);
}

console.log('Index.html structure looks good');

// Validate network graph data fixture
if (!Array.isArray(networkData.nodes) || !Array.isArray(networkData.links)) {
  console.error('Network data fixture is invalid');
  process.exit(1);
}

// Validate sentiment timeline data fixture
if (
  !Array.isArray(sentimentData) ||
  !sentimentData.every((d) => 'date' in d && 'sentiment' in d)
) {
  console.error('Sentiment data fixture is invalid');
  process.exit(1);
}

console.log('Visualization data fixtures look good');
