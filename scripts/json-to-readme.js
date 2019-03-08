const mustache = require('mustache');
const {readFileSync, writeFileSync} = require('fs');
const {join} = require('path');

const snippets = require('../dist/data.json');
const template = readFileSync(join(__dirname, '..', 'templates', 'README-template.md'), 'UTF-8');
const readmePath = join(__dirname, '..', 'README.md');


const result = mustache.render(template, {snippets});
writeFileSync(readmePath, result);
