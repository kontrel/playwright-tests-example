const { expect } = require('@playwright/test');

exports.HomePage = class HomePage {

    constructor(page) {
        this.page = page;
        this.elements = page.locator('h5', {hasText: 'Elements'});
    }

    async goto() {
        await this.page.goto('https://demoqa.com');
    }

    async goToElements() {
        await this.elements.click();
    }
} 