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

var marked = require('marked');

function extractHeaders(str) {
	const match = ('\n' + str + '\n#')
		.match(/\n#+.*\n[\s\S]*?(?=\n#)/g);

	if (!match) {
		return {
			content: str,
		}
	}
	return match
		.reduce((result, a) => {
			const [, depth, header, content] = a.match(/^\n(#+)(.*)\n([\s\S]*)$/);
			result[header.trim().toLocaleLowerCase()] = content.trim();
			return result;
		}, {})
}

const generateScreenshots = () => (files, metalsmith, done) => {
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
			base: 'https://30.codelab.fun/'
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
	.use(prep())
	.use(discoverPartials())
	.use(registerHelpers())
	.use(markdown({}))
	.use(
		permalinks()
	)
	.use(tags({
		layout: 'tag.hbs'
	}))
	.use(generateScreenshots())
	.use(
		rename([
			['json/index.html', 'data.json'],
			['readme/index.html', 'README.md'],

		])
	)

	.use(layouts({
		engine: handlebars,
		default: 'snippet.hbs',
	}));
