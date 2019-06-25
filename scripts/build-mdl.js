const process = require('process');
const root = process.cwd();
const git = require('simple-git')(root);
const rimraf = require('rimraf');
const gulp = require('gulp');
const npm = require('npm');
const npx = require('libnpx');
const parser = require('@babel/parser').parse;
const generator = require('@babel/generator').default;
const traverse = require('@babel/traverse').default;
const t = require('@babel/types');
const fs = require('fs');
const {resolve, join} = require('path');
const {promisify} = require('util');

const isProdMode = true;

const mdlRepoUrl = 'git@github.com:google/material-design-lite.git';
const mdlRepoDir = 'mdl';
const mdlRepoClone = isProdMode || false;
const mdlRepoClean = isProdMode || false;

const copyVarsSource = 'builder/public/css/variables.scss';
const copyVarsDist = 'src/_variables.scss';
const copyVarsEnabled = isProdMode || true;

const babelTransformGulp = isProdMode || false;

const npmPackageJson = 'package.json';
const npmRunInstall = isProdMode || false;
const npmRunBuild = isProdMode || false;

const copyBuildSource = 'dist/material.min.css';
const copyBuildDist = 'builder/public/css/material.min.css';
const copyBuildEnabled = isProdMode || true;

(async () => {
  const mdlRepoPath = resolve(root, mdlRepoDir);

  if (mdlRepoClone) {
    console.info(`🧼 Cleaning trash and removing ${mdlRepoPath} directory.`);
    rimraf.sync(mdlRepoPath);

    console.info(`✨  Cloning ${mdlRepoUrl} repository to ${mdlRepoPath}...`);
    const clone = promisify(git.clone).bind(git);
    await clone(mdlRepoUrl, mdlRepoPath, ['--depth=1']);
  }

  if (copyVarsEnabled) {
    console.info(`🦄️ Copy from ${copyVarsDist} to ${copyVarsSource}...`);
    const copyVarsSourcePath = resolve(root, copyVarsSource);
    const copyVarsDistPath = resolve(mdlRepoPath, copyVarsDist);
    fs.copyFileSync(copyVarsSourcePath, copyVarsDistPath);
  }

  process.chdir(mdlRepoPath);

  const npmPackageJsonPath = resolve(mdlRepoPath, npmPackageJson);
  if (npmRunInstall) {
    console.info(`😻 Installing npm dependencies for ${npmPackageJsonPath}...`);
    const load = promisify(npm.load);
    await load(npmPackageJsonPath);

    const install = promisify(npm.commands.install);
    await install([]);

    console.info(`🙀 Installing gulp@4 and npm as dependency...`);
    await install(['gulp@4', 'npm']);
  }

  if (babelTransformGulp) {
    console.info(`✍️ Transforming gulp script, migrate from 3.* to 4.*...`);
    const gulpFilePath = resolve(mdlRepoPath, 'gulpfile.babel.js');
    const file = fs.readFileSync(gulpFilePath).toString();
    const ast = parser(file, {
      sourceType: 'module'
    });

    traverse(ast, {
      CallExpression: (path) => {
        if (path.node.callee && path.node.callee.property && path.node.callee.property.name === 'task') {
          let [literal, tasks, callback] = path.node.arguments;

          if (!tasks) {
            return;
          }

          if (tasks.type === 'ArrowFunctionExpression') {
            callback = tasks;
            tasks = {elements: []};
          }

          if (tasks.type === 'CallExpression') {
            return;
          }

          const callArgs = tasks.elements;
          if (callback) {
            callArgs.push(callback);
          }

          path.node.arguments = [
            literal,
            t.callExpression(
              t.memberExpression(
                t.identifier('gulp'),
                t.identifier('series')
              ),
              callArgs
            )
          ];
        }
      }
    });

    traverse(ast, {
      Literal: (path) => {
        if (path.node.value === 'demos') {
          if (path.parent.arguments && path.parent.arguments.includes(path.node)) {
            path.parent.arguments = path.parent.arguments.filter((node) => node !== path.node);
          }
        }
      }
    });

    fs.writeFileSync(gulpFilePath, generator(ast).code);
  }

  if (npmRunBuild) {
    console.info(`🎉 Building Material Design Lite...`);
    const load = promisify(npm.load);
    await load(npmPackageJsonPath);

    const NPM_PATH = join(mdlRepoPath, 'node_modules', 'npm', 'bin', 'npm-cli.js');
    const parsed = npx.parseArgs(['', '', 'gulp', 'styles'], NPM_PATH);
    parsed.npxPkg = join(mdlRepoPath, 'package.json');
    await npx(parsed);
  }

  if (copyBuildEnabled) {
    console.info(`🦄️ Copy from ${copyBuildDist} to ${copyBuildSource}...`);
    const copyBuildSourcePath = resolve(mdlRepoPath, copyBuildSource);
    const copyBuildDistPath = resolve(root, copyBuildDist);
    fs.copyFileSync(copyBuildSourcePath, copyBuildDistPath);
  }

  if (mdlRepoClean) {
    console.info(`🧼 Cleaning trash and removing ${mdlRepoPath} directory.`);
    rimraf.sync(mdlRepoPath);
  }
})();
