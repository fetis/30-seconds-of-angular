/**
 * Literally the same as metalsmith-static, with 2 differences:
 * 1. Take absolute paths.
 * 2. Use mergedirs to better merge assets.
 * Not sure what a better solution would be :(
 */

const debug = require('debug')('metalsmith-static');
const path = require('path');
const fsextra = require('fs-extra');
const mergedirs = require('merge-dirs').default;

module.exports = function(assets) {
  assets = assets || [{}];
  assets = !Array.isArray(assets) ? [ assets ] : assets;

  return function(files, metalsmith, done) {
    assets.forEach(opts => {
      const src = opts.src || 'public';
      const relDest = opts.dest || 'public';
      const createDest = opts.createDest || true;

      const dst = path.join(metalsmith.destination(), relDest);

      if (createDest) {
        const dir = path.dirname(dst);

        debug('creating: %s', dir);
        fsextra.mkdirpSync(dir);
        fsextra.mkdirpSync(dst);
      }

      mergedirs(src, dst, err => {
        if (err) {
          return done(err);
        }
      });
    });

    done();
  };
};
