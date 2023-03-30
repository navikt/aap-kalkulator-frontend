import { expect, test } from '@playwright/test';

test('BadPath', async ({ page }) => {
  await page.goto('http://localhost:3000/aap/kalkulator');
  //Informasjons side
  await expect(
    page.getByRole('heading', {
      name: 'Finn ut omtrent hvor mye du kan få i AAP',
    })
  ).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Vær oppmerksom på dette' })).toBeVisible();
  await page.getByRole('button', { name: 'Start' }).click();

  //Helse side
  await page.getByRole('button', { name: 'Gå videre' }).click();
  await expect(page.getByText('Velg enten ja eller nei for å gå videre.')).toBeVisible();
  await page
    .getByRole('combobox', {
      name: 'Hvilket år ble du så syk at du måtte jobbe mindre enn 50%?',
    })
    .selectOption('2019');
  await page.getByText('Ja').first().click();
  await page.getByRole('button', { name: 'Gå videre' }).click();

  //Inntekt side
  await expect(page.getByRole('heading', { name: 'Inntekt' })).toBeVisible();
  await page.getByRole('button', { name: 'Gå videre' }).click();
  await expect(page.getByText('Du må velge enten ja eller nei for å gå videre.')).toBeVisible();
  await page.getByLabel('Nei').check();
  await page.getByLabel('Ja').check();
  await page.getByLabel('Inntekt 2016').fill('123 4424');
  await page.getByLabel('Inntekt 2017').fill('12 3214');
  await page.getByRole('button', { name: 'Gå videre' }).click();
  await expect(page.getByText('Fyll inn inntekt.')).toBeVisible();
  await page.getByLabel('Inntekt 2018').fill('21 3213');
  await page.getByRole('button', { name: 'Gå videre' }).click();

  //Arbeid side
  await page.getByRole('button', { name: 'Gå videre' }).click();
  await expect(page.getByText('Du må svare på om du har AAP')).toBeVisible();
  await expect(page.getByText('Velg enten ja eller nei for å gå videre.')).toBeVisible();
  await page.getByRole('group', { name: 'Får du AAP nå?' }).getByLabel('Nei').check();
  await page.getByRole('group', { name: 'Jobber du nå?' }).getByLabel('Ja').check();
  await page.getByRole('button', { name: 'Gå videre' }).click();
  await page.getByRole('button', { name: 'Gå videre' }).click();

  await expect(page.getByText('Du må skrive et postitivt tall. Tallet kan inneholde desimaler.')).toBeVisible();
  await page.getByLabel('Hvor mange timer jobber du per uke?').click();
  await page.getByLabel('Hvor mange timer jobber du per uke?').fill('12');

  await page.getByRole('button', { name: 'Gå videre' }).click();

  //Barn side
  await page.getByLabel('Ja').check();
  await page.getByRole('button', { name: 'Gå videre' }).click();
  await expect(page.getByText('Antall barn må være et tall.')).toBeVisible();
  await page.getByLabel('Hvor mange barn forsørger du?').fill('2');
  await page.getByRole('button', { name: 'Gå videre' }).click();

  //Resultat side
  await expect(page.getByRole('heading', { name: 'Det ser ut som du kan få' })).toBeVisible();
});
