import { test, expect } from '@playwright/test';

test('Verificacion de campos en login', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page.locator('div').filter({ hasText: 'RegistrarseIniciar sesión' }).nth(2)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Iniciar sesión' })).toBeVisible();
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await expect(page.getByText('¡Hola!')).toBeVisible();
  await expect(page.getByText('¿Qué actividad vas a hacer')).toBeVisible();
  await expect(page.getByPlaceholder('Email')).toBeVisible();
  await expect(page.getByPlaceholder('Contraseña')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Iniciar Sesión', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Olvidé mi constraseña' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Todavía no tenés usuario?' })).toBeVisible();
});

test('Verificacion de campos y logica de forgot-reset password', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByRole('link', { name: 'Olvidé mi constraseña' }).click();
  await expect(page.getByRole('heading', { name: 'Restablecer Contraseña' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Ingresa tu correo electrónico' })).toBeVisible();
  await expect(page.getByPlaceholder('Email')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Enviar mail' })).toBeVisible();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('fefu@gmail.com');
  await page.getByRole('button', { name: 'Enviar mail' }).click();
  await expect(page.getByText('Listo! Revisa tu casilla de')).toBeVisible();
});

test('Verificacion logica de change password desde MiPerfil', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('pablito@gmail.com');
  await page.getByPlaceholder('Email').press('Tab');
  await page.getByPlaceholder('Contraseña').fill('123456');
  await page.getByRole('button', { name: 'Iniciar Sesión', exact: true }).click();
  await expect(page.getByText('¡Hola Pablo!')).toBeVisible();
  await page.getByText('P', { exact: true }).click();
  await page.getByRole('link', { name: 'Mi Perfil' }).click();
  await page.getByLabel('Cambiar contraseña').click();
  await expect(page.getByRole('heading', { name: 'Nueva Contraseña' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Ingresa tu los datos para' })).toBeVisible();
  await expect(page.getByPlaceholder('Contraseña actual *')).toBeVisible();
  await expect(page.getByPlaceholder('Nueva contraseña *', { exact: true })).toBeVisible();
  await expect(page.getByPlaceholder('Repetir Nueva Contraseña *')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Guardar' })).toBeVisible();
  await page.getByPlaceholder('Contraseña actual *').click();
  await page.getByPlaceholder('Contraseña actual *').fill('123456');
  await page.getByPlaceholder('Contraseña actual *').press('Tab');
  await page.getByPlaceholder('Nueva contraseña *', { exact: true }).fill('123456789');
  await page.getByPlaceholder('Nueva contraseña *', { exact: true }).press('Tab');
  await page.getByPlaceholder('Repetir Nueva Contraseña *').fill('123456789');
  await page.getByRole('button', { name: 'Guardar' }).click();
});