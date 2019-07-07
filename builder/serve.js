const shared = require('./config');
const serve = require('metalsmith-serve');
const watch = require('metalsmith-watch');

module.exports = function (config) {
  shared(config)
    .use(serve({
      port: 8082,
      verbose: true
    }))
    .use(watch({
      paths: {
        [config.static + '/**/*']: true,
        "${source}/**/*": true,
        "layouts/**/*": "**/*",
        "partials/**/*": "**/*",
        "public/**/*": "*.css",

      },
      livereload: true
    }))
    .build(function (err) {
      if (err) throw err;
    });
};

