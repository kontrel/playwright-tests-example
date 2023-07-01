const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { ElementsPage } = require('../pages/ElementsPage');
const { elementsPageData } = require('../test-data/ElementsPageTestData');
import { elementsPageWrongMailData } from '../test-data/ElementsPageTestData'

let homePage;
let elementsPage;

test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Running ${testInfo.title}`);
    homePage = new HomePage(page);
    elementsPage = new ElementsPage(page);
  });

test.afterAll(async ({page}) => {
    page.close();
  });

test('Should fill and submit Elements Text Box', async ({page}) => {
    await homePage.goto();
    await homePage.goToElements();
    await elementsPage.checkPage();
    await elementsPage.selectTextBox();
    await elementsPage.fillAndSubmitTextBox(elementsPageData);
    await elementsPage.checkTextBoxOutput(elementsPageData);
})

test('Should fill and submit with email error Elements Text Box', async ({page}) => {
    await homePage.goto();
    await homePage.goToElements();
    await elementsPage.checkPage();
    await elementsPage.selectTextBox();
    await elementsPage.fillAndSubmitTextBox(elementsPageWrongMailData);
    await expect(elementsPage.textBoxOutput).not.toBeVisible();
})