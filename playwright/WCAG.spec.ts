import AxeBuilder from '@axe-core/playwright';
import { Page, expect, test } from '@playwright/test';

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];
const checkWcag = async (page: Page) => new AxeBuilder({ page }).include('#__next').withTags(wcagTags).analyze();
const checkPageSemantics = async (page: Page, currentStep: string, previousStep: string, futureStep?: string) => {
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  await expect(page.getByRole('main')).toHaveCount(1);

  const stepper = page.getByRole('navigation', { name: 'Steg i skjema' });
  await expect(stepper).toBeVisible();
  await expect(stepper.locator('[aria-current="step"]').getByText(currentStep, { exact: true })).toBeVisible();
  await expect(stepper.getByRole('link', { name: currentStep })).toHaveCount(0);
  await expect(stepper.getByRole('link', { name: previousStep })).toBeVisible();

  if (futureStep) {
    await expect(stepper.getByRole('link', { name: futureStep })).toHaveCount(0);
  }
};

test('Gå igjennom kalkulatoren og sjekk WCAG', async ({ page }) => {
  await page.goto('http://localhost:3000/aap/kalkulator');

  let wcagRes = await checkWcag(page);
  await expect(wcagRes.violations).toEqual([]);
  await page.getByRole('button', { name: 'Start' }).click();

  await expect(page.getByRole('heading', { name: 'Helse' })).toBeVisible();
  wcagRes = await checkWcag(page);
  await expect(wcagRes.violations).toEqual([]);

  await page.getByLabel('Nei').click();
  await page.getByRole('button', { name: 'Gå videre' }).click();

  await expect(page.getByRole('heading', { name: 'Inntekt' })).toBeVisible();
  await checkPageSemantics(page, 'Inntekt', 'Helse', 'Arbeid');
  wcagRes = await checkWcag(page);
  await expect(wcagRes.violations).toEqual([]);
  await page.getByLabel('Nei').click();
  await page.getByRole('button', { name: 'Gå videre' }).click();

  await expect(page.getByRole('heading', { name: 'Arbeid' })).toBeVisible();
  wcagRes = await checkWcag(page);
  await expect(wcagRes.violations).toEqual([]);
  await page.getByRole('group', { name: 'Får du AAP nå?' }).getByLabel('Nei').check();
  await page.getByRole('group', { name: 'Jobber du nå?' }).getByLabel('Nei').check();
  await page.getByRole('button', { name: 'Gå videre' }).click();

  await expect(page.getByRole('heading', { name: 'Barn' })).toBeVisible();
  wcagRes = await checkWcag(page);
  await expect(wcagRes.violations).toEqual([]);
  await page.getByLabel('Nei').click();
  await page.getByRole('button', { name: 'Gå videre' }).click();

  await expect(page.getByText('Det ser ut som du kan få')).toBeVisible();
  await checkPageSemantics(page, 'Resultat', 'Barn');
  await expect(page.getByRole('link', { name: 'Gå til søknad om AAP', exact: true })).toHaveAttribute(
    'href',
    'https://www.nav.no/aap/soknad'
  );
  wcagRes = await checkWcag(page);
  await expect(wcagRes.violations).toEqual([]);
});
