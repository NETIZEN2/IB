import { readFileSync } from 'fs';

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

const requiredAria = ['settings-btn', 'theme-toggle', 'rfi-search-input', 'rfi-search-btn', 'export-btn'];
for (const id of requiredAria) {
  const pattern = new RegExp(`<[^>]*id="${id}"[^>]*aria-label=`, 'i');
  if (!pattern.test(html)) {
    console.error(`Accessibility: element #${id} missing aria-label`);
    process.exit(1);
  }
}

const filterButtons = html.match(/<button[^>]*data-sort="[^"]+"[^>]*>/gi) || [];
if (filterButtons.some(btn => !/aria-pressed=/.test(btn))) {
  console.error('Accessibility: sort buttons missing aria-pressed');
  process.exit(1);
}

console.log('Accessibility checks passed');
