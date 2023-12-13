import { test, expect } from '@playwright/test';

test('Testing Card Event', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page.locator('.MuiPaper-root > div:nth-child(2) > div').first()).toBeVisible();
  await expect(page.locator('#root')).toContainText('Club: Futbol Retiro');
  await expect(page.locator('#root')).toContainText('Ganador se lleva 100k usd');
  await expect(page.locator('#root')).toContainText('Fecha: 2023-12-13');
  await expect(page.locator('#root')).toContainText('Inicio: 17:00:00');
  await expect(page.locator('#root')).toContainText('Lugares Disponibles: 9');
});

test('Testing VerMas Inside', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page.locator('.MuiPaper-root > div:nth-child(2) > div').first()).toBeVisible();
  await expect(page.locator('#root')).toContainText('Club: Futbol Retiro');
  await expect(page.locator('#root')).toContainText('Ganador se lleva 100k usd');
  await expect(page.locator('#root')).toContainText('Fecha: 2023-12-13');
  await expect(page.locator('#root')).toContainText('Inicio: 17:00:00');
  await expect(page.locator('#root')).toContainText('Lugares Disponibles: 9');
  await expect(page.locator('.MuiTypography-root > .MuiButtonBase-root').first()).toBeVisible();
  await page.locator('.MuiTypography-root > .MuiButtonBase-root').first().click();
  await expect(page.locator('h5')).toContainText('Club: Futbol Retiro');
  await expect(page.locator('#root')).toContainText('Evento: Futbol 5');
  await expect(page.getByRole('button', { name: '¡Me Sumo!' })).toBeVisible();
  await expect(page.locator('#root')).toContainText('Quedan 9 lugares');
  await expect(page.getByRole('heading', { name: 'Fecha: 2023-12-13 17:00:' })).toBeVisible();
  await expect(page.getByText('Mensaje del organizador:')).toBeVisible();
});