import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
})

test('Verificacion de titulo', async ({ page }) => {
    expect(page).toHaveTitle('¡Me Sumo!');
})

test('Testing Labels', async ({ page }) => {
    await expect(page.locator('.MuiInputBase-root').first()).toBeVisible();
    await expect(page.locator('div:nth-child(3) > .MuiFormControl-root > .MuiInputBase-root')).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^Elegir Fecha$/ })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Buscar' })).toBeVisible();
    await page.getByLabel('Open').first().click();
    await expect(page.locator('#activity-option-0')).toContainText('Fútbol 5');
    await expect(page.locator('#activity-option-1')).toContainText('Fútbol 6');
    await expect(page.locator('#activity-option-2')).toContainText('Fútbol 7');
    await expect(page.locator('#activity-option-3')).toContainText('Fútbol 8');
    await page.getByLabel('Close').click();
    await page.getByLabel('Open').nth(1).click();
    await expect(page.locator('#nhood-option-0')).toContainText('Colegiales');
    await expect(page.locator('#nhood-option-1')).toContainText('Constitución');
    await expect(page.locator('#nhood-option-2')).toContainText('Chacarita');
    await expect(page.locator('#nhood-option-3')).toContainText('Retiro');
    await page.getByLabel('Close').click();
    await page.getByPlaceholder('MM/DD/YYYY').click();
    await page.getByLabel('Choose date').click();
    await page.getByLabel('Previous month').click();
    await page.getByLabel('Next month').click();
    await page.getByRole('gridcell', { name: '1', exact: false }).click();
    await page.getByRole('button', { name: 'Buscar' }).click();
})

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
    await expect(page.locator('#root')).toContainText('Actvividades: Fútbol 5');
    await expect(page.getByRole('button', { name: 'Ver Más' })).toBeVisible();
});