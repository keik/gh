TAG="\n\n\033[0;32m\#\#\# "
END=" \#\#\# \033[0m\n"

NPM=$(shell npm bin)

BROWSERIFY_OPTS=\
  -e lib/client/main.js \
  -p [ css-modulesify -o bundle/style.css -d ./lib/share --global ] \
  -t babelify \
  -v

.PHONY: build start watch stroybook bundle test lint clean

build: clean lint test bundle
	@echo $(TAG)$@$(END)

start:
	@echo $(TAG)$@$(END)
	NODE_ENV="production" node lib/server

watch: node_modules
	@echo $(TAG)$@$(END)
	mkdir -p bundle
	NODE_ENV="development" DEBUG="keik:*,gh:*" $(NPM)/parallelshell \
		'$(NPM)/watchify $(BROWSERIFY_OPTS) -o bundle/bundle.js -d' \
		'$(NPM)/nodemon lib/server -w lib/server -w lib/share'
# 		'$(NPM)/ava -r babel-register -r ./css-modules-register test/test-*.js --watch --source lib'

storybook: node_modules
	$(NPM)/start-storybook -p 6006

bundle: node_modules
	@echo $(TAG)$@$(END)
	mkdir -p $@
	NODE_ENV="production" $(NPM)/browserify $(BROWSERIFY_OPTS) | $(NPM)/uglifyjs -mc warnings=false > bundle/bundle.js

test: node_modules
	@echo $(TAG)$@$(END)
	NODE_ENV="test" $(NPM)/nyc -i babel-register -i ./css-modules-register --all \
		--include 'lib/**' \
		--exclude 'lib/{server/index.js,client/*.js,share/stories}' \
		$(NPM)/ava 'test/test-*.js'

lint: node_modules
	@echo $(TAG)$@$(END)
	$(NPM)/eslint '{lib/**/*.js,test/**/*.js}'

clean:
	@echo $(TAG)$@$(END)
	rm -rf bundle

node_modules: package.json
	@echo $(TAG)$@$(END)
	yarn || npm install
