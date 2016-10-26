'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // return this.prompt([
    // {
    //   type: "list",
    //   name: "permission",
    //   choices: ["yes", "no"],
    //   message: "Should I copy the file?"
    // },
    // {
    //   type: "input",
    //   name: "justsomeinput",
    //   message: "and now?",
    //   when: function(answers){
    //     return answers['permission'] == "no";
    //   }
    // }
    // ]).then(function(answer){
    //   this.permission = answer['permission'];
    // }.bind(this));
    //

    var questions = [
      {
        type: "input",
        name: "name",
        message: "What is your name?",
        default: this.user.git.name
      },
      {
        type: "confirm",
        name: "mit",
        message: "Do you want your license to be simple and permissive?"
      },
      {
        type: "confirm",
        name: "apache",
        message: "Are you concerned about patents?",
        when: function(answers){
          return !answers.mit;
        }
      },
      {
        type: "confirm",
        name: "GNU",
        message: "Do you care about sharing improvements?",
        when: function(answers){
          return !answers.apache && !answers.mit;
        }
      }
    ];

    return this.prompt(questions).then(function(answer){
      this.name = answer.name;

      if (answer.mit){
        this.license = "mit";
      }
      else if (answer.apache){
        this.license = "apache";
      }
      else if (answer.GNU){
        this.license = "GNU";
      }
    }.bind(this));
  },

  writing: function () {
    // this.log(this.license);
    if (this.license == "mit"){
      this.fs.copyTpl(
        this.templatePath('mit'),
        this.destinationPath('LICENSE.md'),
        { 
          year: new Date().getFullYear(),
          name: this.name
        }
      );
    }
  },

  _install: function () {
    this.installDependencies();
  }
});
