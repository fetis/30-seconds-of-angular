var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var handlebars = require('handlebars');
var collections = require('metalsmith-collections');
var discoverPartials = require('metalsmith-discover-partials');
var registerHelpers = require('metalsmith-register-helpers');
var metalsmithStatic = require('metalsmith-static');
var rewrite = require('metalsmith-rewrite');
var permalinks = require('metalsmith-permalinks');


var marked = require('marked');


function extractHeaders(str) {
	return ('\n' + str + '\n#')
		.match(/\n#+.*\n[\s\S]*?(?=\n#)/g)
		.reduce((result, a) => {
			const [, depth, header, content] = a.match(/^\n(#+)(.*)\n([\s\S]*)$/);
			result[header.trim().toLocaleLowerCase()] = content.trim();
			return result;
		}, {})
}

const generateScreenshots = () => (files, metalsmith, done) => {
	debugger;
	for (const [file, {layout}] of Object.entries(files)) {
		// Only generate screenshots if there's no layout
		if (!layout) {
			const screenshot = file.replace(/index.html$/, 'screenshot.html');

			if (screenshot !== file) {
				files[screenshot] = {...files[file]};
				files[screenshot].layout = 'screenshot.hbs';
			}
		}
	}
	done();
};
const prep = () => (files, metalsmith, done) => {
	for (const [file, value] of Object.entries(files)) {
		const headers = extractHeaders(value.contents.toString());
		files[file] = {...headers, ...value};
		files[file].contents = Buffer.from(files[file].content);
	}

	const metadata = metalsmith.metadata();
	metadata.snippets = metadata.snippets.map(s => {
		const result = {...s, ...extractHeaders(s.contents.toString())};
		result.contents = Buffer.from(marked(result.content));
		result.contentmd = result.content;
		return result
	});

	for (const [file] of Object.entries(files)) {
		const flatFile = file.replace(/^pages\//, '');
		if (flatFile !== file) {
			files[flatFile] = files[file];
			delete files[file];
		}
	}

	done();
};

// site
module.exports = Metalsmith(__dirname)
	.metadata({
		site: {
			title: 'lol',
			base: 'https://30.codelab.fun/'
		}
	})
	.source('../snippets')
	.use(rewrite([{
		pattern: 'pages/*.html',
		filename: '__{slug}llr.html',
	}]))
	.destination('../static')
	.use(metalsmithStatic())
	.use(collections({
		snippets: {
			sortBy: 'path',
			pattern: '*.md',
		},
	}))
	.use(prep())
	.use(discoverPartials())
	.use(registerHelpers())
	.use(markdown({
		keys: ['links']
	}))
	.use(
		permalinks({
			pattern: ':title'
		})
	)
	.use(generateScreenshots())
	.use(layouts({
		engine: handlebars,
		default: 'snippet.hbs',
	}));
