import { test, expect } from '@playwright/test';

test.describe('Pagination and e-commerce flows on Books to Scrape', () => {
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

  test('should add a book to the basket on Books to Scrape', async ({ page }) => {
    await page.goto('/');
    const firstBook = page.locator('article.product_pod h3 a').first();
    const firstBookTitle = await firstBook.getAttribute('title');
    await firstBook.click();
    await page.click('button.btn.btn-add-to-basket');
    await page.click('div.alertinner a:has-text("View basket")');
    await expect(page.locator('.basket-items .product-name')).toContainText(firstBookTitle || '');
  });

  test('should navigate through multiple pages of books', async ({ page }) => {
    await page.goto('/');
    const firstPageTitles = await page.locator('article.product_pod h3 a').allInnerTexts();
    await page.click('li.next a');
    await page.waitForSelector('article.product_pod h3 a');
    const secondPageTitles = await page.locator('article.product_pod h3 a').allInnerTexts();
    expect(secondPageTitles).not.toEqual(firstPageTitles);
  });

  test('should filter by Travel category and add first book to basket', async ({ page }) => {
    await page.goto('/');
    await page.click('a:has-text("Travel")');
    const firstTravelBook = page.locator('article.product_pod h3 a').first();
    const travelBookTitle = await firstTravelBook.getAttribute('title');
    await firstTravelBook.click();
    await page.click('button.btn.btn-add-to-basket');
    await page.click('div.alertinner a:has-text("View basket")');
    await expect(page.locator('.basket-items .product-name')).toContainText(travelBookTitle || '');
  });
});
