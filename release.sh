#!/bin/sh

git checkout master
git checkout gh-pages
git merge master --no-ff --no-edit
rm -rf dist
yarn build
git add .
git add dist -f
git commit -m "chore: build master merge"
git push
git checkout master
