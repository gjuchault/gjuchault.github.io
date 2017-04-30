---
title: Creating a cool NPM package using ES2015, Babel, Travis and Coveralls
---

Some time ago I created a small library called [fuzzyjs](https://github.com/gjuchault/fuzzyjs). The goal was to have a simple browser script that filters an array based on a string that would make a fuzzy filter/search (similar to what you have in Sublime Text : *ao* matches *About* and also *Add folder*).

Since this project got it's small success (80 stars, and even a port in Go) I decided to rewrite it from scratch using what I learnt since : ES2015/Babel, UMD to support both the browser and node, Mocha for testing, Travis-CI, Istanbul, etc.

Here is a small tutorial.

## Project structure

First things first, you need an empty directory to start your nice library. Create a package.json (using `npm init`) so you have a *package.json* ready.

Then you can create an optional *.editorconfig*, a *.eslintrc*, a *LICENSE* and a *README.md*.

Then you can create directories *test* and *src*. In *test* you will place all your mocha files. In the *src* you will put your library file. If you need more than one file, consider using an *index.js* file that will require all the other files and export what you want. Be sure that your main file is set correctly in your package.json file (`"main": "build/index.js"` for example).

We will build our *src* directory in a *build* directory (you can also choose *dist* or *lib* of course).

So the next step will be to create the *.gitignore* file :

```sh
npm-debug.log
coverage/
node_modules/
```

I choose to not ignore the build directory so that people can install and use the library with git. But this is up to you.

We can then start to install our dev modules :

```sh
npm install --save-dev babel-cli babel-preset-es2015 babel-istanbul
npm install --save-dev coveralls mocha
```

*Note: as my fuzzy library use `Object.assign` I also installed `babel-plugin-transform-object-assign`*.

## ES2015 : Babel

This has been written when Babel was at version 6. First we need to create a *.babelrc* file at the directory's root :

```json
{
    "plugins": ["transform-object-assign"],
    "presets": ["es2015"]
}
```

In the *package.json* we need a `build` script. This will be as simple as :

```json
{
    ...
    "scripts" : {
        "build": "babel -d build/ src/"
    }
    ...
}
```

From now on, if you start `npm run build` you should have something like that :

```sh
➜  fuzzyjs git:(master) npm run build

> fuzzyjs@1.0.4 build /home/gabriel/Workspace/fuzzyjs
> babel -d build/ src/

src/fuzzy.js -> build/fuzzy.js
➜  fuzzyjs git:(master) ✗
```

## Testing : Mocha & Istanbul

In your *test* directory, you can write as many test files as you want. Using mocha, this will be as simple as something closed to :

```js
import assert from 'assert';
import fuzzy from '../src';

describe('fuzzyjs', () => {
    it('should be a nice library', () => {
        assert.equal(1, 1);
    });
});
```

The interesting fact here is : we use ES2015 to write tests too.

Based with that we will need a Mocha test. But, we will also use istanbul to have a nice code coverage. Here is what the test command should look like :

```json
{
    ...
    "scripts" : {
        "build": "babel -d build/ src/",
        "test": "babel-node ./node_modules/.bin/babel-istanbul cover ./node_modules/.bin/_mocha -- --sort --bail"
    }
    ...
}
```

Let me explain a bit this test command.

 1. First it will use `babel-node`. This is similar to `node` command but babel will be included so you can use `babel-node` on ES2015 files. The only thing is that this is a bit slow. That's why we only use it for testing.
 2. Then we use `babel-istanbul` which is a small script similar to `babel-node`. It's just `istanbul` but babel-aware.
 3. Then we call the `_mocha` executable. Not `mocha` as this is a small executable that forks `_mocha` (we don't want a forked process).
 4. Then we pass additional arguments to mocha using `--` (this is equivalent to : what will follow is arguments). Theses arguments are `--sort` (so your test suite is sorted by file name) and `--bail` (which will stop as soon as a test does not pass).

If you start `npm test` you should see something like :

```sh
➜  fuzzyjs git:(master) ✗ npm test

> fuzzyjs@1.0.4 test /home/gabriel/Workspace/fuzzyjs
> babel-node ./node_modules/.bin/babel-istanbul cover ./node_modules/.bin/_mocha -- --sort --bail



  fuzzyjs
    default search
      ✓ finds the right string and surrounds it with a span tag
      ✓ should return the full set without query
    custom surrounding tag
      ✓ finds the right string and surrounds it with a span tag
    case sensitive search
      ✓ finds only the lower case letter
      ✓ finds only the upper case letter


  5 passing (14ms)

=============================================================================
Writing coverage object [/home/gabriel/Workspace/fuzzyjs/coverage/coverage.json]
Writing coverage reports at [/home/gabriel/Workspace/fuzzyjs/coverage]
=============================================================================

=============================== Coverage summary ===============================
Statements   : 100% ( 36/36 ), 2 ignored
Branches     : 100% ( 22/22 ), 4 ignored
Functions    : 100% ( 4/4 )
Lines        : 100% ( 36/36 )
================================================================================

```

Which is so pretty.

## Travis-CI

[Travis-CI](https://travis-ci.org/) is one of the most used continuous integration service. It's free for open-source. Use it all the time.

Once you're logged using your GitHub account, start watching your repository. It will not work until you've added the *.travis.yml* (that I will describe below) and push it.

The next step is : how I make Travis know how to install the library and test it. That is done using the *.travis.yml* file. Create an empty file at your repository's root :

```yaml
language: node_js
sudo: false
node_js:
- '5'
install:
- npm install
script:
- npm run build
- npm run test
```

`language` is of course what language it uses, `sudo: false` is a parameter to tell Travis : I don't need sudo, so you can use Docker and maker faster builds. `node_js` array is which version you want to install (you can add multiple ones to test on node v4, iojs, or node v0.12).

The `install` array is the list of commands you want Travis to run before it's ready to test. Travis already clone your repository and `cd` in it. The only thing needed here is `npm install`.

The `script` array is your test suite. If one of this command fails, Travis will consider your commit failed. You could add `npm run lint` or `npm run minify` here for example, if you want your build to be linted before merged. Here I only test build, minify and the test suite here.

## Coveralls

To get some nice code coverage report, you can either take your browser and open file *coverage/lcov-report/index.html* or you can start using [Coveralls](https://coveralls.io/). Coveralls is a nice tool (free for open-source) that integrates well with github and will watch your pull requests, commits etc. to show the coverage similarly to the lcov-report. The cool thing here is that you can use [Git Flow](https://github.com/nvie/gitflow) or [GitHub Flow](https://guides.github.com/introduction/flow/index.html) and, before merging your request, ensure every test passes (that's Travis-CI task) and that your coverage isn't hurt (that's Coveralls).

Coveralls is pretty easy to use. Once you're logged using GitHub, start watching your repository.
Coveralls works with Travis well. We're going to add a small npm script for Coveralls, that will only be used with Travis :

```json
{
    ...
    "scripts" : {
        "build": "babel -d build/ src/",
        "test": "babel-node ./node_modules/.bin/babel-istanbul cover ./node_modules/.bin/_mocha -- --sort --bail",
        "coveralls": "cat ./coverage/lcov.info | coveralls"
    }
    ...
}
```

This only takes the istanbul lcov report and sends it to coveralls. It will only work on Travis. If you start this command from your terminal, you will have an error similar to :

```json
Bad response: 422 {"message":"Couldn't find a repository matching this job.","error":true}
```


So how can we take this to Travis ? In the *.travis.yml* file, add the following lines :

```yaml
after_script:
- npm run coveralls
```

Once the tests has been made in Travis, it'll run the coveralls. There coveralls will know that the travis build to be covered is this one, and it will display on the website the results of the tests, and of course the coverage.

## NPM

Now it's time to publish on NPM. You will need an account on the website, and you will need to set up your npm to log in. In the terminal you can use this command :

```sh
npm run adduser
```

This will register to npm and create a *~/.npmrc* file. If you already have an account, this will just log in.

We want to make Travis publish for us. The thing is : on your npm package, you don't need the *src/* directory. This could be done using a *.npmignore* file, but as we already have a *.gitignore* file; npm will combine both of them. If you try to put *build/* in the *.gitignore* and *src/* in *.npmignore*, when installing your package you will see that you will have none of them.

That is fixable in two ways: either you make a `prepublish` script that do `npm run build` and `rm -rf*src/*. Or you use Travis `before_deploy` to do the same thing.

I like the Travis way.

Append this to your *.travis.yml* file:

```yaml
before_deploy:
- npm run build
- rm -rf src/
```

Next step : make Travis publish. I do love the `travis` executable (that you can get with `sudo gem install travis`). Start `travis setup npm`. It will ask for a few questions, and add nearly everything needed to your *.travis.yml* file.

Nearly everything ? Yes. Travis is smart by default. Before publishing, it runs a `git stash` which will put your changes in a special folder so that you have a clean repo (similar to what you would have with `git checkout .`). Then it publishes. The fact is : stashing the changes will restore the *src/* directory and remove the *build/* one. So we need to explicitly disable the stashing part.

This can be done by addind `skip_cleanup: true` in the deploy part of your travis file:

```yaml
...
deploy:
  skip_cleanup: true
  ...
```

When you want to make a PR, or just deploy a new version, update your package.json's version field (use [semver](http://semver.org/)). Commit, and push. Travis will test, and deploy if everything is okay. If you go for a pull request, be ready to get amazed by GitHub/Travis/Coveralls stack :

![GitHub Travis Coveralls](./assets/githubTravisCoveralls.png)

Final files:
*package.json*

```json
{
  "name": "fuzzyjs",
  "version": "1.0.4",
  "description": "Fuzzy.js is a fuzzy search algorithm in javascript",
  "main": "build/fuzzy.js",
  "directories": {
    "test": "test"
  },
  "dependencies": {},
  "devDependencies": {
    "babel-cli": "^6.7.7",
    "babel-istanbul": "^0.8.0",
    "babel-plugin-transform-object-assign": "^6.5.0",
    "babel-preset-es2015": "^6.6.0",
    "coveralls": "^2.11.9",
    "mocha": "^2.4.5",
    "uglify-js": "^2.6.2"
  },
  "scripts": {
    "build": "babel -d build/ src/",
    "coveralls": "cat ./coverage/lcov.info | coveralls",
    "minify": "uglifyjs build/fuzzy.js -o build/fuzzy.min.js --source-map build/fuzzy.min.js.map",
    "test": "babel-node ./node_modules/.bin/babel-istanbul cover ./node_modules/.bin/_mocha -- --sort --bail"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/gjuchault/fuzzyjs.git"
  },
  "keywords": [
    "fuzzy",
    "searching",
    "algorithm",
    "fuzz"
  ],
  "author": "Gabriel Juchault <gabriel.juchault@gmail.com>",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/gjuchault/fuzzyjs/issues"
  },
  "homepage": "https://github.com/gjuchault/fuzzyjs#readme"
}
```

*.travis.yml*:

```yaml
language: node_js
sudo: false
node_js:
- '5'
install:
- npm install
script:
- npm run build
- npm run minify
- npm run test
after_script:
- npm run coveralls
before_deploy:
- npm run build
- rm -rf src/
deploy:
  skip_cleanup: true
  provider: npm
  email: gabriel.juchault@gmail.com
  api_key:
    secure: IJ8px2r0JaUm2jHVZkOrRKuc6d//bBbVVlvWC1/UCGzlN4sYando0rn0D1nHTOpQFur7yPXVQOipmxhrC6JOSjloUkZXptSksj39vVxGUaQRBR0FRf4mEHvUe5oH9QfgJLreqi3+c4LI2qC34uFPjzVPtlnBhvEa4x3gcm2TdWE=
  on:
    repo: gjuchault/fuzzyjs
```

Useful links :

 - [Travis-CI guide on npm publishing](https://docs.travis-ci.com/user/deployment/npm/)
 - [NPM guide](https://docs.npmjs.com/misc/developers)
 - [Coveralls guide](https://coveralls.zendesk.com/hc/en-us)
