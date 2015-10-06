'use strict';
var util = require('util');
var path = require('path');
var mkdirp = require('mkdirp');
var _s = require('underscore.string');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

//construct generator
var Generator = module.exports = function Generator(args, options) {
  //retrieve additional arguments, inheritance in js???!
  yeoman.generators.Base.apply(this, arguments);
  this.argument('appname', {type: String, required: false});
  //set appname from argument-defined appname or get the path
  this.appname = this.appname || path.basename(process.cwd());
  //clean appname up to use as a variable
  this.appname = _s(this.appname).camelize().slugify().humanize();
  this.packages = [
    'meteor-base',
    'mobile-experience',       
    'mongo',                   
    'blaze-html-templates',    
    'session',                 
    'jquery',                  
    'tracker',                 
    'standard-minifiers',      
    'es5-shim',                
    'ecmascript',
    'reactive-var',
    'reactive-dict',
    'http',
    'check',
    'meteorhacks:fast-render'
  ];
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.welcome = function welcome() {
  // welcome message
  if (!this.options['skip-welcome-message']) {
    this.log(yosay());
  }
};

Generator.prototype.askFor = function askFor() {
  var cb = this.async(),
    prompts = [
    {
      type: 'confirm',
      name: 'flowRouter',
      message: 'Should we include Flow Router?',
      default: true
    }, 
    {
      type: 'confirm',
      name: 'accounts',
      message: 'Should we include user accounts?',
      default: true
    },
    {
      type: 'confirm',
      name: 'ongsecurity',
      message: 'Should we include ongoworks:security?',
      default: true
    },
    {
      type: 'confirm',
      name: 'collectiontools',
      message: 'Should we include collection2, helpers, and hooks?',
      default: true
    },
    {
      type: 'confirm',
      name: 'meteortoys',
      message: 'Should we include meteor toys?',
      default: true
    },
    {
      type: 'confirm',
      name: 'autoform',
      message: 'Should we include autoform?',
      default: true
    },
    {
      type: 'confirm',
      name: 'kadira',
      message: 'Should we include Kadira?',
      default: true
    },
    {
      type: 'confirm',
      name: 'async',
      message: 'Should we include meteorhacks:async?',
      default: true
    },
    {
      type: 'confirm',
      name: 'npm',
      message: 'Should we include npm package manager?',
      default: true
    },
    {
      type: 'confirm',
      name: 'publishcounts',
      message: 'Should we include the publish-counts package?',
      default: true
    },
    {
      type: 'confirm',
      name: 'momentjs',
      message: 'Should we include moment.js?',
      default: true
    },
    {
      type: 'confirm',
      name: 'semanticUI',
      message: 'Should we include Semantic-UI?',
      default: true
    },
    {
      type: 'confirm',
      name: 'fontAwesome',
      message: 'Should we include Font Awesome?',
      default: true
    }
    ];

  this.prompt(prompts, function (answers) {
    this.flowRouter = answers.flowRouter;
    this.accounts = answers.accounts;
    this.ongsecurity = answers.ongsecurity;
    this.collectiontools = answers.collectiontools;
    this.meteortoys = answers.meteortoys;
    this.autoform = answers.autoform;
    this.async = answers.async;
    this.npm = answers.npm;
    this.momentjs = answers.momentjs;
    this.publishcounts = answers.publishcounts;
    this.semanticUI = answers.semanticUI;
    this.fontAwesome = answers.fontAwesome;
    this.kadira = answers.kadira;
    cb();
  }.bind(this));
};

// generate the basic scaffolding for a Meteor project
Generator.prototype.app = function app() {
  mkdirp('client/compatibility');
  mkdirp('client/components');
  mkdirp('client/layouts');
  mkdirp('client/lib');
  mkdirp('client/styles');
  mkdirp('client/templates');
  mkdirp('client/views');
  mkdirp('lib/collections');
  mkdirp('lib/methods');
  mkdirp('lib/routes');
  mkdirp('server/lib');
  mkdirp('server/methods');
  mkdirp('server/publications');
  mkdirp('public/images');
  mkdirp('private');
  mkdirp('.meteor');

  this.copy('client/components/loading.html', 'client/components/loading.html');
  this.copy('client/lib/subscriptions.js', 'client/lib/subscriptions.js');
  this.copy('client/layouts/mainLayout.html', 'client/layouts/mainLayout.html');
  this.copy('client/views/home.js', 'client/views/home.js');
  this.copy('client/views/home.html', 'client/views/home.html');
  this.copy('lib/registerHelpers.js', 'lib/registerHelpers.js');
  this.copy('lib/routes/routes.js', 'lib/routes/routes.js');
  this.copy('lib/templateHelpers.js', 'lib/templateHelpers.js');
  this.copy('public/robots.txt', 'public/robots.txt');
  this.copy('server/security.js', 'server/security.js');
  this.copy('server/startup.js', 'server/startup.js');
  this.copy('.meteor/gitignore', '.meteor/.gitignore');
  this.copy('.meteor/release', '.meteor/release');
  this.copy('gitignore', '.gitignore');
  this.copy('jshintrc', '.jshintrc');
  this.copy('travis', '.travis.yml');
  this.copy('editorconfig', '.editorconfig');
  this.copy('settings.json', 'settings.json');
  this.copy('LICENSE', 'LICENSE');
  this.copy('README.md', 'README.md');
};

Generator.prototype.addRouter = function addRouter() {
  if (this.flowRouter) {
    this.packages.push(['kadira:flow-router', 'kadira:blaze-layout', 'arillo:flow-router-helpers'] );
  }
};

Generator.prototype.addAccounts = function addAccounts() {
  if (this.accounts) {
    this.packages.push(['service-configuration', 'accounts-base', 'accounts-password'] );
  }
};

Generator.prototype.addCollectionTools = function addCollectionTools() {
  if (this.collectiontools) {
    this.packages.push(['dburles:collection-helpers', 'matb33:collection-hooks', 'aldeed:collection2', 'raix:handlebar-helpers'] );
  }
};

Generator.prototype.addSemanticUI = function addSemanticUI() {
  if (this.semanticUI) {
    var semanticPackages = ['semantic:ui','semantic:ui-data','semantic:ui-icon','semantic:ui-button','semantic:ui-grid','semantic:ui-form','semantic:ui-header','semantic:ui-menu','semantic:ui-card','semantic:ui-segment','semantic:ui-dropdown','semantic:ui-input','semantic:ui-item','semantic:ui-divider','semantic:ui-list','semantic:ui-transition','semantic:ui-table','semantic:ui-modal','semantic:ui-dimmer','semantic:ui-message','semantic:ui-label','semantic:ui-popup','semantic:ui-feed','semantic:ui-comment','semantic:ui-image','semantic:ui-checkbox','semantic:ui-search','semantic:ui-api','semantic:ui-tab','semantic:ui-site','semantic:ui-reveal','semantic:ui-nag','semantic:ui-rail','semantic:ui-step','semantic:ui-loader','semantic:ui-progress','semantic:ui-css']
    this.packages.push(semanticPackages);
  }
};

Generator.prototype.addFontAwesome = function addFontAwesome() {
  if (this.fontAwesome) {
    this.packages.push('fortawesome:fontawesome');
  }
};

Generator.prototype.addMomentjs = function addMomentjs() {
  if (this.momentjs) {
    this.packages.push('momentjs:moment');
  }
};

Generator.prototype.addPublishCounts = function addPublishCounts() {
  if (this.publishcounts) {
    this.packages.push('tmeasday:publish-counts');
  }
};

Generator.prototype.addAutoform = function addAutoform() {
  if (this.autoform) {
    this.packages.push(['aldeed:autoform', 'fabienb4:autoform-semantic-ui']);
  }
};

Generator.prototype.addNpm = function addNpm() {
  if (this.npm) {
    this.packages.push('meteorhacks:npm');
    this.copy('packages.json', 'packages.json');
  }
};

Generator.prototype.addAsync = function addAsync() {
  if (this.async) {
    this.packages.push('meteorhacks:async');
  }
};

Generator.prototype.addMeteorToys = function addMeteorToys() {
  if (this.meteortoys) {
    this.packages.push('meteortoys:allthings');
  }
};

Generator.prototype.addKadira = function addKadira() {
  if (this.kadira) {
    this.copy('settings.json', 'settings.json');
    this.packages.push(['meteorhacks:kadira', 'meteorhacks:kadira-profiler', 'kadira:debug'] );
  }
};

Generator.prototype.addSecurity = function addSecurity() {
  if (this.ongsecurity) {
    this.packages.push('ongoworks:security');
  } else {
    this.packages.push('insecure');
  }
};

Generator.prototype.done = function done() {
  this.write('.meteor/packages', this.packages.join('\n'));
};
