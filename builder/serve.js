const config = require('./config');
const serve = require('metalsmith-serve');
const watch = require('metalsmith-watch');

config(true)
    .use(serve({
        port: 8082,
        verbose: true
    }))
    .use(watch({
        paths: {
            "${source}/**/*": true,
            "layouts/**/*": "**/*",
            "partials/**/*": "**/*",
        },
        livereload: true
    }))
    .build(function (err) {
        if (err) throw err;
    });

// .use(screenshots())

