const handlebars = require('handlebars');
const {readFileSync, writeFileSync} = require('fs');
const {join} = require('path');
const slugify = require('slugify');
const groupBy = require('handlebars-group-by');


const snippets = require('../data/data.json');

// Paths
const template = readFileSync(join(__dirname, '..', 'templates', 'README-template.md'), 'UTF-8');
const readmePath = join(__dirname, '..', 'README.md');

// Set up handlebars
handlebars.registerHelper('slugify', (str) => slugify(str, '-'));
handlebars.registerHelper(groupBy(handlebars));
handlebars.registerHelper('capitalize', function (str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
});


// Generate!
const result = handlebars.compile(template)({snippets});
writeFileSync(readmePath, result);
