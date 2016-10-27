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

  // Describe unit tests for Apache 2.0 license generation
  describe('apache', function () {
    // Beforehand, run the generator with the following values
    before(function () {
      return runGenerator('TESTNAME', false, true, false);
    });

    // The generator should create an Apache 2.0 license file with correct information
    it('creates an Apache 2.0 license with correct information', function () {
      var license = convertFileToString('apache', 'TESTNAME');
      var file = fs.readFileSync('LICENSE.md', 'utf8');

      // Assert that the content of LICENSE.md equals what is expected
      assert.textEqual(file, license);
    });
  });

  // Describe unit tests for GNU license generation
  describe('GNU', function () {
    // Beforehand, run the generator with the following values
    before(function () {
      return runGenerator('TESTNAME', false, false, true);
    });

    // The generator should create a GNU license file with correct information
    it('creates a GNU license with correct information', function () {
      var license = convertFileToString('GNU', 'TESTNAME');
      var file = fs.readFileSync('LICENSE.md', 'utf8');

      // Assert that the content of LICENSE.md equals what is expected
      assert.textEqual(file, license);
    });
  });
});
