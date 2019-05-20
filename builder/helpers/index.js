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
	}
};


// eyJjb21wb25lbnRjb2RlIjoiYGBgdHlwZXNjcmlwdFxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuIHNlbGVjdG9yOiAnbXktYXBwJyxcbiB0ZW1wbGF0ZTogYFxuIDxoMj5UeXBlIHNvbWV0aGluZyBpbiB0aGUgaW5wdXQgYW5kIGhpdCBjb250cm9sK2VudGVyIHRvIFxuIHVwZGF0ZSB0aGUgdmFsdWUgYmVsb3c6PC9oMj5cblxuIDxoMT57e3ZhbHVlIHx8ICdubyB2YWx1ZSd9fTwvaDE+XG4gPGlucHV0IChrZXlkb3duLmNvbnRyb2wuZW50ZXIpPVwidmFsdWU9JGV2ZW50LnRhcmdldC52YWx1ZTsgJGV2ZW50LnRhcmdldC52YWx1ZSA9ICcnXCI+XG4gYFxufSlcbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQge1xuIHZhbHVlOiBzdHJpbmc7XG59XG5gYGAifQ==
// eyJjb21wb25lbnRjb2RlIjoiYGBgdHlwZXNjcmlwdFxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ215LWFwcCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGgyPlR5cGUgc29tZXRoaW5nIGluIHRoZSBpbnB1dCBhbmQgaGl0IGNvbnRyb2wrZW50ZXIgdG8gXG4gICAgICAgIHVwZGF0ZSB0aGUgdmFsdWUgYmVsb3c6PC9oMj5cblxuICAgIDxoMT57e3ZhbHVlIHx8ICdubyB2YWx1ZSd9fTwvaDE
// eyJjb21wb25lbnRjb2RlIjoiYGBgdHlwZXNjcmlwdFxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ215LWFwcCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGgyPlR5cGUgc29tZXRoaW5nIGluIHRoZSBpbnB1dCBhbmQgaGl0IGNvbnRyb2wrZW50ZXIgdG8gXG4gICAgICAgIHVwZGF0ZSB0aGUgdmFsdWUgYmVsb3c6PC9oMj5cblxuICAgIDxoMT57e3ZhbHVlIHx8ICdubyB2YWx1ZSd9fTwvaDE
