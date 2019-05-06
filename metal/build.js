const config = require('./config');
const screenshots = require('./plugins/screenshots');
var serve = require('metalsmith-serve');

const server = serve({
	port: 8082,
	verbose: true
});

config.use(server)
	.use(screenshots(server))
	.build(function (err) {
		if (err) throw err;
	});


