#!/usr/bin/env node
const path = require('path');
const yargs = require('yargs');

const CONFIG_FILE_NAME = '30s.config.json';

function getConfig() {
  const config = require(path.join(process.cwd(), 'config', CONFIG_FILE_NAME));

  config.cwd = process.cwd();
  config.snippets = path.join(process.cwd(), config.snippets);
  config.static = path.join(process.cwd(), config.static || 'config/static' );

  return config;
}

yargs
  .command('serve', 'start a server', () => {
    const serve = require('../serve');
    const config = getConfig();
    config.metadata = {
      ...config.metadata,
      ...config.serveMetadata
    };

    serve(config);
  })
  .command('build', 'build the pages', () => {
    const build = require('../build');
    const config = getConfig();
    config.metadata = {
      ...config.metadata,
      ...config.buildMetadata
    };

    build(config);
  })
  .argv;

