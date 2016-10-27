'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-simple-license:app', function () {
  this.timeout(15000);

  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({name: 'TESTNAME', mit: true, apache: false, GNU: false})
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      'LICENSE.md'
    ]);
  });
});
