const { until, By } = require('selenium-webdriver');

module.exports = url => driver => ({
    elements: {
        game: By.css('.game'),
        board: By.css('.board'),
        score: By.css('.score'),
        pit: indexPit => By.id(`pit_${indexPit}`),
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

    selectPit(indexPit) {
        return driver.findElement(this.elements.pit(indexPit));
    },

    async pickPebble(indexPit) {
        const pit = await this.selectPit(indexPit);
        return pit.click();
    },

    countPebble(indexPit) {
        return this.selectPit(indexPit);
    },
});
