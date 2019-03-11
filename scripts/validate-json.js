const slugify = require("slugify");

module.exports = function validateSnippets(snippets) {
	const errors = [];

	snippets.forEach(snippet => {
		function logError(error) {
			errors.push(`⚠️ snippet '${snippet.title}': ${error}`);
		}

		[
			validateLevel,
			validateTitle,
			validateAuthor,
			validateTags,
			validateContent,
			validateInteractiveExample

		]
			.forEach(validator => validator(snippet, logError));


	});

	if (errors.length > 0) {
		console.log('----------- Following errors found when validating snippets');
		errors.forEach(error => console.error(error));
		console.log('-----------');
		throw new Error('Error validating snippets')
	}
};

function validateLevel(snippet, logError) {
	const levels = ['beginner', 'intermediate', 'advanced'];
	if (!levels.includes(snippet.level)) {
		logError(`Level must be one of: ${levels.join(', ')}. Found '${snippet.level}'`)
	}
}


function validateTitle(snippet, logError) {
	if (!snippet.title) {
		logError(`Title can't be empty. ${snippet.slug}`);
	}

	const slug = slugify(snippet.title).toLowerCase();
	if (slug !== snippet.slug) {
		logError(`Snippet title must be consistent with the filename. found: ${snippet.slug}, should be: ${slug}`);
	}
}


function validateAuthor(snippet, logError) {
	if (!snippet.author) {
		logError(`Author name is required`)
	}
}


function validateTags(snippet, logError) {
	if (!snippet.tags || !snippet.tags.length > 0) {
		logError(`At lease one tag is required`)
	}
}

function validateContent(snippet, logError) {
	if (!snippet.content || !snippet.content.length > 0) {
		logError(`Content is required`)
	}

	const lineLimit = 25;

	if (snippet.content && snippet.content.length && snippet.content.split('\n').length > lineLimit) {
		logError(`Content must be under ${lineLimit} lines, found: ${snippet.content.split('\n').length} lines`);
	}
}

function validateInteractiveExample(snippet, logError) {
	if (!snippet.componentcode || !snippet.componentcode.length > 0) {
		logError(`Interactive example is required, make sure 'componentcode' property is present. 
		You can test your interactive demo and get the code at https://codelab-next.firebaseapp.com/angular/30-seconds/new .`);
	}
}
