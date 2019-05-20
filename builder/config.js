const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const handlebars = require('handlebars');
const collections = require('metalsmith-collections');
const discoverPartials = require('metalsmith-discover-partials');
const registerHelpers = require('metalsmith-register-helpers');
const metalsmithStatic = require('metalsmith-static');
const rewrite = require('metalsmith-rewrite');
const permalinks = require('metalsmith-permalinks');
const tags = require('metalsmith-tags');
const rename = require('metalsmith-rename');
const generateHtmlFilesForScreenshots = require('./plugins/generate-html-files-for-screenshots');
const customMarkdownParse = require('./plugins/custom-markdown-parse');
const validate = require('./plugins/validate');



module.exports = (isDevMode = false) => Metalsmith(__dirname)
	.metadata({
		site: {
			base: 'https://30.codelab.fun/',
			isDevMode
		}
	})
	.source('../snippets')
	.use(rewrite([{
		pattern: 'pages/*.html',
	}]))
	.destination('../static')
	.use(metalsmithStatic())
	.use(collections({
		snippets: {
			sortBy: 'path',
			pattern: '*.md',
		},
	}))
	.use(customMarkdownParse())
	.use(validate(
		require('./schemas/snippet').schema
	))
	.use(discoverPartials())
	.use(registerHelpers())
	.use(markdown({}))
	.use(permalinks())
	.use(tags({
		layout: 'tag.hbs'
	}))
	.use(generateHtmlFilesForScreenshots())
	.use(rename([
		['json/index.html', 'data.json'],
		['readme/index.html', 'README.md'],
	]))
	.use(layouts({
		engine: handlebars,
		default: 'snippet.hbs',
	}));
