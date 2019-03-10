const handlebars = require('handlebars');
const {readFileSync, writeFileSync} = require('fs');
const {join} = require('path');
const slugify = require('slugify');

const snippets = require('../data/data.json');

// Paths
const template = readFileSync(join(__dirname, '..', 'templates', 'README-template.md'), 'UTF-8');
const readmePath = join(__dirname, '..', 'README.md');

// Set up handlebars
handlebars.registerHelper('slugify', (str) => slugify(str, '-'));

// Generate!
const result = handlebars.compile(template)({snippets});
writeFileSync(readmePath, result);
