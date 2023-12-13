import { test, expect } from '@playwright/test';

test('Testing Pestaña Club', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page.getByRole('tab', { name: 'Clubes' })).toBeVisible();
  await page.getByRole('tab', { name: 'Clubes' }).click();
  await expect(page.getByRole('heading', { name: 'Clubes' })).toBeVisible();
  await expect(page.locator('.MuiPaper-root > div:nth-child(2) > div').first()).toBeVisible();
  await expect(page.locator('.MuiGrid-root > div:nth-child(3)')).toBeVisible();
  await expect(page.locator('.MuiGrid-root > div:nth-child(4)')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^12345…8$/ })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Ver Más' }).nth(1)).toBeVisible();
  await page.getByRole('button', { name: 'Ver Más' }).nth(1).click();
});

test('Testing Club Inside', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page.getByRole('tab', { name: 'Clubes' })).toBeVisible();
  await page.getByRole('tab', { name: 'Clubes' }).click();
  await expect(page.getByRole('heading', { name: 'Clubes' })).toBeVisible();
  await expect(page.locator('.MuiPaper-root > div:nth-child(2) > div').first()).toBeVisible();
  await expect(page.locator('.MuiGrid-root > div:nth-child(3)')).toBeVisible();
  await expect(page.locator('.MuiGrid-root > div:nth-child(4)')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^12345…8$/ })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Ver Más' }).nth(1)).toBeVisible();
  await page.getByRole('button', { name: 'Ver Más' }).nth(1).click();
  await expect(page.locator('div').filter({ hasText: 'RegistrarseIniciar sesión' }).nth(2)).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Distrito Fútbol | Salta' })).toBeVisible();
  await expect(page.locator('#root')).toContainText('Descripcion');
  await expect(page.locator('#root')).toContainText('Distrito Fútbol, el epicentro deportivo donde la competencia y la amistad convergen, creando una experiencia única en el mundo del fútbol local.');
  await expect(page.getByRole('heading', { name: 'Canchas y disponibilidad' })).toBeVisible();
  await expect(page.getByText('Cancha 7 F8Sintético | No')).toBeVisible();
  await expect(page.getByText('Cancha 1 F5Sintético | No')).toBeVisible();
  await expect(page.locator('.MuiTypography-root > .MuiButtonBase-root').first()).toBeVisible();
});