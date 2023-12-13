import { test, expect } from '@playwright/test';

test('Login exitoso de usuario registrado con rol USER', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('jilmelarke@gufum.com');
  await page.getByPlaceholder('Email').press('Tab');
  await page.getByPlaceholder('Contraseña').fill('898989');
  await page.getByPlaceholder('Contraseña').press('Enter');
  await expect(page.locator('form')).toContainText('Credenciales inválidas');
  await page.getByPlaceholder('Contraseña').click();
  await page.getByPlaceholder('Contraseña').fill('89898989');
  await page.getByRole('button', { name: 'Iniciar Sesión', exact: true }).click();
  await expect(page.locator('#root')).toContainText('¡Hola Fran!');
  await page.getByText('F', { exact: true }).click();
  await page.getByRole('link', { name: 'Cerrar Sesión' }).click();
});

test('Login exitoso de usuario registrado con rol CLUB', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('distritofutbol@gmail.com');
  await page.getByPlaceholder('Email').press('Tab');
  await page.getByPlaceholder('Contraseña').fill('89898989');
  await page.getByPlaceholder('Contraseña').press('Enter');
  await expect(page.locator('form')).toContainText('Credenciales inválidas');
  await page.getByPlaceholder('Contraseña').click();
  await page.getByPlaceholder('Contraseña').fill('distrito1234');
  await page.getByRole('button', { name: 'Iniciar Sesión', exact: true }).click();
  await expect(page.locator('#root')).toContainText('¡Hola Distrito Fútbol!');
  await page.getByText('D', { exact: true }).click();
  await page.getByRole('link', { name: 'Cerrar Sesión' }).click();
});

test('Login exitoso de usuario registrado con rol ADMIN', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('ferraro.mariaeugenia@gmail.com');
  await page.getByPlaceholder('Email').press('Tab');
  await page.getByPlaceholder('Contraseña').fill('898989');
  await page.getByPlaceholder('Contraseña').press('Enter');
  await expect(page.locator('form')).toContainText('Credenciales inválidas');
  await page.getByPlaceholder('Contraseña').click();
  await page.getByPlaceholder('Contraseña').fill('maru1234');
  await page.getByRole('button', { name: 'Iniciar Sesión', exact: true }).click();
  await expect(page.locator('#root')).toContainText('¡Hola Maria!');
  await page.getByText('M', { exact: true }).click();
  await page.getByRole('link', { name: 'Cerrar Sesión' }).click();
});