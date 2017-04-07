install:
	npm install
	make install-selenium

install-selenium:
	./node_modules/.bin/selenium-standalone install --version=3.3.0 --drivers.chrome.version=2.24

run:
	npm run dev

test: test-unit test-e2e

test-unit:
	node_modules/.bin/jest

test-e2e:
	SELENIUM_BROWSER_BINARY_PATH="./node_modules/selenium-standalone/.selenium/chromedriver/2.24-x64-chromedriver" \
	./node_modules/.bin/mocha \
		--timeout 10000 \
		./e2e/createServer.js \
		./e2e/tests/*.js

lint:
	node_modules/.bin/eslint pages/ __tests__/ src/
