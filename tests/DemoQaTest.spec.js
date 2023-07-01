const { test } = require('@playwright/test');
const { HomePage } = require('./../pages/HomePage');


test('Should go to demoqa page',  async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();

    page.close();
})

