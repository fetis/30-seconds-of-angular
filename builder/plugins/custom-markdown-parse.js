const marked = require('marked');
const { EOL } = require('os');


function extractHeaders(content) {
	// Get consitent line breaks across all OS.
        const str = content.replace(/\r\n/g, '\n');

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
			const header = groups.content.trim().replace(/\n/g, EOL);
			result[groups.header.trim().toLocaleLowerCase()] = header ;
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

	done();
};
