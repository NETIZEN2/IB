const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const scripts = [];
const regex = /<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
let match;
while ((match = regex.exec(html)) !== null) {
  scripts.push(match[1]);
}

try {
  scripts.forEach((code, idx) => {
    new Function(code);
  });
  console.log('Syntax check passed');
} catch (err) {
  console.error('Syntax error in script:', err.message);
  process.exit(1);
}

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

['settings-btn', 'rfi-search-input', 'rfi-search-btn', 'export-btn', 'theme-toggle'].forEach(id => {
  assert(new RegExp(`<[^>]*id="${id}"[^>]*aria-label=`, 'i').test(html), `Element #${id} missing aria-label`);
});

assert(/id="theme-toggle"/.test(html), 'Missing theme toggle button');
assert(/card\.tabIndex\s*=\s*0/.test(html), 'Priority cards missing tabIndex assignment');
assert(/source-header[^\n]*tabindex="0"/.test(html), 'Source headers missing tabindex');

console.log('Accessibility checks passed');
