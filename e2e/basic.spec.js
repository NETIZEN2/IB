const { test, expect } = require('@playwright/test');
const path = require('path');

test('index loads with correct title', async ({ page }) => {
  const filePath = 'file://' + path.resolve(__dirname, '..', 'index.html');
  await page.goto(filePath);
  await expect(page).toHaveTitle('Automated Intelligence Briefing');
});
