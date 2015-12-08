'use strict'
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var scriptBase = require('../script-base.js');

var Generator = module.exports = function Generator() {
  scriptBase.apply(this, arguments);
  this.sourceRoot(path.join(__dirname, '../templates'));
};

util.inherits(Generator, scriptBase);

Generator.prototype.createViewFiles = function createViewFiles() {
  this.writeTemplate('client/view/view.html', path.join('client/templates', this.name.toLowerCase() + '.html'));
  this.writeTemplate('client/view/view.js', path.join('client/templates', this.name.toLowerCase() + '.js'));
  this.writeTemplate('lib/routes/route.js', path.join('lib/routes', this.name.toLowerCase() + 'Routes.js'));
};
