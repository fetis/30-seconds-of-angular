const serve = require('metalsmith-serve');
const fs = require('fs');

const shared = require('./config');
const screenshots = require('./plugins/screenshots');

module.exports = function build(config) {
  const server = serve({
    port: 8083,
    verbose: true
  });


  shared(config).use(server)
    .use(screenshots(server))
    .build(function (err) {
      if (err) throw err;

      fs.createReadStream('./static/README.md').pipe(
        fs.createWriteStream('./README.md'));
    });
};
