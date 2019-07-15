/**
 * Module Dependencies.
 */

var debug = require('debug')('metalsmith-static');
var path  = require('path');
var fsextra    = require('fs-extra');
var mergedirs = require('merge-dirs').default;


/**
 * Literally the same as metalsmith-static, with 2 differences:
 * 1. Take absolute paths.
 * 2. Use mergedirs to better merge assets.
 * Not sure what a better solution would be :(
 */

module.exports = function(assets) {
  assets = assets || [{}];
  assets = !Array.isArray(assets) ? [ assets ] : assets;

  return function(files, metalsmith, done) {
    assets.forEach(function(opts) {
      var src = opts.src || 'public';
      var relDest = opts.dest || 'public';
      var createDest = opts.createDest || true;

      var dst = path.join(metalsmith.destination(), relDest);

      debugger
      if (createDest) {
        var dir = path.dirname(dst);

        debug('creating: %s', dir);
        fsextra.mkdirpSync(dir);
        fsextra.mkdirpSync(dst);
      }
      debugger

      mergedirs(src, dst, function(err) {
        if (err) return done(err);
      });
    });

    done();
  };
};
