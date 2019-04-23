.PHONY: help install run test lint

help: ## Display available commands
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies and selenium
	npm install
	make install-selenium

install-selenium:
	./node_modules/.bin/selenium-standalone install --version=3.3.0 --drivers.chrome.version=2.24

run: ## Launch front end
	npm run dev

test: ## Launch test
	test-unit test-e2e

test-unit:
	./node_modules/.bin/jest --setupTestFrameworkScriptFile ./src/test/setupTests.js

test-e2e:
	SELENIUM_BROWSER_BINARY_PATH="./node_modules/selenium-standalone/.selenium/chromedriver/2.24-x64-chromedriver" \
	./node_modules/.bin/mocha \
		--timeout 10000 \
		./e2e/createServer.js \
		./e2e/tests/*.js

lint: ## Format code
	./node_modules/.bin/eslint pages/ __tests__/ src/
