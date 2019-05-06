const Ajv = require('ajv');
const pointer = require('json-pointer');
const ajv = new Ajv({jsonPointers: true});


function validateSnippets(snippets, schema) {
	const validate = ajv.compile(schema);
	const errors = [];

	snippets.forEach(snippet => {
		function logError(message, error) {
			errors.push(`⚠️ snippet '${snippet.title}': ${message}`, error);
		}


		if (!validate(snippet)) {
			debugger;
			for (const error of validate.errors) {

				const errorKey = `/properties${error.dataPath}/message/${error.keyword}`;
				const message = pointer.has(schema, errorKey) ? pointer.get(schema, errorKey) : error.message;
				logError(message, error);
			}
		}
	});

	if (errors.length > 0) {
		console.log('----------- Following errors found when validating snippets');
		errors.forEach(error => console.error(error));
		console.log('-----------');
		throw new Error('Error validating snippets')
	}
}


module.exports = (schema) => (files, metalsmith, done) => {

	const snippets = Object.entries(files)
		.filter(([, {layout}]) => !layout)
		.map(([, file]) => ({
			...file,
			content: file.contents.toString()
		}));
	validateSnippets(snippets, schema);

	done();
};
