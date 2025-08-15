import { readFileSync } from 'fs';
import assert from 'assert';

const html = readFileSync('index.html', 'utf8');

const inlineScriptRegex = /<script\b(?![^>]*\bsrc=)[^>]*>[\s\S]*?<\/script>/i;
const inlineStyleRegex = /<style[\s\S]*?>[\s\S]*?<\/style>/i;
const distScriptRegex = /<script[^>]*src="dist\/[^\"]+"[^>]*><\/script>/i;
const distStyleRegex = /<link[^>]*rel="stylesheet"[^>]*href="dist\/[^\"]+"[^>]*>/i;

assert(!inlineScriptRegex.test(html), 'Inline scripts detected');
assert(!inlineStyleRegex.test(html), 'Inline styles detected');
assert(distScriptRegex.test(html), 'Compiled script not referenced');
assert(distStyleRegex.test(html), 'Compiled stylesheet not referenced');

console.log('Index.html structure looks good');
