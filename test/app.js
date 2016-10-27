'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var fs = require('fs');

var convertFileToString = function (license, name) {
  return fs.readFileSync(path.join(__dirname, '../generators/app/templates/' + license), 'utf8').replace('<%= year %>', new Date().getFullYear()).replace('<%= name %>', name);
};

var runGenerator = function (nameL, mitL, apacheL, GNUL) {
  return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({name: nameL, mit: mitL, apache: apacheL, GNU: GNUL})
        .toPromise();
};

// Describe the tests for the generator
describe('generator-simple-license:app', function () {
  // For whatever reason, Travis CI tends to timeout on values less than this
  this.timeout(15000);

  // Describe unit tests for MIT license generation
  describe('mit', function () {
    // Beforehand, run the generator with the following values
    before(function () {
      return runGenerator('TESTNAME', true, false, false);
    });

    // The generator should create an MIT license file with correct information
    it('creates an MIT license with correct information', function () {
      var license = convertFileToString('mit', 'TESTNAME');
      var file = fs.readFileSync('LICENSE.md', 'utf8');

      // Assert that the content of LICENSE.md equals what is expected
      assert.textEqual(file, license);
    });
  });

  describe('apache', function () {
    before(function () {
      return runGenerator('TESTNAME', false, true, false);
    });

    it('creates an Apache 2.0 license with correct information', function () {
      var license = convertFileToString('apache', 'TESTNAME');
      var file = fs.readFileSync('LICENSE.md', 'utf8');

      assert.textEqual(file, license);
    });
  });

  describe('GNU', function () {
    before(function () {
      return runGenerator('TESTNAME', false, false, true);
    });

    it('creates a GNU license with correct information', function () {
      var license = convertFileToString('GNU', 'TESTNAME');
      var file = fs.readFileSync('LICENSE.md', 'utf8');

      assert.textEqual(file, license);
    });
  });
});
