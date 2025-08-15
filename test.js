import fs from 'fs';
import { saveItems, getAllItems, clearItems } from './src/data/store.js';
import { normalize } from './src/data/index.js';

// Syntax check for inline scripts in index.html
const html = fs.readFileSync('index.html', 'utf8');
const scripts = [];
const regex = /<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
let match;
while ((match = regex.exec(html)) !== null) {
  scripts.push(match[1]);
}
try {
  scripts.forEach(code => {
    new Function(code);
  });
  console.log('Syntax check passed');
} catch (err) {
  console.error('Syntax error in script:', err.message);
  process.exit(1);
}

// Data module tests
await clearItems();
await saveItems([
  { id: '1', title: 'Test', content: 'Body', source: 'unit', timestamp: new Date().toISOString() }
]);
const items = await getAllItems();
if (items.length !== 1 || items[0].title !== 'Test') {
  console.error('IndexedDB storage test failed');
  process.exit(1);
}

const norm = normalize({ title: 'A', content: 'B', source: 'S' });
if (!norm.id || norm.title !== 'A' || !norm.timestamp) {
  console.error('Normalization test failed');
  process.exit(1);
}

console.log('Data module tests passed');
