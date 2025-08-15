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
