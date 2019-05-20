const serve = require('metalsmith-serve');
const fs = require('fs');

const config = require('./config');
const screenshots = require('./plugins/screenshots');

const server = serve({
	port: 8082,
	verbose: true
});

config().use(server)
	.use(screenshots(server))
	.build(function (err) {
		if (err) throw err;

		fs.createReadStream('./static/README.md').pipe(
			fs.createWriteStream('./README.md'));
	});


