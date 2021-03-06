'use strict';

var webpack = require('webpack');

module.exports = {
  entry: {
    app: 'main.js',
    vendor: ['jquery', 'backbone', 'underscore', 'bootstrap', 'handlebars', 'marionette', 'radio', 'fastclick', 'i18n', 'lil-uuid', 'backbone.validation']
  },
  output: {
    path: 'dist/scripts',
    publicPath: '/scripts/',
    filename: 'main.js'
  },
  resolve: {
    modulesDirectories: ['app/bower_components', 'app/scripts', '.tmp/scripts'],
    extensions: ['', '.js'],
    alias: {
      'jquery': 'jquery/dist/jquery.js',
      'underscore': 'underscore/underscore.js',
      'backbone': 'backbone/backbone.js',
      'marionette': 'backbone.marionette/lib/backbone.marionette.js',<% if(styles === 'less') { %>
      'bootstrap': 'bootstrap/dist/js/bootstrap.js',<% } else { %>
      'bootstrap': 'bootstrap-sass/assets/javascripts/bootstrap.js',<% } %>
      'handlebars': 'handlebars/handlebars.js',
      'i18n': 'i18next/i18next.amd.js',
      'fastclick': 'fastclick-amd/fastclick.js',
      'radio': 'backbone.radio/build/backbone.radio.js',
      'lil-uuid':'lil-uuid/uuid',
      'backbone.validation': 'backbone.validation/dist/backbone-validation-amd.js'
    }
  },
  module: {
    loaders: [
      {<% if(styles === 'less') { %>
        test: /\.less/,
        loader: 'style-loader!css-loader!less-loader'<% } else { %>
        test: /\.scss/,
        loader: 'style-loader!css-loader!sass-loader'<% }%>
      },
      {
        test: /\.hbs/,
        loader: 'handlebars-loader'
      },
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=image/svg+xml'},
      {test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&minetype=application/font-woff'}<% if (ecma === 6) { %>,
      {test: /\.js$/, exclude: [/bower_components/,/node_modules/], loader: 'babel-loader'}<% } %>
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      _: 'underscore',
      Backbone: 'backbone',
      Marionette: 'backbone.marionette'
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
  ]
};
