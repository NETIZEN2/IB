import { initPriorityFeed } from '../../src/components/PriorityFeed.js';
import { fetchPriorityFeed } from '../../src/api/fetchPriorityFeed.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

jest.mock('../../src/api/fetchPriorityFeed.js');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fixture = JSON.parse(readFileSync(resolve(__dirname, '../fixtures/priorityFeed.json'), 'utf8'));

test('initPriorityFeed populates feed', async () => {
  fetchPriorityFeed.mockResolvedValue(fixture);
  document.body.innerHTML = '<div id="priority-feed"></div>';
  await initPriorityFeed();
  expect(document.getElementById('priority-feed').innerHTML).toContain(fixture.message);
});
