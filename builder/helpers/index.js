const slugify = require('slugify');
const groupBy = require('handlebars-group-by');
const {inspect} = require('util');

let group;

// Silly hack to get this helper register properly.
groupBy({
	registerHelper: (helpers) => {
		group = helpers.group;
	}
});


function highlight(code, lang) {
	try {
		try {
			return hljs.highlight(lang, code).value;
		} catch (err) {
			if (!/Unknown language/i.test(err.message)) {
				throw err;
			}
			return hljs.highlightAuto(code).value;
		}
	} catch (err) {
		return code;
	}
}

module.exports = {
	slugify: (str) => slugify(str, '-').toLowerCase(),
	capitalize: (str) =>
		str.charAt(0).toUpperCase() + str.slice(1),
	group() {
		return group.apply(this, arguments);
	},
	markdown: require('helper-markdown')(highlight),
	json: (snippets) => {
		const newSnippet = snippets.map(s => ({
			content: s.contents.toString(),
			title: s.title,
			author: s.author,
			level: s.level,
			tags: s.tags,
			links: s.links,
			componentcode: s.componentcode,
			modulecode: s.modulecode,
		}));
		return JSON.stringify(newSnippet, null, 2)
	}
};

