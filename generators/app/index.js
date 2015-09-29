'use strict';

var yeoman = require('yeoman-generator');
var lodash = require('lodash');
var grabFiles = require('./helpers/grab-files');
var path = require('path');

var config = [];
var tasks = {};

/*
 * Order here is to determine when to call which part of the code.
 * (init prompt comes first, copying files after that and installing dependencies comes last)
 *
 * Names in the order array must match the variable name assigned to code in partial files otherwise
 * they will be put at the end of the array.
 *
 * Take a look at the function in the helpers/grabFiles.js file.
 */
var order = [
    //prompts
    'existing',
    'init-prompts',
    'build-tool-prompts',
    'ecma-prompts',
    'tests',
    'arcanist-prompts',

    //config & env setup
    'answers-config',
    'save-config',

    //copy
    'app-files',
    'project-files',

    //install
    'install-config'
];

config = grabFiles([
    path.join(__dirname, '/generator/prompts'),
    path.join(__dirname, '/generator/config'),
    path.join(__dirname, '/generator/files')
], order);

config.sort(function(a, b) {
    return a.index - b.index;
});

config.forEach(function(item) {
    tasks[item.name] = item.code;
});

module.exports =  yeoman.generators.Base.extend(lodash.merge({
  init: function() {
    this.pkg = require('../../package.json');

  }
},tasks));
