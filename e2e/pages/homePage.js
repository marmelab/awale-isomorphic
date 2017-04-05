const { until, By } = require('selenium-webdriver');

module.exports = url => driver => ({
    elements: {
        newGame: By.id('newGame'),
        linkMenu: By.css('.menu__a'),
    },

    navigate() {
        driver.navigate().to(url);
        return this.waitUntilVisible();
    },

    waitUntilVisible() {
        return driver.wait(until.elementLocated(this.elements.newGame));
    },

    selectLinkMenu() {
        return driver.findElements(this.elements.linkMenu);
    },

    startGame() {
        const newGameLink = driver.findElement(this.elements.newGame);
        return newGameLink.click();
    },
});
