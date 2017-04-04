const assert = require('assert');
const { until, By } = require('selenium-webdriver');
const driver = require('./chromeDriver');

const baseUrl = 'http://localhost:3000';

describe('Menu page', () => {
    before(() => {
        driver.get(`${baseUrl}`);
    });

    it('should find two links', async () => {
        await driver.wait(until.elementLocated(By.css('.menu__a')));
        const linkItems = await driver.findElements(By.css('.menu__a'));
        assert.equal(linkItems.length, 2);
    });

    it('should redirect "game" page', async () => {
        await driver.wait(until.elementLocated(By.id('newGame')));
        await driver.findElement(By.id('newGame')).click();
        await driver.wait(until.elementLocated(By.css('.game')));
    });

    after(() => {
        driver.quit();
    });
});
