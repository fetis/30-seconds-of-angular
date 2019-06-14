const slugify = require('slugify');
const groupBy = require('handlebars-group-by');

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

/**
 * Drop markdown "```typescript```" from the code
 */
function stripTypeScript(code){
	return code.slice(13, -3).trim();
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
			twitter: s.twitter,
			level: s.level,
			tags: s.tags,
			links: s.links,
			componentcode: s.componentcode,
			modulecode: s.modulecode,
		}));
		return JSON.stringify(newSnippet, null, 2)
	},
	hasCode(code){
		return code.componentcode || code.modulecode;
	},
	codeToBase64(code) {
		const files = {};
		if(code.componentcode){
			files['app.component.ts'] = stripTypeScript(code.componentcode);
		}

		if(code.modulecode){
			files['app.module.ts'] = stripTypeScript(code.modulecode);
		}


		return  Object.keys(files).length
			? encodeURIComponent(Buffer.from(JSON.stringify(files), 'binary')
				.toString('base64'))
			: '';
	},
	filterAndOrderForPresentation(snippets){
		const snippetsByPath = snippets.reduce((snippets, snippet)=>(snippets[snippet.path]=snippet, snippets), {});
		return [
			'adding-keyboard-shortcuts-to-elements.md',
			'global-event-listeners.md',
			'style-bindings.md',
			'injecting-document.md',
			'reusing-code-in-template.md',
			'two-way-binding-any-property.md',
			'getting-components-of-different-types-with-viewchild.md',
			'router-custom-preloading.md',
			'svg.md'
		].map(path => snippetsByPath[path]);
	}
};
