const path = require('path');
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const chromePath = path.join(__dirname, '..', process.env.SELENIUM_BROWSER_BINARY_PATH);
const service = new chrome.ServiceBuilder(chromePath).build();

chrome.setDefaultService(service);

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

module.exports = driver;
