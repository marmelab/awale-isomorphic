install:
	npm install

run:
	npm run dev

test:
	node_modules/.bin/jest

test-selenium:
	

lint:
	node_modules/.bin/eslint pages/ __tests__/ src/
