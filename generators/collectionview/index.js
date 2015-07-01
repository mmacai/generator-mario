'use strict';

var utils = require('../utils');
var DirBase = require('../dir-base');
var itemview = {};
itemview.path = '';
itemview.class = '';

module.exports = DirBase.extend({
  constructor: function (/*args, options*/) {
    DirBase.apply(this, arguments);
    this.option('itemview', {desc: 'specify a item view to use with the collection view (they have to be in the same directory)'});
  },
  initializing: function () {
    if (this.options.itemview) {
      itemview.path = utils.amd(this.options.itemview, utils.type.itemview);
      itemview.class = utils.className(this.options.itemview, utils.type.itemview);
    } else {
      itemview.path = utils.amd(this.name, utils.type.itemview);
      itemview.class = utils.className(this.name, utils.type.itemview);
    }
  },
  writing: function () {
    this.fs.copyTpl(
      this.templatePath('collection-view.js'),
      this.destinationPath(utils.fileNameWithPath(this.options.directory, this.name, utils.type.collectionview)),      
      {
        childPath: itemview.path,
        childItemView: itemview.class
      }
    );
    this.fs.copyTpl(
      this.templatePath('collection-view-test.js'),
      this.destinationPath(utils.testNameWithPath(this.options.directory, this.name, utils.type.collectionview)),
      {
        viewPath: utils.amd(this.name, utils.type.collectionview),
        viewName: utils.className(this.name, utils.type.collectionview)
      }
    );
    if (!this.options.itemview) {
      this.composeWith('aowp-marionette:itemview', {options: {directory: this.options.directory}, args: [this.name]});
    }
  }
});