const {metadata} = require("./metadata");

const config = require('../builder/config');
const serve = require('metalsmith-serve');
const watch = require('metalsmith-watch');

const conf = {
...metadata,
};
conf.metadata.isDevMode = true;

config(conf)
  .use(serve({
    port: 8082,
    verbose: true
  }))
  .use(watch({
    paths: {
      "${source}/**/*": true,
      "layouts/**/*": "**/*",
      "partials/**/*": "**/*",
      "public/css/**/*": "*.css",
    },
    livereload: true
  }))
  .build(function (err) {
    if (err) throw err;
  });

// .use(screenshots())

