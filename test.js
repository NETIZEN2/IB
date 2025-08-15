import { readFileSync } from 'fs';
import { normalizeItem, fetchFile } from './src/data/index.js';

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

const rawItems = [
  { title: 'A', link: 'http://a', pubDate: '2024-01-01T00:00:00Z' },
  { headline: 'B', url: 'http://b', date: '2024-02-02T00:00:00Z' }
];
const normalized = rawItems.map(i => normalizeItem(i, 'test'));
if (normalized[0].title !== 'A' || normalized[1].title !== 'B') {
  console.error('Normalization failed');
  process.exit(1);
}
console.log('Normalization works');

const fileItems = await fetchFile('./public/data/sample-items.json');
if (!Array.isArray(fileItems) || fileItems.length !== 2) {
  console.error('File fetch failed');
  process.exit(1);
}
console.log('File fetch works');
