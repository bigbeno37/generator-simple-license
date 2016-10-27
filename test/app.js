'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var fs = require('fs');

var mit = 'MIT License\n\nCopyright (c) <%= year %> <%= name %>\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.';

// Describe the tests for the generator
describe('generator-simple-license:app', function () {
  // For whatever reason, Travis CI tends to timeout on values less than this
  this.timeout(15000);

  // Describe unit tests for MIT license generation
  describe('mit', function () {
    // Beforehand, run the generator with the following values
    before(function () {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({name: 'TESTNAME', mit: true, apache: false, GNU: false})
        .toPromise();
    });

    // The generator should create an MIT license file with correct information
    it('creates an MIT license with correct information', function () {
      var license = mit.replace('<%= year %>', new Date().getFullYear()).replace('<%= name %>', 'TESTNAME');
      var file = fs.readFileSync('LICENSE.md', 'utf8').replace('<%= year %>', new Date().getFullYear()).replace('<%= name %>', 'TESTNAME');

      // Assert that the content of LICENSE.md equals what is expected
      assert.textEqual(file, license);
    });
  });

  describe('apache', function () {
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
});
