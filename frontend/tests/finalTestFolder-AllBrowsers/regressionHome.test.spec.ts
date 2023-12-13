import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
})


test('Testing Labels', async ({ page }) => {
    await expect(page.locator('.MuiInputBase-root').first()).toBeVisible();
    await expect(page.locator('div:nth-child(3) > .MuiFormControl-root > .MuiInputBase-root')).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^Elegir Fecha$/ })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Buscar' })).toBeVisible();
    await page.getByLabel('Open').first().click();
    await expect(page.locator('#activity-option-0')).toContainText('Futbol 5');
    await expect(page.locator('#activity-option-1')).toContainText('Futbol 8');
    await expect(page.locator('#activity-option-2')).toContainText('Futbol 7');
    await page.getByLabel('Close').click();
    await page.getByLabel('Open').nth(1).click();
    await expect(page.locator('#nhood-option-0')).toContainText('Villa del Parque');
    await expect(page.locator('#nhood-option-1')).toContainText('Montserrat');
    await expect(page.locator('#nhood-option-2')).toContainText('Mataderos');
    await expect(page.locator('#nhood-option-3')).toContainText('Villa Crespo');
    await expect(page.locator('#nhood-option-4')).toContainText('Retiro');
    await expect(page.locator('#nhood-option-5')).toContainText('Nuñez');
    await expect(page.locator('#nhood-option-6')).toContainText('Flores');
    await page.getByLabel('Close').click();
    await page.getByPlaceholder('MM/DD/YYYY').click();
    await page.getByLabel('Choose date').click();
    await page.getByLabel('Previous month').click();
    await page.getByLabel('Next month').click();
})

test('Verificacion pestaña club', async ({ page }) => {
    await expect(page.getByRole('tab', { name: 'Clubes' })).toBeVisible();
    await page.getByRole('tab', { name: 'Clubes' }).click();
    await expect(page.getByRole('heading', { name: 'Clubes' })).toBeVisible();
    await expect(page.locator('.MuiPaper-root > div:nth-child(2) > div').first()).toBeVisible();
    await expect(page.locator('.MuiGrid-root > div:nth-child(3)')).toBeVisible();
    await expect(page.locator('.MuiGrid-root > div:nth-child(4)')).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^12345…8$/ })).toBeVisible();
    await page.getByLabel('Go to page 8').click();
    await expect(page.locator('div:nth-child(2) > .MuiGrid-root')).toBeVisible();
    await expect(page.locator('#root')).toContainText('Club: Solanas Fútbol');
    await expect(page.locator('#root')).toContainText('Dirección: Av. Francisco Beiró 2835');
    await expect(page.locator('#root')).toContainText('Barrio: Agronomía');
    await expect(page.locator('#root')).toContainText('Actvividades: Futbol 5');
    await expect(page.getByRole('button', { name: 'Ver Más' })).toBeVisible();
});

test('Verificacion pestaña eventos proximos y todos los eventos', async ({ page }) => {
    await expect(page.getByRole('tab', { name: 'Eventos' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Próximos eventos' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Todos los eventos' })).toBeVisible();
    await expect(page.locator('.MuiPaper-root > div:nth-child(2) > div').first()).toBeVisible();
    await expect(page.locator('.MuiPaper-root > div:nth-child(2) > div:nth-child(2)').first()).toBeVisible();
    await expect(page.locator('.MuiGrid-root > div:nth-child(3)').first()).toBeVisible();
    await expect(page.locator('.MuiGrid-root > div:nth-child(3) > div > div:nth-child(2) > div').first()).toBeVisible();
    await expect(page.locator('div:nth-child(3) > div > div:nth-child(2) > div:nth-child(2)')).toBeVisible();
    await expect(page.locator('.MuiGrid-root > div:nth-child(3) > div > div:nth-child(2) > div:nth-child(3)')).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^1234$/ })).toBeVisible();
    await page.getByLabel('Go to page 2').click();
    await expect(page.locator('.MuiGrid-root > div:nth-child(3) > div > div:nth-child(2) > div').first()).toBeVisible();
    await expect(page.locator('div:nth-child(3) > div > div:nth-child(2) > div:nth-child(2)')).toBeVisible();
    await expect(page.locator('.MuiGrid-root > div:nth-child(3) > div > div:nth-child(2) > div:nth-child(3)')).toBeVisible();
});