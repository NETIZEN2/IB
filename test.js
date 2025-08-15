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
