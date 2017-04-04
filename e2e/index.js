const assert = require('assert');
const { until, By } = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');
const driver = require('./chromeDriver');

const baseUrl = 'http://localhost:3000';

test.describe('Menu page', () => {
    test.before(() => {
        driver.get(`${baseUrl}`);
    });

    test.it('should find two links', async () => {
        await driver.wait(until.elementLocated(By.css('.menu__a')));
        const linkItems = await driver.findElements(By.css('.menu__a'));
        assert.equal(linkItems.length, 2);
    });

    // test.it('should redirect "game" page', async () => {
    //     await driver.wait(until.elementLocated(By.css('.menu__a')));
    //     driver.findElement(By.id('test')).click();
    //     console.log(driver.findElement(By.css('body')).getAttribute('outerHTML'));
    // });

    test.after(() => {
        driver.quit();
    });
});
