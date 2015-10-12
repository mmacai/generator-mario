'use strict';

var chalk = require('chalk');
var yosay = require('yosay');

module.exports = function(Generator) {

  Generator.prototype.namePrompt = function() {

    var done = this.async();

    this.log(yosay(
      'Welcome to the ' + chalk.red('Mario') + ' generator!'
    ));

    this.prompt({
      type: 'input',
      name: 'projectName',
      message: 'How would you like to name your application?',
      default: 'mario-app'
    }, function(answer) {
      this._.merge(this.preferences, answer);

      done();
    }.bind(this));
  };
};
