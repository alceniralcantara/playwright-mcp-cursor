import { test, expect } from '@playwright/test';

test.describe('Pagination and e-commerce flows', () => {
  test('should paginate products from dummyjson API with skip parameter', async ({ request }) => {
    const limit = 10;
    let skip = 0;
    const titles: string[] = [];
    for (let i = 0; i < 2; i++) {
      const response = await request.get('https://dummyjson.com/products?limit=' + limit + '&skip=' + skip);
      expect(response.ok()).toBeTruthy();
      const body = await response.json();
      titles.push(...body.products.map((p: any) => p.title));
      skip += limit;
    }
    expect(titles.length).toBeGreaterThan(0);
  });

  test('should browse and add a laptop to cart on Demoblaze', async ({ page }) => {
    await page.goto('/');
    await page.click('a:has-text("Laptops")');
    await page.waitForSelector('.card-title a');
    const firstProduct = page.locator('.card-title a').first();
    const productName = await firstProduct.innerText();
    await firstProduct.click();
    page.once('dialog', dialog => dialog.accept());
    await page.click('a:has-text("Add to cart")');
    await page.click('#cartur');
    await expect(page.locator('td:has-text("' + productName + '")')).toBeVisible();
  });

  test('should navigate multiple pages of laptops on Demoblaze', async ({ page }) => {
    await page.goto('/');
    await page.click('a:has-text("Laptops")');
    await page.waitForSelector('.card-title a');
    const firstPageTitles = await page.locator('.card-title a').allTextContents();
    await page.click('#next2');
    await page.waitForTimeout(1000);
    const secondPageTitles = await page.locator('.card-title a').allTextContents();
    expect(secondPageTitles).not.toEqual(firstPageTitles);
  });
});
