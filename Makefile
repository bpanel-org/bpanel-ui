babel:
	@npm run babel

build-dev:
	@npm run build:dev

build-prod:
	@npm run build:production

clean:
	@npm run clean

lint:
	@npm run lint

test:
	@npm test

.PHONY: all browserify webpack clean lint test
