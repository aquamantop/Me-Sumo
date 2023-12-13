import { test, expect } from '@playwright/test';

test('Verificacion de campos en el register', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page.locator('div').filter({ hasText: 'RegistrarseIniciar sesión' }).nth(2)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Registrarse' })).toBeVisible();
  await page.getByRole('button', { name: 'Registrarse' }).click();
  await expect(page.getByText('¡Hola!')).toBeVisible();
  await expect(page.getByText('¡Qué alegría que te unas a')).toBeVisible();
  await expect(page.getByPlaceholder('Nombre *')).toBeVisible();
  await expect(page.getByPlaceholder('Apellido *')).toBeVisible();
  await expect(page.getByPlaceholder('Apodo *')).toBeVisible();
  await expect(page.getByPlaceholder('Correo Electrónico *')).toBeVisible();
  await expect(page.getByLabel('Opcional: Elegi tu Barrio')).toBeVisible();
  await page.getByLabel('Open').click();
  await expect(page.locator('#nhood-option-0')).toContainText('Agronomía');
  await expect(page.locator('#nhood-option-1')).toContainText('Almagro');
  await expect(page.locator('#nhood-option-2')).toContainText('Balvanera');
  await expect(page.locator('#nhood-option-3')).toContainText('Barracas');
  await expect(page.locator('#nhood-option-4')).toContainText('Belgrano');
  await expect(page.locator('#nhood-option-5')).toContainText('Boedo');
  await page.getByLabel('Close').click();
  await expect(page.getByPlaceholder('Contraseña *', { exact: true })).toBeVisible();
  await expect(page.getByPlaceholder('Repetir Contraseña *')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Registrarme' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '¿Ya tienes una cuenta?' })).toBeVisible();
});