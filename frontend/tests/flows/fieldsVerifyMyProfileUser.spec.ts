import { test, expect } from '@playwright/test';

test('Verificacion de consistencia de datos en MiPerfil', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page.getByRole('button', { name: 'Iniciar sesión' })).toBeVisible();
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('jilmelarke@gufum.com');
  await page.getByPlaceholder('Email').press('Tab');
  await page.getByPlaceholder('Contraseña').fill('89898989');
  await page.getByRole('button', { name: 'Iniciar Sesión', exact: true }).click();
  await expect(page.getByText('¡Hola Fran!')).toBeVisible();
  await expect(page.locator('header').filter({ hasText: '¡Hola Fran!' }).locator('div').nth(3)).toBeVisible();
  await page.getByTestId('PersonIcon').locator('path').click();
  await expect(page.getByRole('link', { name: 'Mi Perfil' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Cerrar Sesión' })).toBeVisible();
  await page.getByRole('link', { name: 'Mi Perfil' }).click();
  await expect(page.locator('label').filter({ hasText: 'Nombre *' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Fran Dot' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Tus datos' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Tus eventos' })).toBeVisible();
  await expect(page.locator('label').filter({ hasText: 'Apellido *' })).toBeVisible();
  await expect(page.locator('label').filter({ hasText: 'Email *' })).toBeVisible();
  await expect(page.locator('label').filter({ hasText: 'Usuario *' })).toBeVisible();
  await expect(page.locator('label').filter({ hasText: 'Password' })).toBeVisible();
  await expect(page.getByText('¡Ups! parece que no te has')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Guardar Cambios' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Crear evento' })).toBeVisible();
});

test('Verificacion de guardado de datos', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page.getByRole('button', { name: 'Iniciar sesión' })).toBeVisible();
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('jilmelarke@gufum.com');
  await page.getByPlaceholder('Email').press('Tab');
  await page.getByPlaceholder('Contraseña').fill('89898989');
  await page.getByRole('button', { name: 'Iniciar Sesión', exact: true }).click();
  await expect(page.getByText('¡Hola Fran!')).toBeVisible();
  await expect(page.locator('header').filter({ hasText: '¡Hola Fran!' }).locator('div').nth(3)).toBeVisible();
  await page.getByTestId('PersonIcon').locator('path').click();
  await expect(page.getByRole('link', { name: 'Mi Perfil' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Cerrar Sesión' })).toBeVisible();
  await page.getByRole('link', { name: 'Mi Perfil' }).click();
  await expect(page.locator('label').filter({ hasText: 'Nombre *' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Fran Dot' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Tus datos' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Tus eventos' })).toBeVisible();
  await expect(page.locator('label').filter({ hasText: 'Apellido *' })).toBeVisible();
  await expect(page.locator('label').filter({ hasText: 'Email *' })).toBeVisible();
  await expect(page.locator('label').filter({ hasText: 'Usuario *' })).toBeVisible();
  await expect(page.locator('label').filter({ hasText: 'Password' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Guardar Cambios' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Crear evento' })).toBeVisible();
  await page.getByLabel('Nombre *').click();
  await page.getByLabel('Nombre *').fill('Francisco');
  await page.getByLabel('Nombre *').press('Tab');
  await page.locator('#outlined-required').nth(1).press('CapsLock');
  await page.locator('#outlined-required').nth(1).fill('D');
  await page.locator('#outlined-required').nth(1).press('CapsLock');
  await page.locator('#outlined-required').nth(1).fill('Dotto');
  await page.locator('#outlined-required').nth(3).click();
  await page.locator('#outlined-required').nth(3).fill('Pancho');
  await page.getByLabel('Open').click();
  await page.getByRole('option', { name: 'Chacarita' }).click();
  await page.getByRole('button', { name: 'Guardar Cambios' }).click();
  await expect(page.getByText('¡Datos actualizados!')).toBeVisible();
  await page.getByLabel('Close').click();
  await page.getByText('F', { exact: true }).click();
  await page.getByRole('link', { name: 'Cerrar Sesión' }).click();
});
