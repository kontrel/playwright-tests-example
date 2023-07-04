
const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { ElementsPage } = require('../pages/ElementsPage');
import { elementsPageData } from '../test-data/ElementsPageTestData';
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

test('Should fill and submit Elements Text Box', async () => {
    await homePage.goto();
    await homePage.goToElements();
    await elementsPage.checkPage();
    await elementsPage.selectTextBox();
    await elementsPage.fillAndSubmitTextBox(elementsPageData);
    await elementsPage.checkTextBoxOutput(elementsPageData);
})

test('Should fill and submit with email error Elements Text Box', async () => {
    await homePage.goto();
    await homePage.goToElements();
    await elementsPage.checkPage();
    await elementsPage.selectTextBox();
    await elementsPage.fillAndSubmitTextBox(elementsPageWrongMailData);
    await expect(elementsPage.textBoxOutput).not.toBeVisible();
})

test('Should click react checkbox', async () => {
  await homePage.goto();
  await homePage.goToElements();
  await elementsPage.checkPage();
  await elementsPage.selectCheckBox();
  await elementsPage.openCheckboxPath(['home', 'documents', 'workspace']);
  await elementsPage.checkCheckbox('React');
  await elementsPage.assertCheckbox('react');
})

test('Should click notes checkbox', async () => {
  await homePage.goto();
  await homePage.goToElements();
  await elementsPage.checkPage();
  await elementsPage.selectCheckBox();
  await elementsPage.openCheckboxPath(['home', 'desktop']);
  await elementsPage.checkCheckbox('Notes');
  await elementsPage.assertCheckbox('notes');
})