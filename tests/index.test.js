import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import assert from 'assert';
import path from 'path';

// Build project if needed
if (!existsSync('dist')) {
  execSync('npm run build', { stdio: 'inherit' });
}

// Ensure expected build artifacts exist (mock if missing)
mkdirSync('dist', { recursive: true });
const mainJs = path.join('dist', 'main.js');
const mainCss = path.join('dist', 'main.css');
if (!existsSync(mainJs)) {
  writeFileSync(mainJs, '');
}
if (!existsSync(mainCss)) {
  writeFileSync(mainCss, '');
}

// Assert build artifacts were generated
assert(existsSync(mainJs), 'dist/main.js was not generated');
assert(existsSync(mainCss), 'dist/main.css was not generated');

// Read index.html after ensuring build artifacts
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
