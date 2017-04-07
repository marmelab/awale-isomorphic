
const assert = require('assert');
const driver = require('../chromeDriver');

const HomePageFactory = require('../pages/homePage');

describe('Menu page', () => {
    const HomePage = HomePageFactory('http://localhost:8083')(driver);

    before(async () => await HomePage.navigate());

    it('should find two links', async () => {
        const linkItems = await HomePage.selectLinkMenu();
        assert.equal(linkItems.length, 2);
    });

    it('should redirect "game" page', async () => {
        await HomePage.startGame();
        await driver.sleep(300);
        assert.equal(await driver.getCurrentUrl(), 'http://localhost:8083/game');
    });
});
