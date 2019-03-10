const {readdirSync, writeFileSync,existsSync, mkdirSync} = require('fs');
const {join } = require('path');
const matter = require('gray-matter');
const folder = join(__dirname, '..', 'snippets');
const dist = join(__dirname, '..', 'data');

/**
 *
 * Takes mardown and returns content.
 * e.g. input:
 *
 * # LOL
 * 1
 * # HI
 * 2
 *
 * result:
 *
 * {LOL: "1", HI: "2"}
 *
 * @param str
 * @returns {{}}
 */
function extractHeaders(str) {
	return ('\n' + str + '\n#')
		.match(/\n#+.*\n[\s\S]*?(?=\n#)/g)
		.reduce((result, a) => {
			const [, depth, header, content] = a.match(/^\n(#+)(.*)\n([\s\S]*)$/);
			result[header.trim().toLocaleLowerCase()] = content.trim();
			return result;
		}, {})
}


/**
 *
 * Takes mardown and returns content.
 * e.g. input:
 *
 * ---
 * title: Hello
 * tags:
 * - tips
 * - good-to-know
 * ---
 *
 *
 *
 *
 * # LOL
 * 1
 * # HI
 * 2
 *
 * result:
 *
 * {title: "Hello", tags: ["tips", "good-to-know"], LOL: "1", HI: "2"}
 *
 */
function mdFolderTOJSON(folder) {
	return readdirSync(folder)
		.map(file => join(folder, file))
		.map(file => matter.read(file))
		.map(result => ({...result.data, ...extractHeaders(result.content)}));
}

if (!existsSync(dist)) {
	mkdirSync(dist);
}

let json = mdFolderTOJSON(folder);
writeFileSync(join(dist, 'data.json'), JSON.stringify(json));



















