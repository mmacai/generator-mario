// Karma configuration
'use strict';
<% if(buildTool === 'webpack') { %>
var webpackConfig = require('./webpack.config.js');<% } %>
var fs = require('fs');
var jsonFiles = fs.readdirSync('app/jsondata');
var jsonProxies = {};

jsonFiles.forEach(function (file) {
    jsonProxies['/jsondata/' + file] = '/base/app/jsondata/' + file;
});

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: [<% if(buildTool !== 'webpack') { %>'requirejs',<% } %><% if (testFramework === 'mocha') { %>'mocha', 'chai', 'chai-sinon'<% } else { %>'jasmine'<% } %>],


        // list of files / patterns to load in the browser
        files: [<% if(buildTool !== 'webpack') { %>
            {pattern: 'app/bower_components/jquery/dist/jquery.js', included: false},
            {pattern: 'app/bower_components/underscore/underscore.js', included: false},
            {pattern: 'app/bower_components/backbone/backbone.js', included: false},
            {pattern: 'app/bower_components/backbone.radio/build/backbone.radio.js', included: false},
            {pattern: 'app/bower_components/backbone.marionette/lib/backbone.marionette.js', included: false},
            {pattern: 'app/bower_components/handlebars/handlebars.runtime.js', included: false},<% if(styles === 'less') { %>
            {pattern: 'app/bower_components/bootstrap/dist/js/bootstrap.min.js', included: false},<% } else { %>
            {pattern: 'app/bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js', included: false},<% } %>
            {pattern: 'app/bower_components/i18next/i18next.amd.js', included: false},
            {pattern: 'app/bower_components/backbone.validation/dist/backbone-validation-amd.js', included: false},
            'app/bower_components/modernizr/modernizr.js',
            {pattern: '.tmp/scripts/templates.js', included: false},
            {pattern: 'app/scripts/**/*.js', included: false}, <% if (tests === 'custom') { %>
            {pattern: '<%= testFolder %>apps/**/*.js', included: false}, <% } %>
            'test/karma<%= delimiter %>test<%= delimiter %>main.js',<% } else { %>
            '<%= testFolder %>**/*test.js',<% } %>
            {pattern: 'app/jsondata/*.json', included: false}
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {<% if(buildTool !== 'webpack') { %>
            'app/scripts/**/*.js': [<% if (ecma === 6) { %>'babel', <% } %>'coverage']<% if (ecma === 6 && tests === 'custom') { %> ,
            '<%= testFolder %>/apps/**/*.js': ['babel']<% }  } else { %>
            '<%= testFolder %>**/*test.js': [<% if (ecma === 6) { %>'babel', <% } %>'webpack', 'coverage'] <% } %>
        },


        proxies: jsonProxies,<% if (ecma === 6 && buildTool !== 'webpack') { %>
        babelPreprocessor: {
           options: {
             sourceMap: 'inline',
               modules: 'amd'
           }
        },
        <% } %>


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        <% if(buildTool === 'webpack') { %>
        captureTimeout: 60000,
        browserNoActivityTimeout: 60000,

        webpack: {
          cache: true,
          watch: true,
          // devtool: 'eval',
          module: {
              loaders: webpackConfig.module.loaders
          },
          resolve: webpackConfig.resolve
        },
        webpackServer: {
            stats: {
                colors: true
            }
        },<% } %>

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS',  'Chrome' , 'Firefox'],


        plugins: [<% if(buildTool !== 'webpack') { %>
            'karma-requirejs',<% } else { %>
            'karma-webpack', <% } if (testFramework === 'mocha') { %>
            'karma-mocha',
            'karma-chai',
            'karma-chai-sinon',<% } else { %>
            'karma-jasmine',<% } %>
            'karma-coverage',
            'karma-chrome-launcher',
            'karma-firefox-launcher',<% if (ecma === 6) { %>
            'karma-babel-preprocessor',<% } %>
            'karma-phantomjs-launcher'
        ],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};
