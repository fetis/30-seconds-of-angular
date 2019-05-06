module.exports = () => (files, metalsmith, done) => {
	for (const [file, {layout}] of Object.entries(files)) {
		// Only generate screenshots if there's no layout
		if (!layout) {
			const screenshot = file.replace(/index.html$/, 'screenshot.html');

			if (screenshot !== file) {
				files[screenshot] = {...files[file]};
				files[screenshot].layout = 'screenshot.hbs';
			}
		}
	}

	done();
};
