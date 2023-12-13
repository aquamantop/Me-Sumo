import { test, expect } from '@playwright/test';

test('Testing Header', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page.locator('div').filter({ hasText: 'RegistrarseIniciar sesión' }).nth(2)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Registrarse' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Iniciar sesión' })).toBeVisible();
});

test('Testing Body', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page.getByRole('tab', { name: 'Eventos' })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Clubes' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Próximos eventos' })).toBeVisible();
  await expect(page.locator('.MuiGrid-root > div').first()).toBeVisible();
  await expect(page.locator('.MuiPaper-root > div:nth-child(2) > div').first()).toBeVisible();
  await expect(page.locator('.MuiPaper-root > div:nth-child(2) > div:nth-child(2)').first()).toBeVisible();
  await expect(page.locator('.MuiGrid-root > div:nth-child(3)').first()).toBeVisible();
  await expect(page.getByRole('tablist')).toContainText('Eventos');
  await expect(page.getByRole('tablist')).toContainText('Clubes');
  await expect(page.locator('#root')).toContainText('Próximos eventos');
  await expect(page.locator('#root')).toContainText('Todos los eventos');
  await expect(page.locator('.MuiGrid-root > div:nth-child(3) > div > div:nth-child(2) > div').first()).toBeVisible();
  await expect(page.locator('div:nth-child(3) > div > div:nth-child(2) > div:nth-child(2)')).toBeVisible();
  await expect(page.locator('.MuiGrid-root > div:nth-child(3) > div > div:nth-child(2) > div:nth-child(3)')).toBeVisible();
});


test('Testing Footer', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page.getByText('Tus ganas de jugar, ya no se')).toBeVisible();
  await expect(page.locator('#root')).toContainText('Tus ganas de jugar, ya no se postergan');
  await expect(page.locator('header').filter({ hasText: 'Tus ganas de jugar, ya no se' }).getByRole('button').first()).toBeVisible();
  await expect(page.locator('header').filter({ hasText: 'Tus ganas de jugar, ya no se' }).getByRole('button').nth(1)).toBeVisible();
  await expect(page.locator('header').filter({ hasText: 'Tus ganas de jugar, ya no se' }).getByRole('button').nth(2)).toBeVisible();
});