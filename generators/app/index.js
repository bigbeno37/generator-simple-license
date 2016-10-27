'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({
  // Prompt the user with some questions
  prompting: function () {
    // Define the questions that will be asked
    var questions = [
      {
        type: 'input',
        name: 'name',
        message: 'What is your name?',
        default: this.user.git.name
      },
      {
        type: 'confirm',
        name: 'mit',
        message: 'Do you want your license to be simple and permissive?'
      },
      {
        type: 'confirm',
        name: 'apache',
        message: 'Are you concerned about patents?',
        // Only ask this question when the mit prompt is false
        when: function (answers) {
          return !answers.mit;
        }
      },
      {
        type: 'confirm',
        name: 'GNU',
        message: 'Do you care about sharing improvements?',
        // Only ask this question when both the apache prompt and mit prompt are false
        when: function (answers) {
          return !answers.apache && !answers.mit;
        }
      }
    ];

    // When the user enters in their answer, choose what this.license will be
    return this.prompt(questions).then(function (answer) {
      this.name = answer.name;

      if (answer.mit) {
        this.license = 'mit';
      } else if (answer.apache) {
        this.license = 'apache';
      } else if (answer.GNU) {
        this.license = 'GNU';
      }
    }.bind(this));
  },

  // Begin writing / copying files over
  writing: function () {
    this.fs.copyTpl(
      this.templatePath(this.license),
      this.destinationPath('LICENSE.md'),
      {
        year: new Date().getFullYear(),
        name: this.name
      }
    );
  }
});
