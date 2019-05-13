const config = require('./config');
var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');


config.use(serve({
	port: 8082,
	verbose: true
}))
	.use(watch({
		paths: {
			"${source}/**/*": true,
			"layouts/**/*": "**/*",
			"partials/**/*": "**/*",
		}
	}))
	.build(function (err) {
		if (err) throw err;
	});

// .use(screenshots())

