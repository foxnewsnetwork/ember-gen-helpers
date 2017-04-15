/* eslint-env node */
'use strict';

const VersionChecker = require('ember-cli-version-checker');

module.exports = {
  name: 'ember-gen-helpers',

  setupPreprocessorRegistry(type, registry) {
    // Inline let is only supported in Ember 2.0 and up.
    const checker = new VersionChecker(this);
    if (checker.for('ember', 'bower').lt('2.0.0')) {
      return;
    }

    registry.add('htmlbars-ast-plugin', {
      name: 'gen-take',
      plugin: require('./lib/gen-transform'),
      baseDir() {
        return __dirname;
      }
    });
  }
};
