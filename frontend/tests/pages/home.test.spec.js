import { test, expect } from '@playwright/test';

test.beforeEach(async({ page }) => {
    await page.goto('http://localhost:5173/');
})

test('Verificacion de titulo', async({ page }) => {
    expect(page).toHaveTitle('meSumo');
})

test.describe('Testing Labels', () => {

    test('Búsqueda exitosa por Actividad', async ({ page }) => {
        await page.getByLabel('Elegir Actividad').fill("Futbol");
    })
    test('Búsqueda exitosa por Categoria', async ({ page }) => {
        await page.getByLabel('Elegir Categoria').fill("Futbol 5");
    })
    test('Búsqueda exitosa por Barrio', async ({ page }) => {
        await page.getByLabel('Elegir Barrio').fill("Balvanera");
    })
    test('Búsqueda exitosa por Fechas', async ({ page }) => {
        await page.getByTestId('CalendarIcon').click();
        const calendar = page.locator('class=MuiDateCalendar-root css-1q04gal-MuiDateCalendar-root')
        expect (calendar).toBeVisible
    })
})