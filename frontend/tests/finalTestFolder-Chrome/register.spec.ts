import { test, expect } from '@playwright/test';

test('Registro exitoso de nuevo usuario', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Registrarse' }).click();
  await expect(page.getByText('¡Hola!')).toBeVisible();
  await expect(page.getByText('¡Qué alegría que te unas a')).toBeVisible();
  await page.getByPlaceholder('Nombre *').click();
  await page.getByPlaceholder('Nombre *').press('CapsLock');
  await page.getByPlaceholder('Nombre *').fill('F');
  await page.getByPlaceholder('Nombre *').press('CapsLock');
  await page.getByPlaceholder('Nombre *').fill('Federico');
  await page.getByPlaceholder('Nombre *').press('Tab');
  await page.getByPlaceholder('Apellido *').press('CapsLock');
  await page.getByPlaceholder('Apellido *').fill('B');
  await page.getByPlaceholder('Apellido *').press('CapsLock');
  await page.getByPlaceholder('Apellido *').fill('Bonesi');
  await page.getByPlaceholder('Apellido *').press('Tab');
  await page.getByPlaceholder('Apodo *').press('CapsLock');
  await page.getByPlaceholder('Apodo *').fill('T');
  await page.getByPlaceholder('Apodo *').press('CapsLock');
  await page.getByPlaceholder('Apodo *').fill('Tumba');
  await page.getByPlaceholder('Apodo *').press('Tab');
  await page.getByPlaceholder('Correo Electrónico *').fill('admbonesi1@gmail.com');
  await page.getByLabel('Open').click();
  await page.getByRole('option', { name: 'Balvanera' }).click();
  await page.getByPlaceholder('Contraseña *', { exact: true }).click();
  await page.getByPlaceholder('Contraseña *', { exact: true }).fill('nopuedodecirte');
  await page.getByPlaceholder('Contraseña *', { exact: true }).press('Tab');
  await page.getByPlaceholder('Repetir Contraseña *').fill('nopuedodecirte');
  await page.getByRole('button', { name: 'Registrarme' }).click();
  await expect(page.locator('html')).toContainText('¡OK!Registro exitoso¡OK!');
});

test('Registro no exitoso de un usuario ya registrado', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Registrarse' }).click();
  await page.getByPlaceholder('Nombre *').click();
  await page.getByPlaceholder('Nombre *').press('CapsLock');
  await page.getByPlaceholder('Nombre *').fill('P');
  await page.getByPlaceholder('Nombre *').press('CapsLock');
  await page.getByPlaceholder('Nombre *').fill('Pedro');
  await page.getByPlaceholder('Nombre *').press('Tab');
  await page.getByPlaceholder('Apellido *').press('CapsLock');
  await page.getByPlaceholder('Apellido *').fill('C');
  await page.getByPlaceholder('Apellido *').press('CapsLock');
  await page.getByPlaceholder('Apellido *').fill('Caceres');
  await page.getByPlaceholder('Apellido *').press('Tab');
  await page.getByPlaceholder('Apodo *').press('CapsLock');
  await page.getByPlaceholder('Apodo *').fill('P');
  await page.getByPlaceholder('Apodo *').press('CapsLock');
  await page.getByPlaceholder('Apodo *').fill('Pepe');
  await page.getByPlaceholder('Apodo *').press('Tab');
  await page.getByPlaceholder('Correo Electrónico *').fill('admbonesi1@gmail.com');
  await page.getByPlaceholder('Correo Electrónico *').press('Tab');
  await page.getByPlaceholder('Contraseña *', { exact: true }).fill('123456789');
  await page.getByPlaceholder('Contraseña *', { exact: true }).press('Tab');
  await page.getByPlaceholder('Repetir Contraseña *').fill('123456');
  await page.getByRole('button', { name: 'Registrarme' }).click();
  await page.getByText('Las contraseñas no coinciden').click({
    button: 'right'
  });
  await page.getByPlaceholder('Repetir Contraseña *').click();
  await page.getByPlaceholder('Repetir Contraseña *').fill('123456789');
  await page.getByRole('button', { name: 'Registrarme' }).click();
  await expect(page.getByText('Usuario ya registrado.')).toBeVisible();
});