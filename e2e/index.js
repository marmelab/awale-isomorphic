const assert = require('assert');
const test = require('selenium-webdriver/testing');
const webdriver = require('selenium-webdriver');
const driver = require('./chromeDriver');

test.describe('Google search game', () => {
    test.it('should work', () => {
        driver.get("http://google.com/");
        const searchBox = driver.findElement(webdriver.By.name('q'));
        searchBox.sendKeys('simple programmer');
        searchBox.getAttribute('value').then((value) => {
            assert.equal(value, 'simple programmer');
        });
        driver.quit();
    });
});
