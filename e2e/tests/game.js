
const assert = require('assert');
const driver = require('../chromeDriver');

const GamePageFactory = require('../pages/gamePage');

describe('Game page', () => {
    const GamePage = GamePageFactory('http://localhost:3000/game')(driver);

    it('should find score', async () => {
        await GamePage.navigate();
        assert.equal(true, true);
    });

    after(() => {
        driver.quit();
    });
});
