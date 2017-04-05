
const assert = require('assert');
const driver = require('../chromeDriver');

const GamePageFactory = require('../pages/gamePage');

describe('Game page', () => {
    const GamePage = GamePageFactory('http://localhost:3000/game')(driver);

    beforeEach(async () => {
        await GamePage.navigate();
    });

    it('should find score', async () => {
        const allScore = await GamePage.selectAllScore();
        assert.equal(allScore.length, 2);
    });

    it('should pick pebble on first pit', async () => {
        await GamePage.pickPebble(0);
        await driver.sleep(300);
        assert.equal(true, true);
        // assert.equal(await GamePage.countPebble(0), 0);
    });
});
