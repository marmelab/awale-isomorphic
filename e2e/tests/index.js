
const assert = require('assert');
const { until, By } = require('selenium-webdriver');
const driver = require('../chromeDriver');

const HomePageFactory = require('../pages/homePage');

describe('Menu page', () => {
    const HomePage = HomePageFactory('http://localhost:3000')(driver);

    it('should find two links', async () => {
        await HomePage.navigate();
        const linkItems = await HomePage.selectLinkMenu();
        assert.equal(linkItems.length, 2);
    });

    it('should redirect "game" page', async () => {
        await HomePage.navigate();
        await HomePage.startGame();
        await driver.sleep(500);
        assert.equal(await driver.getCurrentUrl(), 'http://localhost:3000/game');
    });

    after(() => {
        driver.quit();
    });
});
