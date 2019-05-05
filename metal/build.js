const config = require('./config');
const puppeteer = require('puppeteer');
var serve = require('metalsmith-serve');


const screenshots = (server) => async (files, metalsmith, done) => {
	async function screenshotDOMElement(selector, file, padding = 0) {
		const rect = await page.evaluate(selector => {
			const element = document.querySelector(selector);
			const {x, y, width, height} = element.getBoundingClientRect();
			return {left: x, top: y, width, height, id: element.id};
		}, selector);

		return await page.screenshot({
			path: file,
			clip: {
				x: rect.left - padding,
				y: rect.top - padding,
				width: rect.width + padding * 2,
				height: 340,
			}
		});
	}


	done();
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	const names = Object.keys(files)
		.filter(file => files[file].layout === 'screenshot.hbs');

	for (let file of names) {
		await page.goto(`http://localhost:8082/${file}`);
		await screenshotDOMElement('.snippet-card', 'static/' + file.replace('screenshot.html','preview.png') , 0)
	}

	await new Promise((resolve) => {
		server.shutdown(resolve);
	});

	// Lol, there must be a better way?
	process.exit()
};


const server = serve({
	port: 8082,
	verbose: true
});

config.use(server)
	.use(screenshots(server))
	.build(function (err) {
		if (err) throw err;
	});


