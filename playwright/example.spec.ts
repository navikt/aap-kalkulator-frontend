import { test, expect, Page } from '@playwright/test';

import AxeBuilder from '@axe-core/playwright';
const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];
const checkWcag = async (page: Page) => new AxeBuilder({ page }).withTags(wcagTags).analyze()
test('Gå igjennom kalkulatoren og sjekk WCAG', async ({ page }) => {
await page.goto('http://localhost:3000/aap/kalkulator');
let wcagRes = await checkWcag(page);
await expect(wcagRes.violations).toEqual([]);

await page.getByRole('button', { name: 'Start' }).click()
await expect(page.getByRole('heading', { name: 'Helse' })).toBeVisible()
wcagRes = await checkWcag(page);
await expect(wcagRes.violations).toEqual([]);



});
