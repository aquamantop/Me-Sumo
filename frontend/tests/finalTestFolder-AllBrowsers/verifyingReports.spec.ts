import { test, expect } from '@playwright/test';

test('Verificando funcionalidad de reportes - Rol Admin', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('francoAdmin@gmail.com');
  await page.getByPlaceholder('Email').press('Tab');
  await page.getByPlaceholder('Contraseña').fill('123456');
  await page.getByRole('button', { name: 'Iniciar Sesión', exact: true }).click();
  await expect(page.getByRole('heading', { name: '¡OK!' })).toBeVisible();
  await expect(page.getByText('¡Hola Franco!')).toBeVisible();
  await page.getByText('F', { exact: true }).click();
  await expect(page.getByRole('link', { name: 'Reporte' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Cerrar Sesión' })).toBeVisible();
  await page.getByRole('link', { name: 'Reporte' }).click();
  await expect(page.frameLocator('iframe[title="MeSumoDash"]').getByText('Power BIPlease sign in to')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Descargar PDF' })).toBeVisible();
  await page.getByRole('button', { name: 'Descargar PDF' }).click();
  await page.getByText('F', { exact: true }).click();
  await page.getByRole('link', { name: 'Cerrar Sesión' }).click();
});