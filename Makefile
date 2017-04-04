install:
	npm install
	make install-selenium

install-selenium:
	./node_modules/.bin/selenium-standalone install --drivers.chrome.version=2.28 --drivers.chrome.baseURL=https://chromedriver.storage.googleapis.com

run:
	npm run dev

test:
	node_modules/.bin/jest

test-selenium:
	./node_modules/.bin/mocha --recursive ./e2e

lint:
	node_modules/.bin/eslint pages/ __tests__/ src/
