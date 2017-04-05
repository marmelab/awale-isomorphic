const { until, By } = require('selenium-webdriver');

module.exports = url => driver => ({
    elements: {
        game: By.css('.game'),
        board: By.css('.board'),
        score: By.css('.score'),
        pit: By.css('.pit'),
    },

    navigate() {
        driver.navigate().to(url);
        return this.waitUntilVisible();
    },

    waitUntilVisible() {
        return driver.wait(until.elementLocated(this.elements.game));
    },

    selectAllScore() {
        return driver.findElements(this.elements.score);
    },

    selectBoard() {
        return driver.findElement(this.elements.board);
    },

    selectAllPit() {
        return driver.findElements(this.elements.pit);
    },

    async pickPebble(indexPit) {
        const allPit = await this.selectAllPit();
        return allPit[indexPit].click();
    },
});
