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
			const { groups }  = a.match(/^\n(?<depth>#+)(?<header>.*)\n(?<content>[\s\S]*)$/);
			result[groups.header.trim().toLocaleLowerCase()] = groups.content.trim();
			return result;
		}, {})
}

module.exports = () => (files, metalsmith, done) => {
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
