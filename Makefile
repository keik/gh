TAG="\n\n\033[0;32m\#\#\# "
END=" \#\#\# \033[0m\n"

NPM=$(shell npm bin)

BROWSERIFY_OPTS=\
  -e lib/client/main.js \
  -t babelify \
  -v

.PHONY: build start watch storybook bundle coverage test lint clean

build: clean lint test bundle
	@echo $(TAG)$@$(END)

start:
	@echo $(TAG)$@$(END)
	NODE_ENV="production" node lib/server

watch:
	@echo $(TAG)$@$(END)
	mkdir -p bundle
	NODE_ENV="development" DEBUG="keik:*,gh:*" $(NPM)/parallelshell \
		'$(NPM)/watchify $(BROWSERIFY_OPTS) -o bundle/bundle.js -d' \
		'$(NPM)/nodemon lib/server -w lib/server -w lib/share' \
		'node bundle-css-modules.js "lib/share/**/*.css" -o bundle/style.css -w -v'

storybook:
	$(NPM)/start-storybook -p 6006

bundle:
	@echo $(TAG)$@$(END)
	mkdir -p $@
	NODE_ENV="production" $(NPM)/browserify $(BROWSERIFY_OPTS) | $(NPM)/uglifyjs -mc warnings=false > bundle/bundle.js
	node bundle-css-modules.js 'lib/share/**/*.css' -o bundle/style.css -v

test-instrument:
	@echo $(TAG)$@$(END)
	NODE_ENV="test" $(NPM)/nyc -i babel-register --all \
		--include 'lib/**' \
		--exclude 'lib/{server/index.js,client/*.js,share/stories,**/*.test.js}' \
		$(MAKE) test

test:
	@echo $(TAG)$@$(END)
	NODE_ENV="test" $(NPM)/tape -r babel-register 'lib/**/*.test.js' 2>/dev/null | $(NPM)/tap-diff

test-watch:
	@echo $(TAG)$@$(END)
	NODE_ENV="test" $(NPM)/tape-watch -r babel-register 'lib/**/*.test.js' -v | $(NPM)/tap-diff

lint:
	@echo $(TAG)$@$(END)
	$(NPM)/eslint '{lib/**/*.js,test/**/*.js}'

clean:
	@echo $(TAG)$@$(END)
	rm -rf bundle
