import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const fixture = JSON.parse(readFileSync(resolve(__dirname, '../fixtures/priorityFeed.json'), 'utf8'));

test('app initializes feeds', async ({ page }) => {
  await page.route('/api/priority-feed', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(fixture)
    });
  });

  await page.goto('http://localhost:5173');
  await expect(page.locator('#priority-feed')).toContainText(fixture.message);
  await expect(page.locator('#analysis-panel')).toContainText('Analysis panel ready.');
});
