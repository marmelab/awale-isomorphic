install:
	npm install
	make install-selenium

install-selenium:
	./node_modules/.bin/selenium-standalone install --drivers.chrome.version=2.28 --drivers.chrome.baseURL=https://chromedriver.storage.googleapis.com

run:
	npm run dev

test:
	make test-unit
	make test-e2e

test-unit:
	node_modules/.bin/jest

test-e2e:
	SELENIUM_BROWSER_BINARY_PATH="./node_modules/selenium-standalone/.selenium/chromedriver/2.28-x64-chromedriver" \
	./node_modules/.bin/mocha --recursive ./e2e

lint:
	node_modules/.bin/eslint pages/ __tests__/ src/
