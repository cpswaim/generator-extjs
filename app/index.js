'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var extVersions = ["4.2.1.883","5.0.0.736"];

var ExtjsGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the Ext JS project generator.'));

    var prompts = [{
      name: 'appName',
      message: 'What would you like to call your project?'
    },{
      name: 'packageName',
      message: 'What namespace would you like to use for your custom classes (ex: uxe)?',
      default:'uxe'
    },{
      type: 'list',
      name: 'extVersion',
      message: 'What Ext JS version would you like to use?',
      choices: extVersions,
      default: extVersions[0]
    },{
      when: function(response){
        return response.extVersion === '4.2.1.883';
      },
      type: 'list',
      name: 'theme',
      message: 'What theme would you like to use?',
      choices: ['classic', 'gray', 'neptune', 'access'],
      default: 'gray'
    },{
      when: function(response){
        return response.extVersion === '5.0.0.736';
      },
      type: 'list',
      name: 'theme',
      message: 'What theme would you like to use?',
      choices: ['crisp', 'classic', 'gray', 'neptune', 'neptune-touch', 'access'],
      default: 'neptune'
    }];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.packageName = props.packageName;
      this.theme = props.theme;
      this.extVersion = props.extVersion;

      done();
    }.bind(this));
  },

  app: function () {
    var lib = 'ext-'+this.extVersion+'/',
      sdk = 'extjs_sdk/',
      libSrc = sdk+lib,
      includedThemes = ['base', 'neutral'];

    this.mkdir('app');

    // JavaScript directories
    this.mkdir('app/scripts/');
    this.mkdir('app/scripts/controller');
    this.mkdir('app/scripts/model');
    this.mkdir('app/scripts/store');
    this.mkdir('app/scripts/view');

    //JS Files
    this.template('Main.js', 'app/scripts/view/Main.js');
    this.template('app.js', 'app/scripts/app.js');

    // Static/Test Data
    this.mkdir('app/data');

    // Vendor Libraries
    this.mkdir('app/vendor');
    this.mkdir('app/vendor/'+lib);
    this.directory(libSrc+'src', 'app/vendor/'+lib+'src');

    this.copy(libSrc+'ext-dev.js', 'app/vendor/'+lib+'ext-dev.js');
    this.copy(libSrc+'ext-debug.js', 'app/vendor/'+lib+'ext-debug.js');

    /// Base Themes
    var currentTheme = null;
    includedThemes.push(this.theme);
    if (this.theme === 'gray'){
      includedThemes.push('classic');
    }
    else if (this.theme === 'crisp'){
      includedThemes.push('neptune');
    }
    else if (this.theme === 'neptune-touch'){
      includedThemes.push('neptune');
    }
    else if (this.theme === 'access'){
      includedThemes.push('classic');
    }

    for(var item in includedThemes){
      currentTheme = includedThemes[item];
      this.directory(libSrc+'packages/ext-theme-'+currentTheme, 'app/vendor/'+lib+'theme/ext-theme-'+currentTheme);
    }

    // CSS
    this.mkdir('app/styles');

    this.template('Gruntfile.js', 'Gruntfile.js');
    this.template('index.html', 'app/index.html');

    this.template('_bower.json', 'bower.json');
    this.template('_config.json', 'config.json');
    this.template('_package.json', 'package.json');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');
  }
});

module.exports = ExtjsGenerator;