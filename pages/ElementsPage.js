const { expect } = require('@playwright/test');

exports.ElementsPage = class ElementsPage {

    constructor(page) {
        this.page = page;
        this.pageHeader = page.locator('.main-header');
        this.textBox = page.locator('span', {hasText: 'Text Box'});
        this.checkBox = page.locator('span', {hasText: 'Check Box'});
        this.textBoxFullName = page.locator('#userName');
        this.textBoxEmail = page.locator('#userEmail');
        this.textBoxAddress = page.locator('#currentAddress');
        this.textBoxPermamentAddress = page.locator('#permanentAddress');
        this.textBoxSubmit = page.locator('#submit');
        this.textBoxOutput = page.locator('#output');
        this.checkboxTextSuccess = page.locator('.text-success');
    }

    elementsPageNodeExpand = ({expandId}) => this.page.locator(`//input[@id="tree-node-${expandId}"]/parent::label/parent::span/button`);
    elementsPageOutput = ({outputField}) => this.page.locator(`div[id=output] > div > p[id=${outputField}]`);

    async checkPage() {
        await expect(this.pageHeader).toHaveText('Elements');
    }

    async selectTextBox() {
        await this.textBox.click();
        await expect(this.pageHeader).toHaveText('Text Box');
    }

    async selectCheckBox() {
        await this.checkBox.click();
        await expect(this.pageHeader).toHaveText('Check Box');
    }

    async fillAndSubmitTextBox(data) {
        await this.textBoxFullName.fill(data.fullName);
        await this.textBoxEmail.fill(data.email);
        await this.textBoxAddress.fill(data.address);
        await this.textBoxPermamentAddress.fill(data.permanentAddress);
        await this.textBoxSubmit.click()
    }

    async checkTextBoxOutput(data) {
        await expect(this.elementsPageOutput({outputField: 'name'})).toContainText(data.fullName);
        await expect(this.elementsPageOutput({outputField: 'email'})).toContainText(data.email);
        await expect(this.elementsPageOutput({outputField: 'currentAddress'})).toContainText(data.address);
        await expect(this.elementsPageOutput({outputField: 'permanentAddress'})).toContainText(data.permanentAddress);
    }

    async openCheckboxPath(pathList) {
        for (const path of pathList) {
            await this.elementsPageNodeExpand({expandId: path}).click();
        }
    }

    async checkCheckbox(label) {
        await this.page.locator('.rct-title', {hasText: label}).click();
    }

    async assertCheckbox(result) {
        await expect(this.checkboxTextSuccess).toContainText(result);
    }
}