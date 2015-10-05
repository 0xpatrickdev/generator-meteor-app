/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;
var assert  = require('yeoman-generator').assert;
var _s      = require('underscore.string');

describe('meteor generator', function () {

  beforeEach(function (done) {

    var mockPrompts = {
      ironRouter: true,
      bootstrap: true
    };
    this.meteor = helpers
    .run(path.join(__dirname, '../app'))
    .inDir(path.join(__dirname, './temp'))
    .withPrompts(mockPrompts);
    done();
  });

  describe('it should create files', function() {
    it('in specific directory', function(done) {
      var expected = [
        'client/lib/subscriptions.js',
        'client/views/home.js',
        'client/views/home.html',
        'client/views/components/loading.html',
        'client/styles/theme.css',
        'client/layouts/mainLayout.html',
        'lib/registerHelpers.js',
        'lib/routes.js',
        'lib/templateHelpers.js',
        'public/robots.txt',
        'server/startup.js',
        'server/security.js',
        '.meteor/.gitignore',
        '.meteor/release',
        '.gitignore',
        '.jshintrc',
        '.travis.yml',
        '.editorconfig',
        'LICENSE',
        'README.md',
        'settings.json',
        '.meteor/packages'
      ];
      this.meteor.on('end', function() {
        assert.file(expected);
        done();
      });
    });
  });

  describe('sub-generators', function() {
    it('should create collections', function(done) {
      this.meteor.on('end', function() {
        helpers
        .run(path.join(__dirname, '../collection'))
        .inDir(path.join(__dirname, './temp'))
        .withGenerators(['underscore.string'])
        .withArguments(['dogs'])
        .on('end', function() {
          assert.fileContent('lib/dogs.js', /Dogs = new Meteor.Collection\(\'dogs\'\)/);
          done();
        });
      });
    });

    it('should create views', function(done) {
      this.meteor.on('end', function() {
        helpers
        .run(path.join(__dirname, '../view'))
        .inDir(path.join(__dirname, './temp'))
        .withGenerators(['underscore.string'])
        .withArguments(['dogs'])
        .on('end', function() {
          assert.fileContent('client/views/dogs.html', /\<template name=\"dogsView\"\>/);
          done();
        });
      });
    });
  });


});

